from faker import Faker
from faker import Faker

fake = Faker()
print("Name:", fake.name())
print("Address:", fake.address())
print("Text:", fake.text())
print("Email:", fake.email())
print("Country:", fake.country())
print("Latitude, Longitude:", fake.latitude(), fake.longitude())
print("URL:", fake.url())