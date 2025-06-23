import uuid

# mail imports \\//
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.image import MIMEImage
import os
import requests
from dotenv import load_dotenv


def generate_unique_id():
    return str(uuid.uuid4())



def send_bulk_emails(emails_id, certificate_id, cloudinary_url, subject, cc_list):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = 'rudranshpardeshi12@gmail.com'
    load_dotenv()
    smtp_password = os.getenv('SMTP_PASSWORD')  # Set SMTP_PASSWORD in your .env file

    # Load HTML template
    try:
        with open("mails-certificate.html", encoding='utf-8') as f:
            html_content = f.read().replace("{{UID}}", certificate_id)
    except FileNotFoundError:
        print("HTML template not found")
        return

    # Create email message
    msg = MIMEMultipart()
    msg['From'] = smtp_username
    msg['To'] = emails_id
    msg['Subject'] = subject
    msg['Cc'] = ', '.join(cc_list)
    msg.attach(MIMEText(html_content, 'html'))

    # Handle Cloudinary attachment
    try:
        print(f"Downloading image from Cloudinary: {cloudinary_url}")
        response = requests.get(cloudinary_url)
        response.raise_for_status()
        
        # Get the image content and determine MIME type
        image_data = response.content
        content_type = response.headers['Content-Type']
        
        # Create attachment based on content type
        if 'image/png' in content_type:
            attachment = MIMEImage(image_data, 'png')
            ext = 'png'
        elif 'image/jpeg' in content_type:
            attachment = MIMEImage(image_data, 'jpeg')
            ext = 'jpg'
        else:
            # Default to png if content type not recognized
            attachment = MIMEImage(image_data)
            ext = 'png'
        
        attachment.add_header('Content-Disposition', 
                           'attachment', 
                           filename=f"certificate_{certificate_id}.{ext}")
        msg.attach(attachment)
        print("Image attached successfully")
    except Exception as e:
        print(f"Failed to attach Cloudinary image: {e}")
        return

    # Send email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(smtp_username, [emails_id] + cc_list, msg.as_string())
        print(f"Email sent to {emails_id}")
    except Exception as e:
        print(f"Failed to send email: {e}")



# subject = "Certificate-testing"
# html_file = "mails-certificate.html"
# cc_list = [

#     "rudranshpardeshi12@gmail.com",

#     "ashwinchouhan567@gmail.com",

#     "roshniverma93409@gmail.com",

#     "mradulnatani0@gmail.com",
# ]
