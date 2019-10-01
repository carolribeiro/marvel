module.exports = {
  database: process.env.MONGO_URI || 'localhost/marvel',
  publicKey: process.env.MARVEL_API_PUBLIC_KEY || '8346d461fa71a8927973e38199c9d2e4',
  privateKey: process.env.MARVEL_API_PRIVATE_KEY || '9ca18c5f710af9adb2e9c3d12423824198ada02e'
};
