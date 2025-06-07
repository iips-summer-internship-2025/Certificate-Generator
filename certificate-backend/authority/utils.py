import uuid

# mail imports \\//
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.image import MIMEImage
import os
import requests


def generate_unique_id():
    return str(uuid.uuid4())



# Mailing Function
# def send_bulk_emails(emails_id, certificate_id, certificate_image, subject, cc_list):
#     smtp_server = 'smtp.gmail.com'
#     smtp_port = 587
#     smtp_username = 'shubhanshsharmaking@gmail.com'
#     smtp_password = 'emxsvgcsugutqxno'  # Fill this securely

#     # Load HTML once
#     try:
#         html_file = "mails-certificate.html"
#         with open(html_file, encoding='utf-8') as f:
#             html_content = f.read()
#     except FileNotFoundError:
#         print(f"❌ HTML file not found: {html_file}")
#         return

#     # Connect to SMTP server
#     smtp_conn = smtplib.SMTP(smtp_server, smtp_port)
#     smtp_conn.starttls()
#     smtp_conn.login(smtp_username, smtp_password)

#     # for entry in emails_to_send:
#     recipient = emails_id
#     uid = certificate_id
#     personalized_html = html_content.replace("{{UID}}", uid)
#     file_path = [certificate_image] if certificate_image else []

#     msg = MIMEMultipart()
#     msg['From'] = smtp_username
#     msg['To'] = recipient
#     msg['Subject'] = subject
#     msg['Cc'] = ', '.join(cc_list)

#     # Attach HTML message
#     html_part = MIMEText(personalized_html, 'html')
#     msg.attach(html_part)

#     # Attach files
#     if os.path.exists(file_path):
#         with open(file_path, "rb") as f:
#             part = MIMEApplication(f.read(), _subtype="pdf")
#             filename = os.path.basename(file_path)
#             part.add_header('Content-Disposition', 'attachment', filename=filename)
#             msg.attach(part)
#     else:
#         print(f"⚠️ Attachment not found: {file_path}")

#     # Send email
#     smtp_conn.sendmail(smtp_username, [recipient] + cc_list, msg.as_string())
#     print(f"✅ Sent to: {recipient}")

#     smtp_conn.quit()


def send_bulk_emails(emails_id, certificate_id, cloudinary_url, subject, cc_list):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    smtp_username = 'shubhanshsharmaking@gmail.com'
    smtp_password = 'emxsvgcsugutqxno'  # Use app password here

    # Load HTML template
    try:
        with open("mails-certificate.html", encoding='utf-8') as f:
            html_content = f.read().replace("{{UID}}", certificate_id)
    except FileNotFoundError:
        print("❌ HTML template not found")
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
        print(f"🔄 Downloading image from Cloudinary: {cloudinary_url}")
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
        print("✅ Image attached successfully")
    except Exception as e:
        print(f"❌ Failed to attach Cloudinary image: {e}")
        return

    # Send email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(smtp_username, [emails_id] + cc_list, msg.as_string())
        print(f"✅ Email sent to {emails_id}")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")
# subject = "Certificate-testing"
# html_file = "mails-certificate.html"
# cc_list = [

#     "rudranshpardeshi12@gmail.com",

#     "ashwinchouhan567@gmail.com",

#     "roshniverma93409@gmail.com",

#     "mradulnatani0@gmail.com",
# ]
