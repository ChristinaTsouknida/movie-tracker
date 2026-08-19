from app.core.security import hash_password, verify_password

def test_hash_password_creates_different_string():
    password = "mypassword123"
    hashed = hash_password(password)
    assert hashed != password


def test_verify_password_correct():
    password = "mypassword123"
    hashed = hash_password(password)
    assert verify_password(password, hashed) == True

def test_verify_password_false():
    password = "mypassword123"
    verify = "testing"
    hashed = hash_password(password)
    assert verify_password(verify, hashed) == False