from django.contrib import admin
from .models import Book, TextPostContent, BookReviewPostContent, Post, CurrentlyReading

class BookAdmin(admin.ModelAdmin):
    pass

class TextPostContentAdmin(admin.ModelAdmin):
    pass

class BookReviewPostContentAdmin(admin.ModelAdmin):
    pass

class PostAdmin(admin.ModelAdmin):
    pass

class CurrentlyReadingAdmin(admin.ModelAdmin):
    pass

admin.site.register(Book, BookAdmin)
admin.site.register(TextPostContent, TextPostContentAdmin)
admin.site.register(BookReviewPostContent, BookReviewPostContentAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(CurrentlyReading, CurrentlyReadingAdmin)
