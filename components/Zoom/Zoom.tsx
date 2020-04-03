import { ZoomMtg } from '@zoomus/websdk';
import React from 'react';
import { Container, View, Header, Left, Body, Right, Button } from 'native-base';
import "./Zoom.css"
//console.log('checkSystemRequirements');
//console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
//ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.2/lib', '/av'); // CDN version default
// else ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.7.2/lib', '/av'); // china cdn option 
// ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/@zoomus/websdk/dist/lib', '/av'); // Local version default, Angular Project change to use cdn version
//ZoomMtg.preLoadWasm();
//ZoomMtg.prepareJssdk();

interface Props {

}
interface State {

}

export default class GroupScreen extends React.Component<Props, State>{
    API_KEY = 'C8Z1xof_SaC2MX5HyuWeLA';
   
    meetConfig = {
        apiKey: this.API_KEY,
        apiSecret: this.API_SECRET,
        meetingNumber: 8697112004,
        userName: "George Bell2",
        userEmail: "",
        passWord: '',
        leaveUrl: 'https://zoom.us',
        role: 0
    };
    constructor(props: Props) {
        super(props);
        console.log(this.meetConfig.meetingNumber)
        this.startUp()

    }
    async startUp() {
        ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib', '/av')
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareJssdk();
        var res = ZoomMtg.generateSignature({
            meetingNumber: this.meetConfig.meetingNumber,
            apiKey: this.meetConfig.apiKey,
            apiSecret: this.meetConfig.apiSecret,
            role: this.meetConfig.role,

        });
        console.log(res)

        ZoomMtg.init({
            debug: true,
            leaveUrl: 'https://www.zoom.us',
            showMeetingHeader:true,
            audioPanelAlwaysOpen:true,
            videoDrag:true,
            videoHeader:true,
            isLockBottom:true,
            success: () => {
                console.log("Done Init")
                ZoomMtg.join(
                    {
                        debug: true,
                        meetingNumber: this.meetConfig.meetingNumber,
                        userName: this.meetConfig.userName,
                        signature: res,
                        apiKey: this.meetConfig.apiKey,
                        userEmail: this.meetConfig.userEmail,
                        passWord: this.meetConfig.passWord,
                        success() {
                            // $('#nav-tool').hide();
                            console.log('join meeting success');
                        },
                        error(res) {
                            console.log(res);
                        }
                    }
                );
            },
            error: (e) => { console.log(e) }
        });


    }
    render() {
        return (
            <div >

            </div>
        )
    };
}