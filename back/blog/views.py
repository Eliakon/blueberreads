from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from . import serializers


post_comments_mock = [
    {
      'pseudo': 'Potichat',
      'website': 'http://icanhas.cheezburger.com',
      'text': 'Meow, meow :3',
      'date': '1 day ago',
    },
    {
      'pseudo': 'Mallow le chat',
      'text': 'However, I had very little insterest in the characters: they seemed pretty one-dimensional to me.\n\nThe romance made no sense, and the colony/slavery theme made me really uncomfortable. Stockholm Syndrome and shit.',
      'date': '1 year ago',
    },
    {
      'pseudo': 'Chuck Norris',
      'website': 'http://chucknorris.com/',
      'twitter': 'chucknorris',
      'text': 'Amazing.',
      'date': '12 hours ago',
    },
    {
      'pseudo': 'Blueberreads',
      'text': 'However, I had very little insterest in the characters: they seemed pretty one-dimensional to me. The romance made no sense, and the colony/slavery theme made me really uncomfortable. Stockholm Syndrome and shit.',
      'date': '15 minutes ago',
      'isAdmin': True,
    },
]


class Posts(APIView):
    def get(self, request):
        try:
            page = int(request.GET.get('page'))
        except Exception:
            page = 0

        posts_count = models.Post.objects.count()
        posts_per_page = 3
        last_page = int(posts_count / posts_per_page)
        page = min(last_page, max(0, page))

        currently_reading = serializers.CurrentlyReadingSerializer(
            models.CurrentlyReading.objects.last(),
        ).data

        first_post_id = page * posts_per_page
        last_post_id = first_post_id + posts_per_page
        latest_posts = serializers.PostSummary(
            models.Post.objects.all().order_by('date')[first_post_id:last_post_id],
            many=True,
        ).data

        return Response({
            'page': page,
            'currently_reading': currently_reading['book'],
            'latest_posts': latest_posts,
            'has_previous': page > 0,
            'has_next': page < last_page,
        })

class Post(APIView):
    def get(self, request):
        post_id = request.GET.get('id')
        post = get_object_or_404(models.Post, id=post_id)
        serialized_post = serializers.Post(post).data

        navigation = { 'previous': {}, 'next': {} }
        try:
            navigation['previous'] = serializers.PostSummary(
                post.get_previous_by_date()
            ).data
        except ObjectDoesNotExist:
            del navigation['previous']
        try:
            navigation['next'] = serializers.PostSummary(
                post.get_next_by_date()
            ).data
        except ObjectDoesNotExist:
            del navigation['next']

        return Response({
            'post': serialized_post,
            'navigation': navigation,
            'comments': post_comments_mock,
        })
