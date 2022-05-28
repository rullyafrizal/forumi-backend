export default {
  uri: process.env.DB_URI || 'mysql://root:root@localhost:3306/test',
  options: {
    dialect: 'mysql',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      useUTC: false
    },
    logging: console.log,
    timezone: process.env.TZ || '+07:00'
  }
}
