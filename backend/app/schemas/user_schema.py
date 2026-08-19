from pydantic import BaseModel, Field

class UserRegister(BaseModel):
    full_name: str = Field(examples=["Christina Tsouknida"])
    email: str = Field(examples=["christina@gmail.com"])
    password: str = Field(examples=["mypassword"])

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str


class UserLogin(BaseModel):
    email: str = Field(examples=["christina@example.com"])
    password: str = Field(examples=["mypassword"])


class Token(BaseModel):
    access_token: str
    token_type: str