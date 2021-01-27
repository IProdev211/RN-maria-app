import React, { Component, useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';

const VideoCallData = route => {
  console.log(route);
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appId: '2469928ad98c45efa5623bc2591cad91',
    channel: route.route.route.params.channel,
  };
  const callbacks = {
    EndCall: () => closePanel(),
  };
  closePanel = () => {
    setVideoCall(false);
    route.route.navigation.goBack();
  };

  return videoCall ? (
    <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
  ) : (
      <></>
    );
};

class ZoomCall extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <VideoCallData route={this.props} />;
  }
}

export default ZoomCall;

//this.props.route.params.tweetId;
