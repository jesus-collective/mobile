const createExpoWebpackConfig = require("@expo/webpack-config");
const path = require("path");
const merge = require("webpack-merge");

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfig(env, argv);

  return merge(config, {
    resolve: {
      alias: {
        "react-native/Libraries/Renderer/shims/ReactNativePropRegistry":
          "react-native-web/dist/modules/ReactNativePropRegistry",
        "react-native": "react-native-web",
        'react-native-maps': 'react-native-web-maps'
      }
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["babel-preset-expo"],
              plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-modules-commonjs"],
              cacheDirectory: true
            }
          },
          include: [
            path.resolve("node_modules/native-base-shoutem-theme"),
            path.resolve("node_modules/react-navigation"),
            path.resolve("node_modules/react-native-easy-grid"),
            path.resolve("node_modules/react-native-drawer"),
            path.resolve("node_modules/react-native-safe-area-view"),
            path.resolve("node_modules/react-native-vector-icons"),
            path.resolve(
              "node_modules/react-native-keyboard-aware-scroll-view"
            ),
            path.resolve("node_modules/react-native-web"),
            path.resolve("node_modules/react-native-tab-view"),
            path.resolve("node_modules/aws-amplify-react-native"),
            path.resolve("node_modules/static-container")
          ]
        }
      ]
    }
  });
};