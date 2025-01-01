from django import forms
from django.shortcuts import render
from django.views.generic import CreateView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

# Create your views here.
class SignUpForm(UserCreationForm):
  class Meta:
    model = User
    fields = ['first_name', 'last_name', 'username', 'email']
      
class SignUpView(CreateView):
  form_class = SignUpForm
  success_url = '/'
  template_name = 'registration/signup.html'
