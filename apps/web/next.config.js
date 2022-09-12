const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = {
  i18n,

  eslint: {
    dirs: ['src'],
  },

  images: {
    domains: ['localhost', 'portaladmin.coding.icloudeng.xyz', '127.0.0.1'],
  },

  publicRuntimeConfig: {
    directus_url: process.env.DIRECTUS_URL,
    cms_url: process.env.CMS_URL,
  },

  serverRuntimeConfig: {
    directus_email: process.env.DIRECTUS_EMAIL,
    directus_password: process.env.DIRECTUS_PASSWORD,
    directus_token: process.env.DIRECTUS_STATIC_TOKEN,
  },

  reactStrictMode: true,

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
