```
python -m venv venv

# on windows
./venv/Scripts/activate

# on mac/linux
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser  # follow on screen instructions
python manage.py runserver
```

Go to http://localhost:8000/admin and log in with your superuser credentials
