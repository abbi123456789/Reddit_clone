import re
import time

def create_timestamped_slug(text:str)->str:
    text = text.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', text)
    slug = re.sub(r'-+', '-', slug).strip('-')
    timestamp = int(time.time())
    return f"{slug}-{timestamp}"