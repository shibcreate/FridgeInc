const jwt = require('jsonwebtoken');

const userId = Date.now();
const payload = { userId, role: 'admin' };
const secretKey = 'your-secret-key';
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log(userId + " " + role + " " + secretKey);