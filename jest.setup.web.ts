import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import { Asset } from 'expo-asset';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('react-native-reanimated', () => {
    return {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        openURL: jest.fn(),
        canOpenURL: jest.fn(),
        getInitialURL: jest.fn(),
    }
})

jest.mock('expo-constants', () => {
    return {
        ExponentConstants: jest.fn(),
        expoVersion: jest.fn()
    }
})
//jest.mock('ExponentConstants')
jest.mock('@unimodules/react-native-adapter')
jest.mock('expo-file-system')

/*jest.mock('expo-asset', () => {
    return {
        Asset: jest.fn(),
        _expoAsset: jest.fn(),
        fromModule: jest.fn()
    }
})*/
jest.mock('expo-font')
jest.mock('request-promise-core')
/*jest.mock('expo-file-system', () => {
    return {
        downloadAsync: jest.fn(),
        getInfoAsync: jest.fn(() => Promise.resolve({ exists: true, md5: 'md5', uri: 'uri' })),
        readAsStringAsync: jest.fn(),
        writeAsStringAsync: jest.fn(),
        deleteAsync: jest.fn(),
        moveAsync: jest.fn(),
        copyAsync: jest.fn(),
        makeDirectoryAsync: jest.fn(),
        readDirectoryAsync: jest.fn(),
        createDownloadResumable: jest.fn()
    }

});*/


jest.mock('expo-file-system', () => {
    const FileSystem = require.requireActual('expo-file-system');
    return {
        ...FileSystem,
        bundleDirectory: 'file:///Expo.app/',
        cacheDirectory: 'file:///Caches/Expo.app/',
        bundledAssets: ['asset_test1.png'],
        getInfoAsync: jest.fn(),
        downloadAsync: jest.fn(),
    };
});

jest.mock('react-native/Libraries/Image/AssetRegistry', () => {
    return {
        getAssetByID: jest.fn(),
    };
});

jest.mock('react-native/Libraries/Image/resolveAssetSource', () => {
    return {
        default: jest.fn(),
        setCustomSourceTransformer: jest.fn(),
    };
});

jest.mock('expo-asset', () => {
    const ImageAssets = require.requireActual('expo-asset');
    return {
        ...ImageAssets,
        getImageInfoAsync: jest.fn(),
    };
});

const mockImageMetadata = {
    name: 'test',
    type: 'png',
    hash: 'cafecafecafecafecafecafecafecafe',
    scales: [1],
    httpServerLocation: '/assets',
    fileHashes: ['cafecafecafecafecafecafecafecafe'],
};