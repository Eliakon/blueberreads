from rest_framework import serializers

from . import models


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = ['title', 'author', 'color', 'cover_url']

class CurrentlyReadingSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = models.CurrentlyReading
        fields = ['book']

class PostSummary(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = ['id', 'slug', 'title', 'display_date', 'intro', 'books']

class TextPostContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TextPostContent
        fields = ['content_type', 'text']

class BookReviewPostContentSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = models.BookReviewPostContent
        fields = ['content_type', 'book', 'rating', 'text', 'align']

class PostContentSerializer(serializers.RelatedField):
    def to_representation(self, value):
        if (value.content_type == 'text'):
            content = models.TextPostContent.objects.get(id=value.id)
            return TextPostContentSerializer(content).data
        if (value.content_type == 'book_review'):
            content = models.BookReviewPostContent.objects.get(id=value.id)
            return BookReviewPostContentSerializer(content).data

class Post(serializers.ModelSerializer):
    ordered_content = PostContentSerializer(many=True, read_only=True)

    class Meta:
        model = models.Post
        fields = ['id', 'slug', 'title', 'display_date', 'intro', 'books', 'ordered_content']
