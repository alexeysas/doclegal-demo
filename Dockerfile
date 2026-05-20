# Stage 1: Build Next.js static site
FROM node:20-alpine AS frontend
WORKDIR /build
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Python backend
FROM python:3.12-slim
WORKDIR /app

# Install uv
RUN pip install --no-cache-dir uv

# Install Python dependencies
COPY backend/pyproject.toml ./
RUN uv pip install --system --no-cache .

# Copy backend source
COPY backend/app ./app

# Copy compiled frontend
COPY --from=frontend /build/out ./static

RUN mkdir -p /app/data

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
