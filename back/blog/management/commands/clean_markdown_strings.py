from django.core.management.base import BaseCommand, CommandError
from blog import models

class Command(BaseCommand):
    help = 'Clean Markdown strings'

    def handle(self, *args, **options):
        clean_models = [
            models.Book,
            models.TextPostContent,
            models.BookReviewPostContent,
            models.Post,
            models.Comment
        ]

        item_count = 0
        for model in clean_models:
            items = model.objects.all()
            for item in items:
                item_count += item.clean()

        self.stdout.write(self.style.SUCCESS('Successfully cleaned {0} items'.format(item_count)))
