import json
import os

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views.generic import View
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from . import serializers


class Posts(APIView):
    def get(self, request):
        try:
            page = int(request.GET.get('page'))
        except Exception:
            page = 1

        published_posts = models.Post.objects.filter(published=True)

        posts_count = published_posts.count()
        posts_per_page = 3
        last_page = int(posts_count / posts_per_page) + 1
        page = min(last_page, max(1, page))

        currently_reading = serializers.CurrentlyReadingSerializer(
            models.CurrentlyReading.objects.last(),
        ).data

        first_post_id = (page - 1) * posts_per_page
        last_post_id = first_post_id + posts_per_page
        latest_posts = serializers.PostSummary(
            published_posts.order_by('-date')[first_post_id:last_post_id],
            many=True,
        ).data

        return Response({
            'page': page,
            'currently_reading': currently_reading['book'],
            'latest_posts': latest_posts,
            'has_previous': page < last_page,
            'has_next': page > 1,
        })

class Post(APIView):
    def get(self, request):
        post_id = request.GET.get('id')
        post = get_object_or_404(models.Post, id=post_id, published=True)
        serialized_post = serializers.PostSerializer(post).data

        navigation = { 'previous': {}, 'next': {} }
        try:
            navigation['previous'] = serializers.PostSummary(
                post.get_previous_by_date(published=True)
            ).data
        except ObjectDoesNotExist:
            del navigation['previous']
        try:
            navigation['next'] = serializers.PostSummary(
                post.get_next_by_date(published=True)
            ).data
        except ObjectDoesNotExist:
            del navigation['next']

        return Response({
            'post': serialized_post,
            'navigation': navigation,
        })

class Comment(APIView):
    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        serialized_comment = serializers.CommentSerializer(data=data)

        if not serialized_comment.is_valid():
            return Response({ 'errors': serialized_comment.errors })

        validated_data = serialized_comment.validated_data
        post = get_object_or_404(models.Post, id=data['postId'], published=True)
        models.Comment.objects.create(
            pseudo = validated_data['pseudo'],
            website = validated_data['website'],
            twitter = validated_data['twitter'],
            text = validated_data['text'],
            post = post,
        )

        serialized_post = serializers.PostSerializer(post).data

        return Response({ 'post': serialized_post })

class Me(APIView):
    def get(self, request):
        serialized_user = serializers.UserSerializer(request.user).data
        return Response({ 'user': serialized_user })

class ReactAppView(View):
    def get(self, request):
        try:
            index_path = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')
            with open(index_path) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            print('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )
