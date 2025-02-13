import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file) {
  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'quantum-doctor',
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );

      uploadStream.end(file.buffer);
    });

    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}
