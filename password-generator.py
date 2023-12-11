import random
import string
import pyperclip

def generate_password(length=16):
  characters = string.ascii_letters + string.digits + string.punctuation
  password = ''.join(random.choice(characters) for _ in range(length))
  return password

def copy_to_clipboard(text):
  pyperclip.copy(text)

if __name__ == "__main__":
  password = generate_password()
  copy_to_clipboard(password)
  print("The generated password has been copied to the clipboard:", password)