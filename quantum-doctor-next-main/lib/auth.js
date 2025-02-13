import { verify } from 'jsonwebtoken';
import prisma from './prisma';

export async function verifyToken(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function verifyAdminToken(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verify(token, process.env.JWT_ADMIN_SECRET);
    
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
    });

    return admin;
  } catch (error) {
    return null;
  }
}

export async function verifyDoctorToken(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verify(token, process.env.JWT_DOCTOR_SECRET);
    
    const doctor = await prisma.doctor.findUnique({
      where: { id: decoded.doctorId },
    });

    return doctor;
  } catch (error) {
    return null;
  }
}
