from piccolo.table import Table
from piccolo.columns import Varchar, Timestamptz, Boolean, Email, Text, Integer
import datetime

def utcnow():
    return datetime.datetime.now(datetime.timezone.utc)

class User(Table, tablename='users'):
    username = Varchar(length=30, unique=True, index=True)
    email = Email(unique=True, index=True)
    password = Varchar()
    is_admin = Boolean(default=False)
    is_staff = Boolean(default=False)
    bio = Text(null=True)
    karma = Integer(default=0)
    created_at = Timestamptz()
    updated_at = Timestamptz(auto_update=utcnow)