import { Container } from 'native-base';
import * as React from 'react';
//import { WebView, Linking } from 'react-native';
import { NavigationEvents } from 'react-navigation';
interface Props {
    url: string
}
interface State {
    url: string
}
export default class JCBrowser extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    state = {
        url: this.props.url,
    };

    isJesusCollectiveUrl(uri: string | undefined) {
        if (uri == undefined) return false;
        if (uri.startsWith("http://jesuscollective.com")) return true;
        if (uri.startsWith("https://jesuscollective.com")) return true;
        if (uri.startsWith("http://www.jesuscollective.com")) return true;
        if (uri.startsWith("https://www.jesuscollective.com")) return true;
        return false;
    }
    webview: any;
    //    <NavigationEvents onWillFocus={payload => { this.setState({ url: this.props.url }); console.log('will focus', payload) }} />

    render() {
        return (
            <Container>

                <WebView
                    ref={(ref) => { this.webview = ref; }}
                    onLoadStart={(navState) => this.setState({ url: navState.nativeEvent.url })}
                    source={{
                        uri: this.state.url,
                        headers: { "jesuscollective-origin": "react-native-app" }
                    }}
                    onNavigationStateChange={(event) => {
                        if (!this.isJesusCollectiveUrl(event.url)) {
                            this.webview.stopLoading();
                            // if (event.url != undefined)
                            // Linking.openURL(event.url);
                        }
                    }}
                    style={{ marginTop: 0 }}
                />
            </Container>

        )
    }
}