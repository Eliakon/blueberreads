# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-27 16:25
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('author', models.CharField(max_length=200)),
                ('color', models.CharField(max_length=6)),
                ('cover', models.ImageField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='BookReviewPostContent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.SmallIntegerField()),
                ('rating', models.SmallIntegerField()),
                ('text', models.TextField()),
                ('align', models.CharField(choices=[('left', 'left'), ('right', 'right')], max_length=5)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='book_review', to='blog.Book')),
            ],
            options={
                'verbose_name': 'Book review (content)',
                'verbose_name_plural': 'Book reviews (content)',
            },
        ),
        migrations.CreateModel(
            name='CurrentlyReading',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='currently_reading', to='blog.Book')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('date', models.DateTimeField()),
                ('intro', models.TextField()),
                ('books', models.ManyToManyField(related_name='posts', to='blog.Book')),
            ],
        ),
        migrations.CreateModel(
            name='TextPostContent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.SmallIntegerField()),
                ('text', models.TextField()),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='text_content', to='blog.Post')),
            ],
            options={
                'verbose_name': 'Text (content)',
                'verbose_name_plural': 'Texts (content)',
            },
        ),
        migrations.AddField(
            model_name='bookreviewpostcontent',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='book_review_content', to='blog.Post'),
        ),
    ]
