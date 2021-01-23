import {combineReducers} from 'redux';
import types from './types';

let dataState = {
  castTypeInformations: [],
  userInfo: {},
  currentChat: [],
  allCity: [],
  searchFilterData: [],
  tagValues: {},
  allNotification: [],
  castSelectedUser: [],
  giftIcons: [],
  signInMethodType: null,
};

const main = (state = dataState, action) => {
  switch (action.type) {
    case types.ADD_ALL_CAST_INFO_TYPE:
      return Object.assign({}, state, {
        castTypeInformations: action.payload.info,
      });
    case types.ADD_OWNE_INFO:
      return Object.assign({}, state, {
        userInfo: action.payload.info,
      });
    case types.CURRENT_CHAT_UPDATE:
      return Object.assign({}, state, {
        currentChat: action.payload.info,
      });
    case types.PUSH_SINGLE_MESSAGE:
      let previousStateChate = state.currentChat;
      console.log(action.payload.info, action.payload.to, action.payload.from);
      if (
        previousStateChate.me_id == action.payload.from &&
        previousStateChate.message_with == action.payload.to
      ) {
        previousStateChate.data.unshift(action.payload.info);
      }
      return Object.assign({}, state, {
        currentChat: previousStateChate,
      });
    case types.UPDATE_CITY_LIST:
      return Object.assign({}, state, {
        allCity: action.payload.city,
      });
    case types.SEARCH_FILTER_DATA:
      return Object.assign({}, state, {
        searchFilterData: action.payload.data,
      });
    case types.TAG_VALUES:
      return Object.assign({}, state, {
        tagValues: action.payload.data,
      });
    case types.ALL_NOTICATION:
      return Object.assign({}, state, {
        allNotification: action.payload.data,
      });
    case types.ALL_GIFT_ICON:
      return Object.assign({}, state, {
        giftIcons: action.payload.data,
      });
    case types.UPDATE_NOTIFICATION:
      let previousNotification = state.allNotification;
      previousNotification.unshift(action.payload.data);
      return Object.assign({}, state, {
        allNotification: previousNotification,
      });
    case types.ADD_USER_AS_SELECTED_CAST:
      let castUser = state.castSelectedUser ? state.castSelectedUser : [];
      console.log('======', action.payload.data, castUser);
      if (action.payload.status == 0) {
        castUser.push(action.payload.data);
      } else if (action.payload.status == 1) {
        let temData = castUser;
        castUser = [];
        temData.map(x => {
          if (x.id != action.payload.data.id) {
            castUser.push(x);
          }
        });
      } else if (action.payload.status == 2) {
        castUser = [];
      }
      return Object.assign({}, state, {
        castSelectedUser: castUser,
      });
    case types.SIGN_IN_METHOD:
      return Object.assign({}, state, {
        signInMethodType: action.payload.data,
      });
    default:
      return state;
  }
};

const reducers = combineReducers({
  main,
});

export default reducers;
