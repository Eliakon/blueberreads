from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CurrentlyReading
from .serializers import CurrentlyReadingSerializer

latest_posts_mock = [
    {
        'id': 1,
        'slug': 'august-wrap-up',
        'title': 'August wrap-up',
        'date': '09-14-2017',
        'intro': 'I have read a total of four books this month. I did not expect to read so much, because I planned on reading The Final Empire which is **huge**.\n\nI nonetheless did it! I am quite proud of myself, let me tell you.',
        'books': ['/images/covers/15801353.jpg', '/images/covers/6547258.jpg', '/images/covers/17756559.jpg', '/images/covers/22037377.jpg'],
    },
    {
        'id': 2,
        'slug': 'top-5-middle-grade-books',
        'title': 'Top 5 middle grade books of all time',
        'date': '09-06-2017',
        'intro': 'As you may know by now, I am a huge middle-grade books fan! Fun fact: I was more attracted to adult books when in high school... And more attracted to middle-grade books now that I’m—presumably—an adult! So, here is a my top 5 favorite middle-grade books of all time.\n\n**Disclaimer:** it may include witches.',
        'books': ['/images/covers/5985499.jpg', '/images/covers/11476291.jpg', '/images/covers/17349203.jpg', '/images/covers/24926015.jpg', '/images/covers/25658499.jpg'],
    },
    {
        'id': 3,
        'slug': 'the-final-empire-review-with-spoilers',
        'title': 'The Final Empire review (with spoilers!)',
        'date': '09-01-2017',
        'intro': 'I’m very excited to talk to you about this book, as this is my first ever buddy-read! So, The Final Empire by Brandon Sanderson is the first book in the Mistborn trilogy. Here are my thoughts about it.',
        'books': ['/images/covers/6547258.jpg'],
    },
]

review_text = '''This is the story of Kestrel, a young noble woman living in a colonial territory, where native population has been enslaved.
Kestrel's love interest is actually... Well, the slave she bought at the beginningof the story. How romantic, right?

Furthermore, the slave used to bea nobleman himself (because, colony and slavery, you know?) and used toown a villa in the city.This was an OK read, I guess. It was an entertaining quick-read, whichis akways appreciable.

However, I had very little insterest in the characters: they seemed prettyone-dimensional to me. The romance made no sense, and the colony/slaverytheme made me really uncomfortable. Stockholm Syndrome and shit.'''

post_mock = {
    'id': 1,
    'slug': 'august-wrap-up',
    'title': 'August wrap-up',
    'date': '09-14-2017',
    'intro': 'I have read a total of four books this month. I did not expect to read so much, because I planned on reading The Final Empire which is huge.\n\nI nonetheless did it! I am quite proud of myself, let me tell you.',
    'books': ['/images/covers/15801353.jpg', '/images/covers/6547258.jpg', '/images/covers/17756559.jpg', '/images/covers/22037377.jpg'],
    'content': [
        {
            'type': 'BookReview',
            'book': {
                'coverUrl': '/images/covers/15801353.jpg',
                'title': 'Aristotle and Dante Discover the Secrets of the Universe',
                'author': 'Benjamin Alire Sáenz',
                'color': '#87cdde',
            },
            'rating': 5,
            'text': review_text,
        },
        {
            'type': 'BookReview',
            'book': {
                'coverUrl': '/images/covers/17756559.jpg',
                'title': 'The Winner’s Curse',
                'author': 'Marie Rutkoski',
                'color': '#a02c2c',
            },
            'rating': 2,
            'text': review_text,
            'alignRight': True,
        },
    ],
}

post_navigation_mock = {
    'previous': {
        'id': 1,
        'slug': 'august-wrap-up',
        'title': 'August wrap-up',
        'date': '09-14-2017',
        'books': ['/images/covers/15801353.jpg', '/images/covers/6547258.jpg', '/images/covers/17756559.jpg', '/images/covers/22037377.jpg'],
    },
    'next': {
        'id': 2,
        'slug': 'top-5-middle-grade-books',
        'title': 'Top 5 middle grade books of all time',
        'date': '09-06-2017',
        'books': ['/images/covers/5985499.jpg', '/images/covers/11476291.jpg', '/images/covers/17349203.jpg', '/images/covers/24926015.jpg', '/images/covers/25658499.jpg'],
    },
}

post_comments_mock = [
    {
      'pseudo': 'Potichat',
      'website': 'http://icanhas.cheezburger.com',
      'text': 'Meow, meow :3',
      'date': '1 day ago',
    },
    {
      'pseudo': 'Mallow le chat',
      'text': 'However, I had very little insterest in the characters: they seemed pretty one-dimensional to me.\n\nThe romance made no sense, and the colony/slavery theme made me really uncomfortable. Stockholm Syndrome and shit.',
      'date': '1 year ago',
    },
    {
      'pseudo': 'Chuck Norris',
      'website': 'http://chucknorris.com/',
      'twitter': 'chucknorris',
      'text': 'Amazing.',
      'date': '12 hours ago',
    },
    {
      'pseudo': 'Blueberreads',
      'text': 'However, I had very little insterest in the characters: they seemed pretty one-dimensional to me. The romance made no sense, and the colony/slavery theme made me really uncomfortable. Stockholm Syndrome and shit.',
      'date': '15 minutes ago',
      'isAdmin': True,
    },
]


class Posts(APIView):
    def get(self, request):
        page = request.GET.get('page', 0)

        currently_reading = CurrentlyReadingSerializer(
            CurrentlyReading.objects.last()
        ).data

        return Response({
            'page': page,
            'currentlyReading': currently_reading['book'],
            'latestPosts': latest_posts_mock,
        })

class Post(APIView):
    def get(self, request):
        post_id = request.GET.get('postId')
        return Response({
            'post': post_mock,
            'navigation': post_navigation_mock,
            'comments': post_comments_mock,
        })
