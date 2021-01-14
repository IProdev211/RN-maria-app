import React, { Component } from 'react';
import { Text } from 'react-native';
import DashBoardHeader from '../../../components/DashBoardHeader';

class CreateNewCast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        backNavigation={true}
        notificationHide={true}
        scrollingOff={true}
        title="お知らせ">
        <Text>Main Page</Text>
      </DashBoardHeader>
    );
  }
}

export default CreateNewCast;
