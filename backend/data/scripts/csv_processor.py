import csv
import re
from datetime import datetime
from data.models import Event, User, Location
from django.db import transaction
from django.utils import timezone

# Parses a date string in the format "Monday, January 6 at 11:30AM EST".
# Returns a naive datetime object.
def parse_date(date_string):
    # Regex to match date and time
    match = re.match(r'(\w+), (\w+ \d+) at (\d+:\d+[AP]M) (\w+)', date_string)
    if not match:
        raise ValueError(f"Invalid date format: {date_string}")

    _, date, time, _ = match.groups()
    # Combine and parse
    dt_str = f"{date} {time}"
    naive_dt = datetime.strptime(dt_str, "%B %d %I:%M%p")

    # Make timezone-aware
    local_tz = timezone.get_current_timezone()  # Uses settings.py TIME_ZONE
    return naive_dt.replace(tzinfo=local_tz)


# Processes a CSV file and inserts data into the SQLite3 database.
def process_csv(file_path):
    counter = 0
    try:
        # Get the default host user
        hosts = User.objects.get(name="default_user")
        print(f"Host instance: {hosts} (type: {type(hosts)})")

        with open(file_path, 'r') as file:
            reader = csv.DictReader(file)

            with transaction.atomic():
                for row in reader:
                    # Parse fields
                    event_name = row['Title'].strip()
                    UTC_of_event = parse_date(row['Date/Time'].strip())
                    location_name = row.get('Location', '').strip()

                    # If location_name is empty, we'll keep location=None
                    location_obj = None
                    if location_name:
                        # Find or create the location in the DB
                        location_obj, _ = Location.objects.get_or_create(name=location_name)


                    # Fields that are not yet implemented in the csv
                    description = "No description provided"
                    capacity = 100
                    open_to_the_public = True
                    eventTags = 'OTHER'
                    participants = None

                    # Create Event object
                    event = Event.objects.create(
                        event_name=event_name,
                        description=description,
                        capacity=capacity,
                        UTC_of_event=UTC_of_event,
                        open_to_the_public=open_to_the_public,
                        eventTags=eventTags,
                        location=location_obj,
                    )
                    counter += 1

                    # Set hosts (ManyToMany field)
                    event.hosts.set([hosts])
                    event.participants.clear()

            print(f"Successfully imported {counter} events into the database.")
            
    except Exception as e:
        print(f"Error processing CSV: {e}")
