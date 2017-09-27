from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        r'^posts/$',
        views.Posts.as_view(),
        name='posts',
    ),
    url(
        r'^post/$',
        views.Post.as_view(),
        name='post',
    ),
]
