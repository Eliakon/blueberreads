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
    content_type = models.CharField(max_length=100)
    order = models.SmallIntegerField()
    post = models.ForeignKey('Post', related_name='content', on_delete=models.CASCADE)

    def specialize(self):
        if self.content_type == 'text':
            return TextPostContent.objects.get(id=self.id)
        if self.content_type == 'book_review':
            return BookReviewPostContent.objects.get(id=self.id)
        return self

    def __str__(self):
        return '{0} - Content'.format(self.order)

class TextPostContent(PostContent):
    text = models.TextField()

    def save(self, *args, **kwargs):
        self.content_type = 'text'
        super(TextPostContent, self).save(*args, **kwargs)

    def __str__(self):
        return '[{0}] Text ({1}): {2}'.format(self.order, self.id, self.text[:200])

    class Meta:
        verbose_name = 'Text (content)'
        verbose_name_plural = 'Texts (content)'

class BookReviewPostContent(PostContent):
    book = models.ForeignKey('Book', related_name='book_review')
    rating = models.SmallIntegerField()
    text = models.TextField()
    align = models.CharField(max_length=5, choices=ALIGN_CHOICES)

    def save(self, *args, **kwargs):
        self.content_type = 'book_review'
        super(BookReviewPostContent, self).save(*args, **kwargs)

    def __str__(self):
        return '[{0}] Book review ({1}): {2} by {3} align-{4}'.format(
            self.order, self.id, self.book.title, self.book.author, self.align)

    class Meta:
        verbose_name = 'Book review (content)'
        verbose_name_plural = 'Book reviews (content)'

class Post(models.Model):
    slug = models.SlugField(max_length=200)
    title = models.CharField(max_length=200)
    date = models.DateTimeField()
    intro = models.TextField()
    published = models.BooleanField(default=False)

    @property
    def display_date(self):
        return self.date.strftime('%m-%d-%Y')

    @property
    def books(self):
        book_reviews = self.content.filter(content_type='book_review')
        covers = []
        for review in book_reviews:
            covers.append(review.specialize().book.cover_url)
        return covers

    @property
    def ordered_content(self):
        return self.content.order_by('order')

    def __str__(self):
        return self.title

class CurrentlyReading(models.Model):
    book = models.ForeignKey('Book', related_name='currently_reading')

    def __str__(self):
        return '{0} by {1}'.format(self.book.title, self.book.author)

class Comment(models.Model):
    pseudo = models.CharField(max_length=30)
    website = models.CharField(max_length=100)
    twitter = models.CharField(max_length=30)
    text = models.TextField()
    date = models.DateTimeField(auto_now=True)
    post = models.ForeignKey(Post, related_name='comments')

    def __str__(self):
        return 'Comment by {0} at {1}'.format(pseudo, date)
