import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  SafeAreaView
} from 'react-native';
import DashBoardHeader from '../../../components/DashBoardHeader';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Calendar } from 'react-native-calendars';
import RangeSlider from 'rn-range-slider';
import { TagSelect } from 'react-native-tag-select';
import Modal from 'react-native-modal';
import StepByStepProcess from '../../../components/StepByStepProcess';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { duckOperations } from '../../../../redux/Main/duck';

import { SearchUser } from '../../../../services/AuthService';

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      rangeLow: 100,
      rangeHigh: 45000,
      modalStatus: false,
      selectedRow: null,
      selectedCityName: null,
      ViewCityName: '',
      dates: {},
      RecentlyJoin: false,
      Birthday: false,
    };
  }
  closeModal = () => {
    this.setState({ modalStatus: false });
  };
  openModal = selectedRow => {
    this.setState({ modalStatus: true, selectedRow });
  };
  changeCityValue = () => {
    this.setState({
      ViewCityName: this.state.selectedCityName
        ? this.state.selectedCityName.city_name
        : null,
    });
    this.closeModal();
  };
  selectDate = day => {
    let selectedDate = day.dateString;
    if (this.state.dates[selectedDate]) {
      const newDates = this.state.dates;
      delete newDates[selectedDate];
      this.setState({ dates: newDates });
    } else {
      const newDates = this.state.dates;
      newDates[selectedDate] = {
        selected: true,
        marked: true,
        selectedColor: '#03A9F5',
      };
      this.setState({ dates: newDates });
    }
  };
  searchUser = async () => {
    let data = {
      residence: this.state.selectedCityName
        ? this.state.selectedCityName.id
        : null,
      point_per_hour_min: this.state.rangeLow,
      point_per_hour_max: this.state.rangeHigh,
      recent_joined: this.state.RecentlyJoin,
      birthday_this_month: this.state.Birthday,
    };
    try {
      const response = await SearchUser(data);
      if (response.isSuccess) {
        let data = response.result.users;
        this.props.SearchFilteredData(data);
        this.props.navigation.navigate('Search');
      }
    } catch { }
  };

  render() {
    return (
      <SafeAreaView>
        <DashBoardHeader
          navigation={this.props.navigation}
          backNavigation={true}
          notificationHide={true}
          title="条件検索"
        >
          <View>
            <View style={styles.marginBottom20}>
              <TouchableOpacity
                style={styles.oNpressEvent}
                onPress={() => this.openModal('residence')}
              >
                <Text style={styles.basicTextColor}>活動する場所</Text>
                <View style={styles.onPressEventRight}>
                  <Text style={styles.onPressEventRightText}>
                    {this.state.ViewCityName}
                  </Text>
                  <Icon name="sort-down" size={25} color="#A7A39A" />
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
              style={styles.oNpressEvent}
              onPress={() => this.openModal()}>
              <Text style={styles.basicTextColor}>楽しみ方 </Text>
              <View style={styles.onPressEventRight}>
                <Icon name="sort-down" size={25} color="#A7A39A" />
              </View>
            </TouchableOpacity> */}
            </View>
            <View style={styles.marginBottom20}>
              <TouchableOpacity
                style={styles.oNpressEvent}
                onPress={() => this.openModal('tags')}
              >
                <Text>タグ検索 </Text>
                <View style={styles.onPressEventRight}>
                  <Text style={styles.onPressEventRightText}>
                    タグが選択されていません
                </Text>
                  <Icon name="angle-right" size={25} color="#A7A39A" />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <View style={[styles.paddingLeft15, styles.marginBottom20]}>
                <Text style={styles.basicTextColor}>スケジュールで</Text>
              </View>
              <View style={styles.marginBottom20}>
                <Calendar
                  onDayPress={day => this.selectDate(day)}
                  markedDates={{ ...this.state.dates }}
                />
              </View>
              <View style={[styles.rangePickerContainer, styles.marginBottom20]}>
                <View style={styles.RangContainer}>
                  <Text>{this.state.rangeLow}P</Text>
                  <Text>{this.state.rangeHigh}P</Text>
                </View>
                <RangeSlider
                  style={{ width: '100%', height: 80 }}
                  gravity={'center'}
                  min={100}
                  max={45000}
                  step={20}
                  selectionColor="#3df"
                  blankColor="#ababab"
                  onValueChanged={(low, high, fromUser) => {
                    this.setState({ rangeLow: low, rangeHigh: high });
                  }}
                />
              </View>
              <View style={styles.marginBottom20}>
                <TouchableOpacity
                  style={styles.oNpressEvent}
                  onPress={() => console.log('ji')}
                >
                  <Text style={styles.basicTextColor}>最近参加した</Text>
                  <View style={styles.onPressEventRight}>
                    <Switch
                      trackColor={{ false: '#f1f2f3', true: '#03A9F5' }}
                      thumbColor={this.state.isEnableed ? '#03A9F5' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => {
                        this.setState({ RecentlyJoin: !this.state.RecentlyJoin });
                      }}
                      value={this.state.RecentlyJoin}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.oNpressEvent}
                  onPress={() => console.log('ji')}
                >
                  <Text style={styles.basicTextColor}>今月の誕生日</Text>
                  <View style={styles.onPressEventRight}>
                    <Switch
                      trackColor={{ false: '#f1f2f3', true: '#03A9F5' }}
                      thumbColor={this.state.isEnabled ? '#03A9F5' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => {
                        this.setState({ Birthday: !this.state.Birthday });
                      }}
                      value={this.state.Birthday}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: 50, marginBottom: 100 }}>
                <StepByStepProcess
                  hideIcon={true}
                  title="探す"
                  action={this.searchUser}
                />
              </View>
            </View>
            <Modal
              testID={'castTimeModale'}
              isVisible={this.state.modalStatus}
              onSwipeComplete={() => this.closeModal()}
              // swipeDirection={['up', 'left', 'right', 'down']}
              style={styles.ModalView}
            >
              <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                <View style={styles.modalOverlay} />
              </TouchableWithoutFeedback>
              <View style={styles.content}>
                <View style={styles.mainRow}>
                  {this.state.selectedRow == 'residence' &&
                    <View style={styles.modalDefaultHeight}>
                      <View style={styles.closeAndTitle}>
                        <Text style={styles.modalText}>活動する場所</Text>
                        <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                          <Icon1 name="close" size={35} color="#333333" />
                        </TouchableWithoutFeedback>
                      </View>
                      <ScrollView style={styles.modalDefaultHeightScroll}>
                        <TouchableOpacity>
                          <TagSelect
                            data={this.props.allCity}
                            max={1}
                            labelAttr="city_name"
                            itemStyle={styles.item}
                            itemLabelStyle={styles.label}
                            itemStyleSelected={styles.itemSelected}
                            itemLabelStyleSelected={styles.labelSelected}
                            ref={tag => { this.tag = tag; }}
                            onItemPress={item => { this.setState({ selectedCityName: item }); }}
                            onMaxError={() => {
                              Alert.alert(
                                'ウォーニング',
                                '以前の都市を破棄して新しい都市を選択してください。',
                              );
                            }}
                          />
                        </TouchableOpacity>
                      </ScrollView>
                      <View style={styles.buttonStyle}>
                        <StepByStepProcess
                          hideIcon={true}
                          title="更新"
                          action={this.changeCityValue}
                        />
                      </View>
                    </View>
                  }
                  {this.state.selectedRow == 'tags' &&
                    <View>
                      <View style={styles.modalDefaultHeight}>
                        <View style={styles.closeAndTitle}>
                          <Text style={styles.modalText}>タグ検索</Text>
                          <TouchableWithoutFeedback onPress={() => this.closeModal()}>
                            <Icon1 name="close" size={35} color="#333333" />
                          </TouchableWithoutFeedback>
                        </View>
                        <ScrollView style={styles.modalDefaultHeightScroll}>
                          <View>
                            <Text style={styles.tagText}>楽しみ方</Text>
                            <TagSelect
                              data={this.props.tagValues.how_to_enjoy}
                              labelAttr="value"
                              itemStyle={styles.item}
                              itemLabelStyle={styles.label}
                              itemStyleSelected={styles.itemSelected}
                              itemLabelStyleSelected={styles.labelSelected}
                              ref={tag => { this.tag = tag; }}
                              onItemPress={item => { this.setState({ selectedCityName: item }); }}
                            />
                          </View>
                          <View>
                            <Text style={styles.tagText}>顔の特徴</Text>
                            <TagSelect
                              data={this.props.tagValues.facial_feature}
                              labelAttr="value"
                              itemStyle={styles.item}
                              itemLabelStyle={styles.label}
                              itemStyleSelected={styles.itemSelected}
                              itemLabelStyleSelected={styles.labelSelected}
                              ref={tag => { this.tag = tag; }}
                              onItemPress={item => { this.setState({ selectedCityName: item }); }}
                            />
                          </View>
                          <View>
                            <Text style={styles.tagText}>システム</Text>
                            <TagSelect
                              data={this.props.tagValues.system}
                              labelAttr="value"
                              itemStyle={styles.item}
                              itemLabelStyle={styles.label}
                              itemStyleSelected={styles.itemSelected}
                              itemLabelStyleSelected={styles.labelSelected}
                              ref={tag => { this.tag = tag; }}
                              onItemPress={item => { this.setState({ selectedCityName: item }); }}
                            />
                          </View>
                          <View>
                            <Text style={styles.tagText}>システム</Text>
                            <TagSelect
                              data={this.props.tagValues.system}
                              labelAttr="value"
                              itemStyle={styles.item}
                              itemLabelStyle={styles.label}
                              itemStyleSelected={styles.itemSelected}
                              itemLabelStyleSelected={styles.labelSelected}
                              ref={tag => { this.tag = tag; }}
                              onItemPress={item => { this.setState({ selectedCityName: item }); }}
                            />
                          </View>
                          <View>
                            <Text style={styles.tagText}>スタイル</Text>
                            <TagSelect
                              data={this.props.tagValues.style}
                              labelAttr="value"
                              itemStyle={styles.item}
                              itemLabelStyle={styles.label}
                              itemStyleSelected={styles.itemSelected}
                              itemLabelStyleSelected={styles.labelSelected}
                              ref={tag => { this.tag = tag; }}
                              onItemPress={item => { this.setState({ selectedCityName: item }); }}
                            />
                          </View>
                          <View>
                            <Text style={styles.tagText}>職歴</Text>
                            <TagSelect
                              data={this.props.tagValues.work_history}
                              labelAttr="value"
                              itemStyle={styles.item}
                              itemLabelStyle={styles.label}
                              itemStyleSelected={styles.itemSelected}
                              itemLabelStyleSelected={styles.labelSelected}
                              ref={tag => { this.tag = tag; }}
                              onItemPress={item => { this.setState({ selectedCityName: item }); }}
                            />
                          </View>
                          <View>
                            <Text style={styles.tagText}>対応スキル</Text>
                            <TagSelect
                              data={this.props.tagValues.response_skills}
                              labelAttr="value"
                              itemStyle={styles.item}
                              itemLabelStyle={styles.label}
                              itemStyleSelected={styles.itemSelected}
                              itemLabelStyleSelected={styles.labelSelected}
                              ref={tag => { this.tag = tag; }}
                              onItemPress={item => { this.setState({ selectedCityName: item }); }}
                            />
                          </View>
                        </ScrollView>
                        <View style={styles.buttonStyle}>
                          <StepByStepProcess
                            hideIcon={true}
                            title="更新"
                            action={() => this.changeCityValue()}
                          />
                        </View>
                      </View>
                    </View>
                  }
                </View>
              </View>
            </Modal>
          </View>
        </DashBoardHeader>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    allCity: state.mainReducers.main.allCity,
    tagValues: state.mainReducers.main.tagValues,
    userInfo: state.mainReducers.main.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchFilter);

// how_to_enjoy;
// facial_feature;
// system, style;
// work_history;
// response_skills;
