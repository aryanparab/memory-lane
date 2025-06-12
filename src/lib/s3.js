import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadImageToS3(fileBuffer, fileType) {
  const filename = `${uuidv4()}.${fileType.split('/')[1]}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
    Body: fileBuffer,
    ContentType: fileType,
    ACL: 'public-read',
  });

  await s3.send(command);

  return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${filename}`;
}
