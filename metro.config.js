const exclusionList = require("metro-config/src/defaults/exclusionList")

const { getDefaultConfig } = require("expo/metro-config")

const config = getDefaultConfig(__dirname)
config.resolver.blacklistRE = exclusionList([/#current-cloud-backend\/.*/])
module.exports = config
