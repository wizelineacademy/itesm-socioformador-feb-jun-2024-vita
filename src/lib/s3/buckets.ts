import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Resource } from 'sst'

export const createS3Url = async () => {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.MyBucket.name,
  })
  const url = await getSignedUrl(new S3Client({}), command)
  return url
}

export const deleteS3Image = async (imageUrl: string) => {
  // Extract the key from the URL
  const url = new URL(imageUrl)
  const key = url.pathname.substring(1)

  const command = new DeleteObjectCommand({
    Bucket: Resource.MyBucket.name,
    Key: key,
  })

  try {
    await new S3Client({}).send(command)
    return { success: true }
  } catch (error) {
    console.error('Failed to delete image from S3:', error)
    return { success: false, error: error }
  }
}
