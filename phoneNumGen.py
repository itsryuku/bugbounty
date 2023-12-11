import random
import sys

def gen_phone_number(country_code):
  if country_code == "US":
    area_code = random.randint(200, 999)
    prefix = random.randint(200, 999)
    line_number = random.randint(1000, 9999)
    return f"+1 ({area_code}) {prefix}-{line_number}"
  elif country_code == "UK":
    area_code = random.randint(20, 79)
    line_number = random.randint(10000000, 99999999)
    return f"+44 {area_code} {line_number}"
  elif country_code == "FR":
    area_code = random.randint(1, 9)
    prefix = random.randint(0, 99)
    line_number = random.randint(0, 99999999)
    return f"+33 {area_code} {prefix:02d} {line_number:08d}"
  elif country_code == "DE":
    area_code = random.randint(151, 179)
    line_number = random.randint(10000000, 99999999)
    return f"+49 {area_code} {line_number}"
  return "Invalid country code, try US, UK, FR, or DE"

if __name__ == "__main__":
  if len(sys.argv) < 2:
    print("Please provide a country code as an argument, US, UK, FR, or DE.")
  else:
    fake_phone_number = gen_phone_number(sys.argv[1])
    print(fake_phone_number)