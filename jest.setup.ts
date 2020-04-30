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

jest.mock('expo-constants')
jest.mock('@unimodules/react-native-adapter')
jest.mock('expo-file-system')

jest.mock('expo-asset')
jest.mock('expo-font')