from fastapi import APIRouter, Depends

router = APIRouter()

@router.post("/")
def aws_auth(token: str):
    return {"token":str}