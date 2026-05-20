import os
from datetime import datetime, timedelta, timezone

import bcrypt
import jwt
from fastapi import APIRouter, Cookie, HTTPException, Response
from pydantic import BaseModel

from app.database import get_db

router = APIRouter()

JWT_SECRET = os.environ.get("JWT_SECRET", "dev-secret-change-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_HOURS = 24
COOKIE_NAME = "auth_token"


class AuthRequest(BaseModel):
    email: str
    password: str


def _make_token(user_id: int, email: str) -> str:
    payload = {
        "sub": str(user_id),
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRE_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def _decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


@router.post("/signup")
def signup(data: AuthRequest, response: Response):
    hashed = bcrypt.hashpw(data.password.encode(), bcrypt.gensalt()).decode()
    db = get_db()
    try:
        cursor = db.execute(
            "INSERT INTO users (email, password_hash) VALUES (?, ?) RETURNING id",
            (data.email, hashed),
        )
        user_id = cursor.fetchone()[0]
        db.commit()
    except Exception:
        raise HTTPException(status_code=400, detail="Email already registered")
    finally:
        db.close()

    token = _make_token(user_id, data.email)
    response.set_cookie(COOKIE_NAME, token, httponly=True, samesite="lax")
    return {"email": data.email}


@router.post("/signin")
def signin(data: AuthRequest, response: Response):
    db = get_db()
    row = db.execute("SELECT * FROM users WHERE email = ?", (data.email,)).fetchone()
    db.close()
    if not row or not bcrypt.checkpw(data.password.encode(), row["password_hash"].encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = _make_token(row["id"], row["email"])
    response.set_cookie(COOKIE_NAME, token, httponly=True, samesite="lax")
    return {"email": data.email}


@router.post("/signout")
def signout(response: Response):
    response.delete_cookie(COOKIE_NAME)
    return {"ok": True}


@router.get("/me")
def me(auth_token: str | None = Cookie(default=None)):
    if not auth_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = _decode_token(auth_token)
    return {"id": payload["sub"], "email": payload["email"]}
