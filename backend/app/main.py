import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.auth import router as auth_router
from app.database import init_db

app = FastAPI(title="DocLegal API")


@app.on_event("startup")
def startup():
    init_db()


@app.get("/api/health")
def health():
    return {"status": "ok"}


app.include_router(auth_router, prefix="/api/auth", tags=["auth"])

# Serve static Next.js export — must be mounted last so API routes take precedence
_static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.isdir(_static_dir):
    app.mount("/", StaticFiles(directory=_static_dir, html=True), name="frontend")
