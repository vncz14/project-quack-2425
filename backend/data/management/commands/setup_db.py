import os
from django.core.management.base import BaseCommand
from data.models import User  # Import your custom User model
from data.scripts.csv_processor import process_csv


class Command(BaseCommand):
    help = "Set up the database and process a CSV file"

    def handle(self, *args, **options):
        # Create a default user (or retrieve if exists)
        name = "default_user"

        user, created = User.objects.get_or_create(name=name)
        if created:
            self.stdout.write(self.style.SUCCESS(f"User '{name}' created successfully."))
        else:
            self.stdout.write(self.style.WARNING(f"User '{name}' already exists."))

        # Get the CSV file
        csv_file_path = os.path.join("media", "csv_files", "events_data.csv")

        if not os.path.exists(csv_file_path):
            self.stdout.write(self.style.ERROR(f"CSV file not found at: {csv_file_path}"))
            return

        # Call the CSV processor
        process_csv(csv_file_path)
        self.stdout.write(self.style.SUCCESS("CSV processing completed successfully."))
