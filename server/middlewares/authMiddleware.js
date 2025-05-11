import Company from '../models/company.js';
import jwt from 'jsonwebtoken';
export const protectCompany = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, Login again" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const company = await Company.findById(decoded.id).select('-password');
  
      if (!company) {
        return res.status(401).json({ success: false, message: "Company not found" });
      }
  
      req.company = company;
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  };
  