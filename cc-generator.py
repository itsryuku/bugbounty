from faker import Faker

faker = Faker()

def generate_fake_credit_card():
  card_number = faker.credit_card_number()
  card_holder = faker.name()
  expiration_date = faker.credit_card_expire()
  cvv = faker.credit_card_security_code()

  return {
    'card_number': card_number,
    'card_holder': card_holder,
    'expiration_date': expiration_date,
    'cvv': cvv
  }

if __name__ == '__main__':
  fake_credit_card = generate_fake_credit_card()
  print(fake_credit_card)