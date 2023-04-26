const copyPlugin = require("copy-webpack-plugin");
const tsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("node:path");

/** @type {import("webpack").Configuration} */
const config = {
  mode: "development",
  entry: {
    "components/stateful": path.resolve(__dirname, "components/stateful/index.ts"),
    "components/stateless": path.resolve(__dirname, "components/stateless/index.ts"),
    contexts: path.resolve(__dirname, "contexts/index.ts"),
    hooks: path.resolve(__dirname, "hooks/index.ts"),
    lib: path.resolve(__dirname, "lib/index.ts"),
    "lib/backend": path.resolve(__dirname, "lib/backend/index.tsx"),
    "lib/api": path.resolve(__dirname, "lib/api/index.ts"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    // alias: {
    //   "@components/stateful": path.resolve(__dirname, "components/stateful/index.ts"),
    //   "@components/stateless": path.resolve(__dirname, "components/stateless/index.ts"),
    //   "@contexts": path.resolve(__dirname, "contexts/index.ts"),
    //   "@hooks": path.resolve(__dirname, "hooks/index.ts"),
    //   "@lib/backend": path.resolve(__dirname, "lib/backend/index.tsx"),
    //   "@lib/api": path.resolve(__dirname, "lib/api/index.ts"),
    //   "@lib": path.resolve(__dirname, "lib/index.ts"),
    //   "@public": path.resolve(__dirname, "public"),
    //   "@styles": path.resolve(__dirname, "styles"),
    // },
    plugins: [new tsConfigPathsPlugin({ configFile: "tsconfig.webpack.json" })],
    fallback: { path: false, util: false },
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.webpack.json",
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: "@svgr/webpack",
      },
      {
        test: /\.css$/i,
        loader: "css-loader",
        exclude: /node_modules/,
        options: {
          modules: {
            exportGlobals: true,
            exportLocalsConvention: "camelCase",
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new copyPlugin({
      patterns: [
        { from: "styles", to: "styles" },
        { from: "public", to: "public" },
      ],
    }),
  ],
};

module.exports = config;
