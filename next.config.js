/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  webpack(config) {
    // Load SVG files.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // Load YAML files.
    config.module.rules.push({
      test: /\.ya?ml$/i,
      use: "yaml-loader",
    });

    // Export css modules in camelCase.
    config.module.rules
      .find(({ oneOf }) => !!oneOf)
      .oneOf.filter(({ use }) => JSON.stringify(use)?.includes("css-loader"))
      .reduce((acc, { use }) => acc.concat(use), [])
      .forEach(({ options }) => {
        if (options?.modules) {
          options.modules.exportLocalsConvention = "camelCase";
        }
      });

    return config;
  },
};

module.exports = nextConfig;
