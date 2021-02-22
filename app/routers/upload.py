from botocore.client import BaseClient
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import File, UploadFile
from fastapi.responses import JSONResponse

from app.dependencies import s3_auth
from app.s3.upload import upload_file_to_bucket

from typing import List

router = APIRouter()

@router.post("/{bucket}/{folder}")
def upload_file(
    bucket:str,
    folder:str,  
    files: List[UploadFile]=File(...),
    s3: BaseClient=Depends(s3_auth)): 

    upload_obj = upload_file_to_bucket(
        s3=s3, 
        files=files,
        bucket=bucket,
        folder=folder
    )

    if upload_obj:
        return JSONResponse(
            content=f"AWS:S3:Upload processing of {bucket}/{folder} complete", 
            status_code=status.HTTP_201_CREATED
        )
    else:
        return JSONResponse(
            content=f"AWS:S3:Upload processing failed", 
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )