import copyPlugin from "copy-webpack-plugin";
import path from "node:path";
import tsConfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("webpack").Configuration} */
const config = {
  mode: "production",
  devtool: "inline-source-map",
  target: "es2022",
  entry: {
    "components/stateful/index": path.resolve(__dirname, "components/stateful/index.ts"),
    "components/stateless/index": path.resolve(__dirname, "components/stateless/index.ts"),
    "contexts/index": path.resolve(__dirname, "contexts/index.ts"),
    "hooks/index": path.resolve(__dirname, "hooks/index.ts"),
    "lib/index": path.resolve(__dirname, "lib/index.ts"),
    "lib/backend/index": path.resolve(__dirname, "lib/backend/index.tsx"),
    "lib/api/index": path.resolve(__dirname, "lib/api/index.ts"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [new tsConfigPathsPlugin({ configFile: "tsconfig.webpack.json" })],
    fallback: { path: "node:path", util: "util" },
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
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[chunkhash].js",
    chunkFormat: "module",
    library: {
      type: "module",
    },
  },
  plugins: [
    new copyPlugin({
      patterns: [{ from: "public", to: "public", filter: (resourcePath) => !resourcePath.includes("public/uikit") }],
    }),
  ],
};

export default config;
