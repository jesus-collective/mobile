import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native'
export default class HeaderStyles {

    constructor() {
        this.update()
    }
    static instance = null
    public static getInstance(): HeaderStyles {
        if (HeaderStyles.instance == null) {
            HeaderStyles.instance = new HeaderStyles();
        }

        return this.instance;
    }
    style = null

    update(): void {
        this.style = EStyleSheet.create({

            container: {
                backgroundColor: '#333333',
            },
            courseSidebarFontRegular: {
                fontFamily: "Graphik-Regular-App",
                color: "#cccccc",
                fontSize: 16,
                marginLeft: 5
            },
            icon: {
                color: '#aaaaaa'
            },
            leftButtons: {

                display: Platform.OS === 'web' && Dimensions.get('window').width > 720 ? 'none' : 'flex',
            },
            centerMenuButtons: {
                display: Platform.OS === 'web' && Dimensions.get('window').width > 720 ? 'flex' : 'none',

            },
            centerMenuButtonsText: {
                color: '#aaaaaa',
                fontSize: 15,
                fontWeight: 'bold',
                marginRight: 30
            },
            logo:
            {
                resizeMode: "stretch",
                width: 126,
                height: 33,
                marginRight: 70,
                marginTop: 20,
                marginLeft: 20,
                marginBottom: 10,
            }

        });
    }
}