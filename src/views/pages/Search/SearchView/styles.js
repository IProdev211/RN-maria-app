import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions, Platform} from 'react-native';
const {width: viewportWidth} = Dimensions.get('window');
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

export const slideWidth = wp(39.4);
export const sliderItemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const sliderItemWidth = slideWidth + sliderItemHorizontalMargin * 2;

export default EStyleSheet.flatten(
  EStyleSheet.create({
    container: {
      padding: 15,
    },
    headerText: {
      fontSize: 18,
    },
    centerTextConatiner: {
      padding: 10,
      justifyContent: 'center',
      flexDirection: 'row',
    },
  }),
);
