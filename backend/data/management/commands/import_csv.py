import os
from django.core.management.base import BaseCommand
from data.scripts.csv_processor import process_csv

class Command(BaseCommand):
    help = 'Import events from CSV file into the database'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the CSV file')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR('File not found!'))
            return

        # Process the CSV
        process_csv(file_path)

        self.stdout.write(self.style.SUCCESS('CSV data imported successfully!'))
