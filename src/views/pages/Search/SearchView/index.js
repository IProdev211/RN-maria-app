import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import HeaderAfterLogin from '../../../components/DashBoardHeader';
import ProfileGirdElement from '../../../components/profileGirdElement';
import CustomCard from '../../../components/CustomCard';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, sliderItemWidth } from './styles';
import { GetAllUsers, getAllNewUser } from '../../../../services/AuthService';
import styles from './styles';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../../redux/Main/duck';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      newUser: [],
    };
  }

  componentDidMount() {
    this.getAllUsers();
    this.getAllNewUser();
  }

  getAllNewUser = async () => {
    try {
      const response = await getAllNewUser();
      if (response.isSuccess) {
        let data = response.result.users ? response.result.users : [];
        this.setState({ newUser: data });
      }
    } catch { }
  };

  gotoUserDetailsPage = item => {
    this.props.navigation.navigate('UserDetails', { userData: item });
  };

  renderListComponent = ({ item }) => (
    <ProfileGirdElement
      item={item}
      name={item.usr_nickname}
      gotoUserDetailsPage={this.gotoUserDetailsPage}
      imageURI={
        item.usr_profile_photo ? item.usr_profile_photo.picture_url : null
      }
    />
  );
  renderListComponentShort = ({ item }) => (
    <ProfileGirdElement
      item={item}
      name={item.usr_nickname}
      gotoUserDetailsPage={this.gotoUserDetailsPage}
      top={-130}
      imageURI={
        item.usr_profile_photo ? item.usr_profile_photo.picture_url : null
      }
    />
  );

  getAllUsers = async () => {
    try {
      const response = await GetAllUsers();
      if (response.isSuccess) {
        this.props.SearchFilteredData(response.result.users);
      }
    } catch { }
  };

  getFilterData = data => {
    let user = this.props.userInfo;
    let filterDate = [];
    data
      ? data.map(x => {
        if (x.usr_type != user.usr_type) {
          filterDate.push(x);
        }
      })
      : [];
    return data;
  };

  render() {
    return (
      <HeaderAfterLogin navigation={this.props.navigation} SearchPage={true}>
        <View>
          {this.state.newUser && this.state.newUser.length > 1 ? (
            <CustomCard>
              <View style={styles.container}>
                <Text style={styles.headerText}>面談通過3日以内キャスト</Text>
              </View>
              {this.state.newUser ? (
                <Carousel
                  containerCustomStyle={{ backgroundColor: 'pink' }}
                  contentContainerCustomStyle={{
                    backgroundColor: '#fff',
                    height: 250,
                  }}
                  data={this.state.newUser}
                  renderItem={this.renderListComponentShort}
                  sliderWidth={sliderWidth}
                  itemWidth={sliderItemWidth}
                  activeSlideAlignment={'start'}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                />
              ) : (
                  <View style={styles.centerTextConatiner}>
                    <Text style={styles.NoUser}>ユーザーが見つかりません</Text>
                  </View>
                )}
            </CustomCard>
          ) : null}

          <View style={styles.centerTextConatiner}>
            <Text style={styles.headerText}>
              登録ゲスト様{' '}
              {this.props.SearchFilterData
                ? this.props.SearchFilterData.length
                : 0}{' '}
              人以上
            </Text>
          </View>
          <CustomCard>
            {this.getFilterData(this.props.SearchFilterData) ? (
              <FlatList
                data={this.getFilterData(this.props.SearchFilterData)}
                keyExtractor={this._keyExtractor} //has to be unique
                renderItem={this.renderListComponent} //method to render the data in the way you want using styling u need
                horizontal={false}
                numColumns={2}
              />
            ) : (
                <View style={styles.centerTextConatiner}>
                  <Text style={styles.NoUser}>ユーザーが見つかりません</Text>
                </View>
              )}
          </CustomCard>
        </View>
      </HeaderAfterLogin>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    SearchFilterData: state.mainReducers.main.searchFilterData,
    userInfo: state.mainReducers.main.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
