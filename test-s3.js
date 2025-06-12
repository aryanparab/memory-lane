require('dotenv').config();

const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

console.log("🔍 Raw process.env keys (first 3):");
console.log(Object.keys(process.env).slice(0, 3)); // check if anything loaded

console.log("🔍 Env vars:");
console.log({
  AWS_ACCESS_KEY_ID_ID_ID_ID_ID_ID: process.env.AWS_ACCESS_KEY_ID_ID_ID_ID_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
});

if (!process.env.AWS_ACCESS_KEY_ID_ID_ID_ID_ID) {
  console.error("❌ .env not loaded — check .env file location/format");
  process.exit(1);
}

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_ID_ID_ID_ID.trim(),
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY.trim(),
  },
});

async function test() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET,
    });
    const res = await s3.send(command);
    console.log("✅ Success:", res);
  } catch (err) {
    console.error("❌ Failed:", err);
  }
}

test();
