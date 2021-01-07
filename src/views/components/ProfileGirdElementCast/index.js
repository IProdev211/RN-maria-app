import React, {Component} from 'react';
import styles from './styles';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import {Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
//redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {duckOperations} from '../../../redux/Main/duck';
class ProfileGirdElementCast extends Component {
  constructor() {
    super();
  }
  rowPressAction = id => {
    this.props.navigation.push('UserDetailsCast', {
      userId: id,
      onGoBack: () => this.refresh(),
    });
  };
  rowPressActionLong = (id, status) => {
    this.props.addUserForCast(this.props.data, status);
    this.forceUpdate();
  };
  refresh = () => {
    this.forceUpdate();
    console.log('refresh funtion called');
  };
  checkUserAlreadyAddedOrNot = () => {
    let find = this.props.castSelectedUser.filter(
      x => x.id == this.props.data.id,
    );
    if (find.length > 0) {
      return 1;
    } else {
      return 0;
    }
  };
  render() {
    return (
      <View activeOpacity={0.95} style={styles.imageHolder} elevation={5}>
        <View style={styles.userRow}>
          <TouchableOpacity
            onLongPress={() =>
              this.rowPressActionLong(
                this.props.data.id,
                this.checkUserAlreadyAddedOrNot(),
              )
            }
            onPress={() => this.rowPressAction(this.props.data.id)}
            style={{flexDirection: 'row'}}>
            <View style={{width: 50, height: 50, marginRight: 15}}>
              <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={{
                  uri: this.props.data.usr_profile_photo
                    ? this.props.data.usr_profile_photo.picture_url
                    : 'data:image/png;base64,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',
                }}
              />
              {this.checkUserAlreadyAddedOrNot() ? (
                <View style={styles.selectedUser}>
                  <Icon name="star-o" size={30} color="#fff" />
                </View>
              ) : null}
            </View>
            <View>
              <Text style={styles.UnseNameTitle}>
                {this.props.data.usr_nickname}
                {this.props.data.usr_age
                  ? this.props.data.usr_age + '歳'
                  : null}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {this.props.data.usr_hourly_rate ? (
                  <Badge
                    value={
                      this.props.data.usr_hourly_rate.toLocaleString() + 'P/30'
                    }
                    textStyle={styles.bageStyle}
                    containerStyle={{marginRight: 10}}
                  />
                ) : null}

                <Badge value={'VIP'} textStyle={{color: '#fff'}} />
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity style={styles.leftSideIcon}>
              <Icon name="envelope" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.leftSideIcon}>
              <Icon name="video-camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    castSelectedUser: state.mainReducers.main.castSelectedUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileGirdElementCast);
