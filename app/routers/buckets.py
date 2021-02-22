from fastapi import APIRouter, Depends
from app.dependencies import s3_auth

from botocore.client import BaseClient

router = APIRouter()

@router.get("/")
async def get_buckets(s3: BaseClient = Depends(s3_auth)):
    res = s3.list_buckets()
    return res['Buckets']