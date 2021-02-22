from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.routers import buckets, upload, aws_auth

api_router = APIRouter()

api_router.include_router(
    buckets.router, 
    prefix="/buckets",
    tags=["Bucket Info"]
)

api_router.include_router(
    upload.router,
    prefix="/upload",
    tags=["Upload"]
)

api_router.include_router(
    aws_auth.router,
    prefix="/aws_auth",
    tags=["AWS authentication"]
)