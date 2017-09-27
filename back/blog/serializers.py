from rest_framework import serializers

from .models import Book, CurrentlyReading


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author', 'color', 'cover_url']

class CurrentlyReadingSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = CurrentlyReading
        fields = ['book']
