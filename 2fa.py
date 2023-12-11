import pyotp

def generate_2fa_code(secret_key: str) -> str:
  secret_key = secret_key.replace(" ", "")
  totp = pyotp.TOTP(secret_key)
  return totp.now()

if __name__ == "__main__":
  secret_key = input("Enter 2FA Secret Key: ")
  generated_code = generate_2fa_code(secret_key)
  print("2FA Code:", generated_code)
