import datetime
import pytz

def get_local_time(timezone):
    now = datetime.datetime.now(timezone)
    return now.strftime("%A, %B %d, %Y %I:%M %p")

def print_local_time(country, timezone):
    local_time = get_local_time(timezone)
    print(f"{country}: {local_time}")

countries = {
    "Algeria": "Africa/Algiers",
    "Australia": "Australia/Sydney",
    "China": "Asia/Shanghai",
    "France": "Europe/Paris",
    "Germany": "Europe/Berlin",
    "India": "Asia/Kolkata",
    "Japan": "Asia/Tokyo",
    "Mexico": "America/Mexico_City",
    "Russia": "Europe/Moscow",
    "South Africa": "Africa/Johannesburg",
    "United Kingdom": "Europe/London",
    "United States": "America/New_York",
}

for country, timezone in sorted(countries.items()):
    timezone_obj = pytz.timezone(timezone)
    print_local_time(country, timezone_obj)