import jwt from 'jsonwebtoken';

// Middleware to protect routes
const protect = (req, res, next) => {
  // Get token from the Authorization header
  let token = req.headers.authorization;

  // Check if token exists and starts with "Bearer"
  if (token && token.startsWith('Bearer')) {
    try {
      // Extract the token string (remove 'Bearer ')
      token = token.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user's ID to the request object
      // This ID comes from the JWT payload
      req.user = decoded.id;

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      // If verification fails, send an error response
      console.error('Token verification failed:', err.message);
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    // If no token is provided, send an error response
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
};

export { protect };
