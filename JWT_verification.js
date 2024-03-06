const jwt = require('jsonwebtoken');

const token = 'your-jwt-token';
const secretKey = 'your-secret-key';
try {
  const decoded = jwt.verify(token, secretKey);
  console.log(decoded);
} catch (error) {
  console.error('JWT verification failed');
}