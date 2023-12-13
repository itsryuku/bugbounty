import csv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_SERVER = 'your_smtp_server'
SMTP_PORT = 587
SMTP_USERNAME = 'your_email@example.com'
SMTP_PASSWORD = 'your_email_password'
SUBJECT_TEMPLATE = 'Replace with your subject'
BODY_TEMPLATE = 'Dear {name},\n\nReplace with your message.'

def send_email(to_email, subject, body):
    smtp_server = SMTP_SERVER
    smtp_port = SMTP_PORT
    smtp_username = SMTP_USERNAME
    smtp_password = SMTP_PASSWORD

    message = MIMEMultipart()
    message['From'] = smtp_username
    message['To'] = to_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(smtp_username, to_email, message.as_string())
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Error sending email to {to_email}: {e}")

def main():
    csv_file = 'contacts.csv'

    subject = SUBJECT_TEMPLATE
    body_template = BODY_TEMPLATE

    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            to_email = row['email']
            name = row['name']
            body = body_template.format(name=name)

            send_email(to_email, subject, body)

if __name__ == "__main__":
    main()