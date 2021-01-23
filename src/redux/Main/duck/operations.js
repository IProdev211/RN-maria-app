import actions from './actions';
//import Service from "../services"

const addNewCastInfo = info => {
  return dispatch => {
    return dispatch(actions.addedNewCastInfo(info));
  };
};
const addUserInfo = info => {
  return dispatch => {
    return dispatch(actions.addedUserInfo(info));
  };
};
const updateCurrentMessage = info => {
  return dispatch => {
    return dispatch(actions.updatedCurrentMessage(info));
  };
};
const pushCurrentMessage = (info, to, from) => {
  return dispatch => {
    return dispatch(actions.pushedCurrentMessage(info, to, from));
  };
};
const updateCityList = city => {
  return dispatch => {
    return dispatch(actions.updateCityList(city));
  };
};
const SearchFilteredData = data => {
  return dispatch => {
    return dispatch(actions.searchFilterData(data));
  };
};
const addTagValue = data => {
  return dispatch => {
    return dispatch(actions.addedTagValue(data));
  };
};
const allNotifications = data => {
  return dispatch => {
    return dispatch(actions.AllNotification(data));
  };
};
const updateNotifications = data => {
  return dispatch => {
    return dispatch(actions.updatedNotifications(data));
  };
};

const addUserForCast = (data, status) => {
  return dispatch => {
    return dispatch(actions.addedUserForCast(data, status));
  };
};
const getAllGiftIcon = data => {
  return dispatch => {
    return dispatch(actions.getAllGiftIcon(data));
  };
};
const changeSignInMethod = data => {
  return dispatch => {
    return dispatch(actions.changedSignInMethod(data));
  };
};

export default {
  addNewCastInfo,
  addUserInfo,
  updateCurrentMessage,
  pushCurrentMessage,
  updateCityList,
  SearchFilteredData,
  addTagValue,
  allNotifications,
  updateNotifications,
  addUserForCast,
  getAllGiftIcon,
  changeSignInMethod,
};
