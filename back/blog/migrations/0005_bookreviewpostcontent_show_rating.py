# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-05 14:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_comment_is_admin'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookreviewpostcontent',
            name='show_rating',
            field=models.BooleanField(default=True),
        ),
    ]
