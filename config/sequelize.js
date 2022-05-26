export default {
  uri: process.env.DB_URI || 'mysql://root:root@localhost:3306/test',
  database: process.env.DB_NAME || 'test',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  options: {
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    logging: console.log,
    timezone: process.env.TZ || '+07:00',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306
  }
}
