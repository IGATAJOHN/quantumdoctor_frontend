import multer from 'multer';
import { ApiError } from './error-handler';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new ApiError(400, 'Only image files are allowed'), false);
    }
  },
});

export const uploadMiddleware = upload.fields([
  { name: 'picture', maxCount: 1 },
  { name: 'medical_license', maxCount: 1 },
  { name: 'medical_school_cert', maxCount: 1 },
  { name: 'nysc_cert', maxCount: 1 },
]);
