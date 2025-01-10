# Backend

## Overview
Current Features:
- **CSV Import**: Enables bulk importing of event data from a CSV file.

---

## Requirements
- Python 3.x  
- Django 4.x or higher  
- SQLite3 (default Django database)

---

## Models

### User
Represents an event host.

- **`username`** (required): A string representing the username.

### Event
Stores event details.

- **`eventName`** (required): The name of the event.  
- **`host`** (required): A foreign key to the `User` model.  
- **`description`**: A brief description of the event.  
- **`maxCapacity`**: Maximum number of attendees.  
- **`eventDate`** (required): The date and time of the event.  
- **`publicStatus`**: Indicates whether the event is open or closed. Choices: `OPEN`, `CLOSED`.  
- **`eventTags`**: Tags categorizing the event. Choices: `SOCIAL`, `SPORT`, `HOBBY`, `OTHER`.  
- **`location`**: The venue or location of the event.

---

## Setup

### 1. Install Dependencies
Install the required Python packages by running:
    pip install -r requirements.txt

### 2. Run Migrations
Ensure the database schema is up-to-date:
- python manage.py makemigrations
- python manage.py migrate

---

## CSV Import (Importing Events)

### CSV File Format
The CSV file should have the following columns:
    Title,Date/Time,Location
    Ice Hockey Practice,"Monday, January 6 at 11:30AM EST",The Rinx
    Basketball Game,"Tuesday, January 7 at 10:00AM EST",Arena

- **Title**: Event name  
- **Date/Time**: Date and time of the event  
- **Location**: Event location

### Steps to Import CSV Events to Database
1. Place your CSV file in the `media/csv_files/` directory.  
2. In the backend directory, run:
    ```python manage.py setup_db```
3. The system will process the CSV and store events in the database.

---

## Database Queries

### View Users
To list all users:
```SELECT * FROM test_app_user;```

### View Events
To list all events:
```SELECT * FROM test_app_event;```

---

## Development

### Directory Structure
    backend/
    ├── test_app/
    │   ├── models.py           # User and Event models
    │   ├── scripts/
    │   │   ├── csv_processor.py # CSV processing logic
    │   ├── management/
    │       ├── commands/
    │           ├── setup_db.py # Custom management command
    ├── media/
    │   ├── csv_files/          # Directory for CSV files
    ├── db.sqlite3              # Default SQLite database
    ├── manage.py               # Django management script

---

## Testing
Run the following command to execute tests:
```
python manage.py test
```

---

## Known Issues
- ? Add issues here
---

