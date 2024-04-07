export default {
  port: 3000,
  scrypt: {
    len: 64,
    salt: 'IOJH02ro2314u34@09u82',
  },
  jwt: {
    secret: 'FOPfoepwqfaso3204Q*#r^78E4',
    expiresIn: '1d',
  },
  db: {
    url: 'postgres://user:password@localhost:5432/postgres',
  },
};
