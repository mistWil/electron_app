require('dotenv').config(); // Assurez-vous d'avoir installé le package dotenv

const config = {
  app: {
    name: 'Protect Yourself',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development'
  },
  server: {
    port: 3000,
    host: 'localhost'
  },
  database: {
    url: 'mongodb://localhost:27017/protect-yourself',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  api: {
    url: 'http://localhost:3000',
    key: 'abc123'
  },
  softwares: {
    bitwarden: {
      url: 'http://localhost:3000/bitwarden/securityTools',
    },
    privazer: {
      url: 'http://localhost:3000/privazer/securityTools',
    },
    protonVpn: {
      url: 'http://localhost:3000/protonVpn/securityTools',
    },
  },
  email: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'yourcontact.py@gmail.com',
      pass: 'rwir ojab flbc ibuu'
    }
  }
};

module.exports = config;