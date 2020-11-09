module.exports = {
  rewrites: () =>
    process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:8080/api/:path*',
          },
        ]
      : [],
};
