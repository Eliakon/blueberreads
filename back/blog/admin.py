from django.contrib import admin
from django.utils.html import format_html_join
from django.utils.safestring import mark_safe

from .models import Book, PostContent, TextPostContent, BookReviewPostContent, Post, CurrentlyReading

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    pass

@admin.register(TextPostContent)
class TextPostContentAdmin(admin.ModelAdmin):
    exclude = ('content_type',)

@admin.register(BookReviewPostContent)
class BookReviewPostContentAdmin(admin.ModelAdmin):
    exclude = ('content_type',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('content',)

    def content(self, instance):
        content = instance.content.all().order_by('order')
        print('content={0}'.format(content[0]))
        print('specialized content={0}'.format(content[0].specialize()))
        return format_html_join(
            mark_safe('<br/>'),
            '{}',
            ((c.specialize(),) for c in content),
        ) or mark_safe("<span class='errors'>No content yet.</span>")

@admin.register(CurrentlyReading)
class CurrentlyReadingAdmin(admin.ModelAdmin):
    pass
