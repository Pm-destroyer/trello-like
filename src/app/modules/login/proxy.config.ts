const proxy = require('http-proxy-middleware');

module.exports = (app: any) => {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:4200',
      secure: false,
      changeOrigin: true,
    })
  );
};
