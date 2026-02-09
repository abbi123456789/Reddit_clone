from dotenv import load_dotenv
import os

load_dotenv()

TOKEN_SECRET = os.getenv('TOKEN_SECRET')
REFRESH_TOKEN_TTL = os.getenv('REFRESH_TOKEN_TTL')
ACCESS_TOKEN_TTL = os.getenv('ACCESS_TOKEN_TTL')