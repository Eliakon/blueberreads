from datetime import datetime, timezone

from django.db import models
from django.http import HttpRequest


def pretty_date(time=False):
    """
    Get a datetime object or a int() Epoch timestamp and return a
    pretty string like 'an hour ago', 'Yesterday', '3 months ago',
    'just now', etc
    """
    now = datetime.now(timezone.utc)
    if type(time) is int:
        diff = now - datetime.fromtimestamp(time)
    elif isinstance(time,datetime):
        diff = now - time
    elif not time:
        diff = now - now
    second_diff = diff.seconds
    day_diff = diff.days

    if day_diff < 0:
        return ''

    if day_diff == 0:
        if second_diff < 10:
            return "just now"
        if second_diff < 60:
            return str(second_diff) + " seconds ago"
        if second_diff < 120:
            return "a minute ago"
        if second_diff < 3600:
            return str(second_diff // 60) + " minutes ago"
        if second_diff < 7200:
            return "an hour ago"
        if second_diff < 86400:
            return str(second_diff // 3600) + " hours ago"
    if day_diff == 1:
        return "Yesterday"
    if day_diff < 7:
        return str(day_diff) + " days ago"
    if day_diff < 31:
        return str(day_diff // 7) + " weeks ago"
    if day_diff < 365:
        return str(day_diff // 30) + " months ago"
    return str(day_diff // 365) + " years ago"

def clean_markdown_string(value):
    value = value.replace('\'', '’')
    return value

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

    def save(self, *args, **kwargs):
        self.title = clean_markdown_string(self.title)
        self.author = clean_markdown_string(self.author)
        super(Book, self).save(*args, **kwargs)

    def clean(self):
        saved = 0
        cleaned_title = clean_markdown_string(self.title)
        cleaned_author = clean_markdown_string(self.author)
        if cleaned_title != self.title or cleaned_author != self.author:
            self.title = cleaned_title
            self.author = cleaned_author
            self.save()
            saved = 1
        return saved

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
        self.text = clean_markdown_string(self.text)
        super(TextPostContent, self).save(*args, **kwargs)

    def clean(self):
        saved = 0
        cleaned_text = clean_markdown_string(self.text)
        if cleaned_text != self.text:
            self.text = cleaned_text
            self.save()
            saved = 1
        return saved

    def __str__(self):
        return '[{0}] Text ({1}): {2}'.format(self.order, self.id, self.text[:200])

    class Meta:
        verbose_name = 'Text (content)'
        verbose_name_plural = 'Texts (content)'

class BookReviewPostContent(PostContent):
    book = models.ForeignKey('Book', related_name='book_review')
    rating = models.SmallIntegerField()
    show_rating = models.BooleanField(default=True)
    text = models.TextField()
    align = models.CharField(max_length=5, choices=ALIGN_CHOICES)

    def save(self, *args, **kwargs):
        self.content_type = 'book_review'
        self.text = clean_markdown_string(self.text)
        super(BookReviewPostContent, self).save(*args, **kwargs)

    def clean(self):
        saved = 0
        cleaned_text = clean_markdown_string(self.text)
        if cleaned_text != self.text:
            self.text = cleaned_text
            self.save()
            saved = 1
        return saved

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
        return pretty_date(self.date)

    @property
    def books(self):
        book_reviews = self.content.filter(content_type='book_review')[:5]
        covers = []
        for review in book_reviews:
            covers.append(review.specialize().book.cover_url)
        return covers

    @property
    def ordered_content(self):
        return self.content.order_by('order')

    def save(self, *args, **kwargs):
        self.title = clean_markdown_string(self.title)
        self.intro = clean_markdown_string(self.intro)
        super(Post, self).save(*args, **kwargs)

    def clean(self):
        saved = 0
        cleaned_title = clean_markdown_string(self.title)
        cleaned_intro = clean_markdown_string(self.intro)
        if cleaned_title != self.title or cleaned_intro != self.intro:
            self.title = cleaned_title
            self.intro = cleaned_intro
            self.save()
            saved = 1
        return saved

    def __str__(self):
        return '{0} ({1})'.format(self.title, self.display_date)

class CurrentlyReading(models.Model):
    book = models.ForeignKey('Book', related_name='currently_reading')

    def __str__(self):
        return '{0} by {1}'.format(self.book.title, self.book.author)

class Comment(models.Model):
    pseudo = models.CharField(max_length=30)
    website = models.CharField(max_length=100, null=True, blank=True)
    twitter = models.CharField(max_length=30, null=True, blank=True)
    text = models.TextField()
    date = models.DateTimeField(auto_now=True)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)

    @property
    def display_date(self):
        return pretty_date(self.date)

    def save(self, *args, **kwargs):
        self.pseudo = clean_markdown_string(self.pseudo)
        self.text = clean_markdown_string(self.text)
        super(Comment, self).save(*args, **kwargs)

    def clean(self):
        saved = 0
        cleaned_pseudo = clean_markdown_string(self.pseudo)
        cleaned_text = clean_markdown_string(self.text)
        if cleaned_pseudo != self.pseudo or cleaned_text != self.text:
            self.pseudo = cleaned_pseudo
            self.text = cleaned_text
            self.save()
            saved = 1
        return saved

    def __str__(self):
        return 'Comment by {0} {1}'.format(self.pseudo, self.display_date)
