const createExpoWebpackConfigAsync = require("@expo/webpack-config")
const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")
//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ManifestPlugin = require("webpack-manifest-plugin")
//const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

module.exports = webpackConfig = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      // Passing true will enable the default Workbox + Expo SW configuration.
      // offline: false,
    },
    argv
  )

  /* config.plugins.push(
     new BundleAnalyzerPlugin({
       path: 'web-report',
     })
   );*/

  return merge(config, {
    plugins: [
      new ManifestPlugin({
        fileName: "manifest.json",
      }),
      //      new DynamicCdnWebpackPlugin(),
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    ],
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`
            },
          },
        },
      },
    },
    resolve: {
      alias: {
        "react-native/Libraries/Renderer/shims/ReactNativePropRegistry":
          "react-native-web/dist/modules/ReactNativePropRegistry",
        "react-native": "react-native-web",
        "react-native-maps": "react-native-web-maps",
      },
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["babel-preset-expo"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-modules-commonjs",
              ],
              cacheDirectory: true,
            },
          },
          include: [
            path.resolve("node_modules/native-base-shoutem-theme"),
            path.resolve("node_modules/react-navigation"),
            path.resolve("node_modules/react-native-easy-grid"),
            path.resolve("node_modules/react-native-drawer"),
            path.resolve("node_modules/react-native-safe-area-view"),
            path.resolve("node_modules/react-native-vector-icons"),
            path.resolve("node_modules/@codler/react-native-keyboard-aware-scroll-view"),
            path.resolve("node_modules/react-native-web"),
            path.resolve("node_modules/react-native-tab-view"),
            path.resolve("node_modules/aws-amplify-react-native"),
            path.resolve("node_modules/static-container"),
            path.resolve("node_modules/@zoomus"),
          ],
        },
      ],
    },
  })
}
