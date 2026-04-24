import asyncio
import smtplib
from email.message import EmailMessage
from urllib.parse import quote

from settings import (
    FRONTEND_URL,
    SMTP_FROM_EMAIL,
    SMTP_HOST,
    SMTP_PASSWORD,
    SMTP_PORT,
    SMTP_USE_TLS,
    SMTP_USERNAME,
)


def _send_email(message: EmailMessage) -> None:
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as smtp:
        if SMTP_USE_TLS:
            smtp.starttls()
        if SMTP_USERNAME:
            smtp.login(SMTP_USERNAME, SMTP_PASSWORD)
        smtp.send_message(message)


async def send_verification_email(email: str, username: str, token: str) -> None:
    verification_url = f"{FRONTEND_URL}/verify-email?token={quote(token)}"

    if not SMTP_HOST or not SMTP_FROM_EMAIL:
        print(f"Email verification for {email}: {verification_url}")
        return

    message = EmailMessage()
    message["Subject"] = "Verify your email"
    message["From"] = SMTP_FROM_EMAIL
    message["To"] = email
    message.set_content(
        f"Hi {username},\n\n"
        f"Verify your email by opening this link:\n{verification_url}\n\n"
        "If you didn't create this account, you can ignore this email."
    )

    await asyncio.to_thread(_send_email, message)
