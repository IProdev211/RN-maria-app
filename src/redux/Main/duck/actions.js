import types from './types';

const addedNewCastInfo = info => ({
  type: types.ADD_ALL_CAST_INFO_TYPE,
  status: 'success',
  payload: {
    info,
  },
});

const addedUserInfo = info => ({
  type: types.ADD_OWNE_INFO,
  status: 'success',
  payload: {
    info,
  },
});

const updatedCurrentMessage = info => ({
  type: types.CURRENT_CHAT_UPDATE,
  status: 'success',
  payload: {
    info,
  },
});
const pushedCurrentMessage = (info, to, from) => ({
  type: types.PUSH_SINGLE_MESSAGE,
  status: 'success',
  payload: {
    info,
    to,
    from,
  },
});
const AddedCities = city => ({
  type: types.ADD_CITIES,
  status: 'success',
  payload: {
    city,
  },
});

const searchFilterData = data => ({
  type: types.SEARCH_FILTER_DATA,
  status: 'success',
  payload: {
    data,
  },
});
const addedTagValue = data => ({
  type: types.TAG_VALUES,
  status: 'success',
  payload: {
    data,
  },
});
const AllNotification = data => ({
  type: types.ALL_NOTICATION,
  status: 'success',
  payload: {
    data,
  },
});

const updatedNotifications = data => ({
  type: types.UPDATE_NOTIFICATION,
  status: 'success',
  payload: {
    data,
  },
});
const addedUserForCast = (data, status) => ({
  type: types.ADD_USER_AS_SELECTED_CAST,
  status: 'success',
  payload: {
    data,
    status,
  },
});
const getAllGiftIcon = data => ({
  type: types.ALL_GIFT_ICON,
  status: 'success',
  payload: {
    data,
  },
});

const changedSignInMethod = data => ({
  type: types.SIGN_IN_METHOD,
  status: 'success',
  payload: {
    data,
  },
});

export default {
  addedNewCastInfo,
  addedUserInfo,
  updatedCurrentMessage,
  pushedCurrentMessage,
  AddedCities,
  searchFilterData,
  addedTagValue,
  AllNotification,
  updatedNotifications,
  addedUserForCast,
  getAllGiftIcon,
  changedSignInMethod,
};
