export default {
  reactStrictMode: true,

  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },

  experimental: {
    serverActions: true,
  },
};
