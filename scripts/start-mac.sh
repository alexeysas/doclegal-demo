#!/bin/bash
set -e
docker compose up -d --build
echo "DocLegal running at http://localhost:8000"
