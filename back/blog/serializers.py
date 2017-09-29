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
