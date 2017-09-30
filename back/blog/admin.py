from django.contrib import admin
from django.utils.html import format_html_join
from django.utils.safestring import mark_safe

from . import models

@admin.register(models.Book)
class BookAdmin(admin.ModelAdmin):
    pass

@admin.register(models.TextPostContent)
class TextPostContentAdmin(admin.ModelAdmin):
    exclude = ('content_type',)

@admin.register(models.BookReviewPostContent)
class BookReviewPostContentAdmin(admin.ModelAdmin):
    exclude = ('content_type',)

@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    readonly_fields = ('content',)

    def content(self, instance):
        content = instance.content.all().order_by('order')
        return format_html_join(
            mark_safe('<br/>'),
            '{}',
            ((c.specialize(),) for c in content),
        ) or mark_safe("<span class='errors'>No content yet.</span>")

@admin.register(models.CurrentlyReading)
class CurrentlyReadingAdmin(admin.ModelAdmin):
    pass

@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    pass
