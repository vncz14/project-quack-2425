from django import forms
from .models import User, Event, Invite, EventAttendance


class UsernameListField(forms.Field):
    def clean(self, value):
        usernames = [username.strip() for username in value.split(',')]
        
        # Check if any usernames are empty
        if any(not username for username in usernames):
            raise forms.ValidationError("Empty usernames are not allowed")

        valid_usernames = []
        invalid_usernames = []
        
        for username in usernames:
            try:
                user = User.objects.get(username=username)
                valid_usernames.append(user)
            except User.DoesNotExist:
                invalid_usernames.append(username)
        
        if invalid_usernames:
            raise forms.ValidationError(f"Invalid usernames: {', '.join(invalid_usernames)}")
        
        return valid_usernames  
        
class EventForm(forms.ModelForm):
    invited_users = UsernameListField(widget=forms.TextInput(attrs={'placeholder': 'Username1, Username2'}))

    class Meta:
        model = Event
        fields = ('name', 'date', 'description')

    def save(self, commit=True):
        event = super().save(commit=False)
        
        if commit: 
            event.save()
            
            # Create invites for the users 
            invited_users = self.cleaned_data['invited_users']
            
            # Check if any invites already exist
            existing_invites = Invite.objects.filter(event=event)
            
            # Create new invites only for users who haven't been invited yet
            new_invites = [user for user in invited_users if not existing_invites.filter(invitee=user).exists()]
            
            for user in new_invites: 
                Invite.objects.create(event=event, invitee=user) 

        return event


class EventInvitationForm(forms.ModelForm): #Would be used to display the list of invited users in your template and allow them to remove themselves from the list or change their RSVP status
    rsvp_status_choices = EventAttendance.rsvp_status.field.choices 

    class Meta:
        model = EventAttendance
        fields = ('rsvp_status') #Do I need anything else here?

    rsvp_status = forms.ChoiceField(choices=rsvp_status_choices)