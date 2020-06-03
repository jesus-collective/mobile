import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native'

export default class HeaderStyles {
    constructor() {
        this.update()
    }
    style = null
    update(): void {
        this.style = EStyleSheet.create({

            container: {
                backgroundColor: '#333333',

            },
            resourceContainer: {
                backgroundColor: '#292929'
            },
            icon: {
                color: '#aaaaaa',
                fontSize: 22,
            },
            leftButtons: {

                display: Platform.OS === 'web' && Dimensions.get('window').width > 720 ? 'none' : 'flex',
            },
            centerMenuButtons: {
                display: Platform.OS === 'web' && Dimensions.get('window').width > 720 ? 'flex' : 'none',
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
            logo:
            {
                resizeMode: "stretch",
                width: 126,
                height: 33,
                marginRight: 70,

                marginTop: 5,
                marginBottom: 10,
            },

            // Media Query Mobile
            '@media (min-width: 320px) and (max-width: 480px)': {
                resourceContainer: {
                    overflowX: 'scroll'
                },
            },

        });
    }
}