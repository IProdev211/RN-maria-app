import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateNiceStatus } from '../../../services/AuthService';
import styles from './styles';

class UpdateNiceTweetStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLiked: this.props.isLoved ? true : false,
      nice: this.props.loved,
    };
  }
  componentDidMount() {
    // this.setState({
    //   isLiked: this.props.isLoved ? true : false,
    //   nice: this.props.loved,
    // });
  }

  updateNiceStatus = async id => {
    this.setState({ isLiked: !this.state.isLiked });
    try {
      let data = {
        tweet_id: id,
      };
      let response = await updateNiceStatus(data);
      if (response.isSuccess) {
        let data = response.result.tweet_nice;
        this.setState({
          isLiked: data.is_nice ? true : false,
          nice: data.totat_nice,
        });
        // this.props.updateNice(id);

        console.log(response);
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  render() {
    let nice = this.state.nice;
    return (
      <TouchableOpacity
        style={styles.lovedSection}
        onPress={() => this.updateNiceStatus(this.props.id)}
      >
        {this.state.isLiked ?
          <Icon name="heart" size={30} color="#FF9C01" />
          :
          <Icon name="heart-o" size={30} color="#FF9C01" />
        }
        <Text style={styles.lovedSectionText}>{this.state.nice}</Text>
      </TouchableOpacity>
    );
  }
}

export default UpdateNiceTweetStatus;
