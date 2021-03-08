from botocore.exceptions import ClientError


def upload_file_to_bucket(s3, file, folder, bucket):
  # def upload_file_to_bucket(s3, files, folder, bucket):
  res = ''
  # for file in files:
  key = f"{folder}/{file.filename}"
  ret = False
  try:
    s3.upload_fileobj(file.file, bucket, key)
    ret = True
  except ClientError as err:
    res = str(err)
  except Exception as err:
    res = str(err)

  return dict(
      key=key,
      result=ret,
      message=res
    )