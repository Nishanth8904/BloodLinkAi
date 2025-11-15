# Example for a Python AI service
FROM python:3.10-slim
WORKDIR /app

# Copy the AI-specific files from the 'ai' subdir
COPY ai/requirements.txt .
COPY ai/main.py .
COPY ai/model.pkl .

RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["uvicorn", "ai.main:app", "--host", "0.0.0.0", "--port", "8000"]