import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native'

export default class HeaderStyles {

    constructor() {
        this.update()
    }
    static instance: HeaderStyles
    public static getInstance(): HeaderStyles {
        if (!HeaderStyles.instance) {
            HeaderStyles.instance = new HeaderStyles();
        }

        return this.instance;
    }
    style!: EStyleSheet.AnyObject;
    update(): void {
        this.style = EStyleSheet.create({

            container: {
                backgroundColor: '#333333',

            },
            resourceContainer: {
                backgroundColor: '#292929'

            },
            adminContainer: {
                backgroundColor: '#292929'

            },
            icon: {
                color: '#aaaaaa',
                fontSize: 22,
            },
            leftButtons: {

                display: Platform.OS === 'web' && Dimensions.get('window').width > 720 ? 'none' : 'flex',
            },
            // leftButtonsSubNav: {

            //     display: Platform.OS === 'web' && Dimensions.get('window').width > 720 ? 'none' : 'flex',
            // },
            centerMenuButtons: {
                display: Platform.OS === 'web' && Dimensions.get('window').width > 720 ? 'flex' : 'none',
                paddingBottom: 12
            },
            centerMenuButtonsSubNav: {
                display: 'flex',
                paddingBottom: 12
            },
            centerMenuButtonsText: {
                color: '#aaaaaa',
                fontSize: 15,
                fontWeight: 'bold',
                marginRight: 30,
                '@media only screen and (max-width: 600px)': {

                    display: 'none',

                },
            },
            centerMenuButtonsTextSelected: {
                color: '#ffffff',
                fontSize: 15,
                fontWeight: 'bold',
                marginRight: 30,
                '@media only screen and (max-width: 600px)': {

                    display: 'none',

                },
            },
            centerMenuButtonsTextResources: {
                color: '#aaaaaa',
                fontSize: 15,
                fontWeight: 'bold',
                '@media (max-width: 600px)': {

                    display: 'none',

                },
            },
            resourcesMenuButtonsText: {
                color: '#666666',
                fontSize: 14,
                lineHeight: 21,
                fontWeight: 'normal',
                marginLeft: "11rem",

                '@media only screen and (max-width: 600px)': {
                    display: "none",
                },
            },
            dropdownText: {
                fontFamily: 'Graphik-Regular-App',
                fontSize: 16,
                lineHeight: 21,
                paddingLeft: 10,
                paddingRight: 20
            },
            logo:
            {
                resizeMode: "stretch",
                width: 126,
                height: 33,
                marginRight: 70,

                marginTop: 5,
                marginBottom: 10,
            },

            headerRightContainer: {
                marginRight: 12
            },

            // Media Query Mobile
            '@media (min-width: 320px) and (max-width: 480px)': {
                resourceContainer: {
                    overflowX: 'scroll'
                },
                centerMenuButtonsSubNav: {
                    overflowX: 'scroll',
                },
            },

        });
    }
}