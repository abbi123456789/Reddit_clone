import os
import boto3
from botocore.exceptions import ClientError
from litestar.exceptions import InternalServerException
import uuid

def get_s3_client():
    """Initialize and return an S3 client using environment credentials."""
    return boto3.client(
        's3',
        aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
        region_name=os.environ.get('AWS_REGION', 'ap-south-2')
    )

def upload_file_to_s3(file_content: bytes, original_filename: str, content_type: str) -> str:
    """
    Uploads a file to an S3 bucket and returns its public URL.
    Generates a unique filename to prevent collisions.
    """
    bucket_name = os.environ.get('S3_BUCKET_NAME')
    if not bucket_name:
        raise InternalServerException("S3_BUCKET_NAME environment variable is not set")

    s3_client = get_s3_client()
    
    # Generate a unique path for the file
    file_extension = os.path.splitext(original_filename)[1]
    unique_filename = f"uploads/{uuid.uuid4()}{file_extension}"
    
    try:
        s3_client.put_object(
            Bucket=bucket_name,
            Key=unique_filename,
            Body=file_content,
            ContentType=content_type,
        )
    except ClientError as e:
        print(f"Failed to upload to S3: {e}")
        raise InternalServerException(f"Failed to upload image to S3: {e}")

    # Construct and return the public URL
    region = os.environ.get('AWS_REGION', 'us-east-1')
    url = f"https://{bucket_name}.s3.{region}.amazonaws.com/{unique_filename}"
    return url
