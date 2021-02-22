from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.api import api_router

app = FastAPI()

origins = [
    "http://54.180.89.89:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(api_router)