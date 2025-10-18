from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from movies.views import MovieViewSet  # <-- Now this will work

router = routers.DefaultRouter()
router.register(r'movies', MovieViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
