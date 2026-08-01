from pydantic import BaseModel

class UserRegister(BaseModel):
    full_name: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str


class UserLogin(BaseModel):
    email: str
    password: str
