from django.contrib import admin
from .models import User, Event, Location, Major, Club
from django import forms
from django.core.exceptions import ValidationError

# Register your models here.

admin.site.register(Event)
admin.site.register(Location)
admin.site.register(Major)
admin.site.register(Club)

class UserAdminForm(forms.ModelForm): # makes sure that you cannot select too many majors/clubs for a User in admin interface
    class Meta:
        model = User
        fields = '__all__'

    def clean_major(self):
        if self.cleaned_data['major'].count() > 2:
            raise forms.ValidationError('You can only select up to two majors')
        return self.cleaned_data['major']

    def clean_club(self):
        if self.cleaned_data['club'].count() > 10:
            raise forms.ValidationError('You can only select up to ten clubs')
        return self.cleaned_data['club']

class UserAdmin(admin.ModelAdmin):
    form = UserAdminForm

admin.site.register(User, UserAdmin)