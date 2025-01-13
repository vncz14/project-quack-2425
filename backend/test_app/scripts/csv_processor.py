import csv
import re
from datetime import datetime
from test_app.models import Event, User, Location
from django.db import transaction

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
    return datetime.strptime(dt_str, "%B %d %I:%M%p")


# Processes a CSV file and inserts data into the SQLite3 database.
def process_csv(file_path):
    try:
        # Get the default host user
        host = User.objects.get(username="default_user")
        print(f"Host instance: {host} (type: {type(host)})")

        with open(file_path, 'r') as file:
            reader = csv.DictReader(file)

            events = [] 

            for row in reader:
                # Parse fields
                eventName = row['Title'].strip()
                eventDate = parse_date(row['Date/Time'].strip())
                location_name = row.get('Location', '').strip()

                # If location_name is empty, we'll keep location=None
                location_obj = None
                if location_name:
                    # Find or create the location in the DB
                    location_obj, _ = Location.objects.get_or_create(name=location_name)


                # Fields that are not yet implemented in the csv
                description = "No description provided"
                maxCapacity = 100
                publicStatus = 'OPEN'
                eventTags = 'OTHER'

                # Create Event object
                events.append(Event(
                    eventName=eventName,
                    host=host,
                    description=description,
                    maxCapacity=maxCapacity,
                    eventDate=eventDate,
                    publicStatus=publicStatus,
                    eventTags=eventTags,
                    location=location_obj
                ))

            # insert into the database
            with transaction.atomic():
                Event.objects.bulk_create(events)

            print(f"Successfully imported {len(events)} events into the database.")
            
    except Exception as e:
        print(f"Error processing CSV: {e}")
