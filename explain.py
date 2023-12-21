#!/usr/bin/env python

import sys
import requests
from bs4 import BeautifulSoup

def explain_shell(command):
  """
  Retrieves the explanation of a shell command from explainshell.com.

  Args:
    command (str): The shell command to explain.

  Returns:
    None

  Raises:
    requests.exceptions.RequestException: If there is an error making the HTTP request.

  """
  url = f"https://explainshell.com/explain?cmd={command}"

  headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }

  try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'html.parser')

    help_box = soup.find('pre', {'class': 'help-box'})

    if help_box:
      print(help_box.text.strip())
    else:
      print(f"No man page found for {command}.")

  except requests.exceptions.RequestException as e:
    print(f"Error: {e}")

if __name__ == "__main__":
  if len(sys.argv) != 2:
    print("Please provide a valid shell command.")
  else:
    cmd = sys.argv[1]
    explain_shell(cmd)
