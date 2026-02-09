import bcrypt
import asyncio

async def hash_password(password: str) -> str:
    password_bytes = password.encode('utf-8')
    # gensalt() and hashpw() are computationally heavy
    hashed = await asyncio.to_thread(bcrypt.hashpw, password_bytes, bcrypt.gensalt())
    return hashed.decode('utf-8')

async def verify_password(password: str, hashed_password: str) -> bool:
    return await asyncio.to_thread(bcrypt.checkpw, password.encode('utf-8'), hashed_password.encode('utf-8'))