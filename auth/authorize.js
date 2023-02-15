import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authorize = async (req, res, next) => {
  try {
    // If the token is passed
    if (req.headers.authorization) {
      // parse token from header
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        const payload = jwt.verify(token, process.env.SECRET);
        if (payload) {
          req.user = payload;
          next();
        } else {
          res.status(403).json({ error: 'Token cannot be verified.' });
        }
      } else {
        res.status(401).json({ error: 'Invalid Auth header' });
      }
    } else {
      res.status(401).json({ error: 'No authorization header' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default authorize;
