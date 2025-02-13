import jwt from 'jsonwebtoken';

export function verifyToken(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export function verifyAdminToken(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return null;
    }
    return decoded;
  } catch (error) {
    console.error('Admin token verification error:', error);
    return null;
  }
}

export function verifyDoctorToken(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'doctor') {
      return null;
    }
    return decoded;
  } catch (error) {
    console.error('Doctor token verification error:', error);
    return null;
  }
}
