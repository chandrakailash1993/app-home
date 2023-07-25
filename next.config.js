/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";

  return {
    shell: `shell@${process.env.NEXT_PUBLIC_SHELL_APP_ENDPOINT}/_next/static/${location}/remoteEntry.js`,
    product: `product@${process.env.NEXT_PUBLIC_PRODUCT_APP_ENDPOINT}/_next/static/${location}/remoteEntry.js`,
  };
};

const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./home": "./pages/index.js",
          "./pages-map": "./pages-map.js",
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
