import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import clientPromise from '../../../../lib/mongodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const formData = await req.formData();
  const id = formData.get('id');
  const title = formData.get('title');
  const theme = formData.get('theme');
  const context = formData.get('context');
  const existingSlides = JSON.parse(formData.get('existingSlides') || '[]');
  const newImages = formData.getAll('images');

  const userEmail = session.user.email;
  const basePath = `${userEmail}/`;

  const uploadedSlides = [];

  for (let i = 0; i < newImages.length; i++) {
    const file = newImages[i];
    const desc = formData.get(`desc_${existingSlides.length + i}`) || '';

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    const key = `${basePath}${filename}`;

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    uploadedSlides.push({
      images: [{ filename }],
      description: desc,
    });
  }

  const updatedSlides = [...existingSlides, ...uploadedSlides];

  const client = await clientPromise;
  const db = client.db('memorylane');
  await db.collection('journeys').updateOne({ id }, {
    $set: { title, theme,context, slides: updatedSlides }},{upsert:false}
  );

  return NextResponse.json({ success: true, id });
}
