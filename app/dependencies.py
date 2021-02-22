import boto3
from botocore.client import BaseClient

from app.config import settings

def s3_auth() -> BaseClient: # -> BaseClient : Return Type이 BaseClient
    s3 = boto3.client(
        service_name='s3', 
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
    )
    return s3


def ec2_auth() -> BaseClient:
    ec2 = boto3.client(
        service_name='ec2'
        
    )

    return ec2