from django.db import models
from django.conf import settings

# Create your models here.
class Event(models.Model):
    title = models.CharField(null=False, max_length=300)
    beginDate = models.DateTimeField()
    endDate = models.DateTimeField(blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)

    @classmethod
    def create(cls, title, beginDate, endDate, owner):
        event = cls(title=title, beginDate=beginDate, endDate=endDate, owner=owner)
        return event
