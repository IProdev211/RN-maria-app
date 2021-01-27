import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import DashBoardHeader from '../../../components/DashBoardHeader';
import SettingTitle from '../../../components/SettingTitle';
//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../../redux/Main/duck';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  render() {
    return (
      <SafeAreaView>
        <DashBoardHeader
          backNavigation={true}
          navigation={this.props.navigation}
          title="ヘルプ"
        >
          <View style={{ backgroundColor: '#fff' }}>
            <SettingTitle text="申し訳ありません、コンテンツアップロードまで少々お待ちください。" />
            {/* <SettingTitle text="オフにすると、タグづけされた時に許可通知がくるようになります" /> */}
          </View>
          <View style={{ paddingTop: 50 }} />
        </DashBoardHeader>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    userInfo: state.mainReducers.main.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
