from django.db import models

STATUS_CHOICES = [
    ("wishlist", "Wishlist"),
    ("watching", "Watching"),
    ("completed", "Completed"),
]

class Movie(models.Model):
    title = models.CharField(max_length=100)
    director = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)
    platform = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="wishlist")
    episodes_watched = models.PositiveIntegerField(default=0)
    total_episodes = models.PositiveIntegerField(default=0)
    rating = models.PositiveIntegerField(default=0)
    review = models.TextField(blank=True)

    def __str__(self):
        return self.title
