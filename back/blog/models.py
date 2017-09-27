from django.db import models
from django.http import HttpRequest

ALIGN_CHOICES = (
    ('left', 'left'),
    ('right', 'right'),
)

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    color = models.CharField(max_length=6)
    cover = models.ImageField()

    @property
    def cover_url(self):
        return self.cover.url

    def __str__(self):
        return '{0} by {1}'.format(self.title, self.author)

class PostContent(models.Model):
    order = models.SmallIntegerField()

    class Meta:
        abstract = True

class TextPostContent(PostContent):
    post = models.ForeignKey('Post', related_name='text_content', on_delete=models.CASCADE)
    text = models.TextField()

    class Meta:
        verbose_name = 'Text (content)'
        verbose_name_plural = 'Texts (content)'

class BookReviewPostContent(PostContent):
    post = models.ForeignKey('Post', related_name='book_review_content', on_delete=models.CASCADE)
    book = models.ForeignKey('Book', related_name='book_review')
    rating = models.SmallIntegerField()
    text = models.TextField()
    align = models.CharField(max_length=5, choices=ALIGN_CHOICES)

    class Meta:
        verbose_name = 'Book review (content)'
        verbose_name_plural = 'Book reviews (content)'

class Post(models.Model):
    slug = models.SlugField(max_length=200)
    title = models.CharField(max_length=200)
    date = models.DateTimeField()
    intro = models.TextField()
    books = models.ManyToManyField('Book', related_name='posts')
    published = models.BooleanField(default=False)

class CurrentlyReading(models.Model):
    book = models.ForeignKey('Book', related_name='currently_reading')

    def __str__(self):
        return '{0} by {1}'.format(self.book.title, self.book.author)
