import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "ATS Resume Optimizer"
    API_V1_STR: str = "/api/v1"
    
    # Database URL
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/ats_db")
    # Fallback to sqlite locally for quick validation if PostgreSQL is unavailable
    SQLITE_DATABASE_URL: str = "sqlite:///./local_ats.db"
    
    # Supabase Storage Configurations
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_BUCKET_NAME: str = os.getenv("SUPABASE_BUCKET_NAME", "ats-resumes")
    
    # CORS Origins
    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:3002",
        "http://127.0.0.1:3002",
        "http://localhost:8000",
    ]

settings = Settings()
