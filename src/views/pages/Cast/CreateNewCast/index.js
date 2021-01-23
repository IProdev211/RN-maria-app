import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TagSelect } from 'react-native-tag-select';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DashBoardHeader from '../../../components/DashBoardHeader';
import SetpByStepProcess from '../../../components/SetpByStepProcess';
import styles from './styles';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { duckOperations } from '../../../../redux/Main/duck';

class CreateNewCast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citys: [],
      showHideCity: 1,
      callTime: [
        {
          id: 30,
          label: '30分後',
        },
        {
          id: 60,
          label: '60分後',
        },
        {
          id: 90,
          label: '90分後',
        },
        {
          id: 100,
          label: 'それ以外',
        },
      ],
      selectedCallTime: 30,
      callTimeAfter: [
        {
          id: 1,
          label: '1時間',
        },
        {
          id: 2,
          label: '2時間',
        },
        {
          id: 3,
          label: '3時間',
        },
        {
          id: 4,
          label: '4遇間以上',
        },
      ],
      selectedCallTimeAfter: 1,
      CastPackage: [
        {
          id: 1,
          package: '口イヤルVIP',
          price: '12,500P / 30分',
        },
        {
          id: 2,
          package: 'VIP（おすすめ）',
          price: '6,500P / 30分',
        },
        {
          id: 3,
          package: 'ミックス',
          price: '4,750P /30分',
        },
        {
          id: 4,
          package: '「、ンダー「',
          price: '3,000P / 30分',
        },
      ],
      selectedPackage: 1,
      castProcess: 1,
    };
  }

  componentDidMount() {
    let updatedcity = this.props.allCity.map(x => (
      {
        id: x.state_id,
        label: x.city_name,
        longitude: x.longitude,
        latitude: x.latitude,
      }
    ));
    this.setState({ citys: updatedcity });
  }

  render() {
    return (
      <DashBoardHeader
        navigation={this.props.navigation}
        backNavigation={true}
        notificationHide={true}
        title="ぐ希望条件を教えて下さい"
      >
        {this.state.castProcess == 1 &&
          <View>
            <Text>HI</Text>
          </View>
        }

        {/* cast process 3 */}
        {this.state.castProcess == 1 &&
          <View style={styles.container}>
            <View>
              <View style={styles.mainRow}>
                <Text style={styles.rowTitle}>どこに呼びますか？</Text>
                <TouchableOpacity
                  style={styles.SubRow}
                  onPress={() => this.setState({ showHideCity: !this.state.showHideCity })}
                >
                  <Text style={styles.SubRowText}>東京</Text>
                  <Icon
                    name={this.state.showHideCity ? 'angle-down' : 'angle-right'}
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
              {this.state.showHideCity &&
                <TagSelect
                  data={this.state.citys}
                  max={1}
                  itemStyle={styles.item}
                  itemLabelStyle={styles.label}
                  itemStyleSelected={styles.itemSelected}
                  itemLabelStyleSelected={styles.labelSelected}
                  ref={tag => { this.tag = tag; }}
                  onMaxError={() => {
                    Alert.alert(
                      'ウォーニング',
                      '以前の都市を破棄して新しい都市を選択してください。',
                    );
                  }}
                />
              }
            </View>
            <Divider style={styles.dividerStle} />
            <View style={{ paddingBottom: 15 }}>
              <View style={styles.mainRow}>
                <Text style={styles.rowTitle}>いつ呼びますか？</Text>
              </View>
              <View style={styles.SubRow}>
                {this.state.callTime.map(x => (
                  <TouchableOpacity
                    key={x.id}
                    style={this.state.selectedCallTime == x.id ? styles.CallTimeButtonSelected : styles.CallTimeButton}
                    onPress={() => this.setState({ selectedCallTime: x.id })}
                  >
                    <Text style={this.state.selectedCallTime == x.id ? styles.CallTimeButtonTextSelected : styles.CallTimeButtonText}>
                      {x.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Divider style={styles.dividerStle} />
            <View>
              <View style={styles.mainRow}>
                <Text style={styles.rowTitle}>何人呼びますか？</Text>
                <TouchableOpacity style={styles.SubRow}>
                  <Icon name="info-circle" size={20} color="#000" />
                  <Text style={styles.paddingLeft10}>最低人数のお願い</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.mainRow}>
                <View style={styles.SubRow}>
                  <Text style={styles.CastPeopleSelect}>キャスト人数</Text>
                  <Text style={styles.CastPeopleSelectNumber}>2</Text>
                  <Text style={styles.CastPeopleSelect}>人</Text>
                </View>
                <View style={styles.SubRow}>
                  <TouchableOpacity>
                    <AntDesign name="minuscircleo" size={30} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingLeft: 30 }}>
                    <AntDesign name="pluscircleo" size={30} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Divider style={styles.dividerStle} />
            <View style={{ paddingBottom: 15 }}>
              <View style={styles.mainRow}>
                <Text style={styles.rowTitle}>何時問呼びますか？</Text>
              </View>
              <View style={styles.SubRow}>
                {this.state.callTimeAfter.map(x => (
                  <TouchableOpacity
                    key={x.id}
                    style={this.state.selectedCallTimeAfter == x.id ? styles.CallTimeButtonSelected : styles.CallTimeButton}
                    onPress={() => this.setState({ selectedCallTime: x.id })}
                  >
                    <Text style={this.state.selectedCallTimeAfter == x.id ? styles.CallTimeButtonTextSelected : styles.CallTimeButtonText}>
                      {x.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Divider style={styles.dividerStle} />
            <View style={{ paddingBottom: 15 }}>
              <View style={styles.mainRow}>
                <Text style={styles.rowTitle}>
                  - ご希望のキャストクラスは？
                </Text>
              </View>
              <View>
                {this.state.CastPackage.map(x => (
                  <TouchableOpacity
                    style={this.state.selectedPackage == x.id ? styles.packageButtonS : styles.packageButton}
                    onPress={() => this.setState({ selectedPackage: x.id })}
                  >
                    <Text style={this.state.selectedPackage == x.id ? styles.packageButtonTextS : styles.packageButtonText}>
                      {x.package}
                    </Text>
                    <Text style={this.state.selectedPackage == x.id ? styles.packageButtonTextS : styles.packageButtonText}>
                      {x.price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={{ paddingVertical: 30 }}>
              <View style={styles.mainRow}>
                <SetpByStepProcess
                  title="次に進む (1/4)"
                  action={() => console.log('hi')}
                />
              </View>
            </View>
          </View>
        }
      </DashBoardHeader>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    allCity: state.mainReducers.main.allCity
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewCast);
