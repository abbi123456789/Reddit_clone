from pydantic import BaseModel, EmailStr

class RegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    username_or_email: str
    password: str

class UserSchema(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_admin: bool