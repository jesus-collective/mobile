const createExpoWebpackConfigAsync = require("@expo/webpack-config")
const { merge } = require("webpack-merge")
const path = require("path")

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)
  // Customize the config before returning it.
  return merge(config, {
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
              plugins: ["react-native-reanimated/plugin"],
              cacheDirectory: true,
            },
          },
          exclude: /node_modules\/(?!react-native-reanimated)/,
          include: [
            path.resolve("node_modules/react-navigation"),
            path.resolve("node_modules/react-native-reanimated"),
            path.resolve("node_modules/react-native-easy-grid"),
            path.resolve("node_modules/react-native-drawer"),
            path.resolve("node_modules/react-native-safe-area-view"),
            path.resolve("node_modules/react-native-vector-icons"),
            path.resolve("node_modules/@codler/react-native-keyboard-aware-scroll-view"),
            path.resolve("node_modules/react-native-tab-view"),
            path.resolve("node_modules/static-container"),
            path.resolve("node_modules/@zoomus"),
          ],
        },
      ],
    },
  })
}
