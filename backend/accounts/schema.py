from pydantic import BaseModel, EmailStr

class RegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    identifier: str
    password: str

class ResendVerificationSchema(BaseModel):
    email: EmailStr

class UserSchema(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_admin: bool
    email_verified: bool
    auth_provider: str
