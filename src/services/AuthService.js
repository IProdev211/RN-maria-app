import {
  postApi,
  postApiFormData,
  evidencePostApiFormData,
  messagePostApiFormData,
  postCallApi,
  postApiDirectURL,
} from './api';
import {getApi} from './api';

//register user
export const LoginApi = async data => postApi('user/login', {}, data);
export const verifyOTP = async data => postApi('user/verify', {}, data);
export const updateUserInfo = async data => postApi('user/me/update', {}, data);
export const getSignleUserInfo = async data =>
  getApi(`user/show/${data}`, {}, {});
export const getCitys = async () => getApi('city/get', {}, {});
export const getAllBasicInfo = async () =>
  getApi('user/basicinfo/getvalue', {}, {});
export const getAllBasicShow = async () =>
  getApi('user/basicinfo/show', {}, {});
export const checktokenInfo = async () => postApi('user/token/check', {}, {});
export const wantInterView = async data =>
  postApi('user/wantinterview', {}, data);
export const setProfilePicture = async data =>
  postApi('user/me/set-profile-pic', {}, data);

export const loginWithEmailAddress = async data =>
  postApi('user/login/manual', {}, data);
export const verifyEmailAddress = async data =>
  postApi('user/login/verify', {}, data);

export const refferalUser = async data => postApi('referral', {}, data);

//Video Session
export const startVideoSession = async data =>
  postApi('start-session', {}, data);
export const endVideoSession = async data => postApi('end-session', {}, data);
export const extendVideoSession = async data =>
  postApi('extend-session', {}, data);
export const acceptVideoSession = async data =>
  postApi('accept-session', {}, data);
export const reviewVideoSession = async data =>
  postApi('video-review', {}, data);

//tweet
export const createTweet = async data => postApi('tweet', {}, data);
export const getAllTweet = async () => getApi('tweet/get', {}, {});
export const updateNiceStatus = async data => postApi('tweet/nice', {}, data);
export const getSignleTweet = async data => getApi(data, {}, {});
export const updateBasicInfo = async data =>
  postApi('user/basicinfo', {}, data);

export const WithdrawResquest = async data =>
  postApi('user/withdraw', {}, data);

export const GetAllUsers = async () => getApi('user/get', {}, {});

export const GetAllUsersByLatLong = async data =>
  postApi('user/search-by-gps', {}, data);

export const GetPostHourlyRate = async data =>
  postApi('user/me/update', {}, data);
export const PostDeposite = async data => postApi('deposit/secure', {}, data);
export const postCoupon = async data => postApi('deposit/coupon', {}, data);

export const GetCities = async () => getApi('city/get', {});

export const GetAllUsersByLocation = async data =>
  postApi('user/search-by-location', {}, data);

export const getAllCity = async () => getApi('city/get', {}, {});
export const addNewCity = async data => postApi('city/add', {}, data);

export const postReview = async data => postApi('user/review', {}, data);

export const BlockUser = async data => postApi('user/block', {}, data);
export const reportUser = async data => postApi('user/report', {}, data);

//cast
export const castGetInfoValue = async () => getApi('cast/getinfovalue', {}, {});
export const getCastUser = async data => postApi('cast/search', {}, data);
export const postCastUser = async data => postApi('cast', {}, data);

export const castCall = async data => postCallApi('create-call', {}, data);

export const sendMessageToAdmin = async data =>
  postCallApi('user/mail_admin', {}, data);

//settings
export const getEmailSettings = async () =>
  getApi('settings/email/notification/show', {}, {});
export const getAppSettings = async () => getApi('settings/app/show', {}, {});
export const getPrivacySettings = async () =>
  getApi('settings/private/show', {}, {});
export const updatePrivacySetting = async data =>
  postApi('settings/private', {}, data);
export const updateAppSetting = async data => postApi('settings/app', {}, data);
export const updateEmailSetting = async data =>
  postApi('settings/email/notification', {}, data);

//Search
export const getAllNewUser = async data => getApi('user/new/search', {}, data);
export const getAllTags = async () => getApi('tag/get', {}, {});
export const SearchUser = async data => postApi('user/search', {}, data);

//Notification
export const getNotification = async () =>
  getApi('user/notification/get', {}, {});
export const unreadNotification = data =>
  getApi(`user/notification/${data}`, {}, {});
export const callHistory = async data => postApi('call-history', {}, data);

//Credit Card
export const orderPointsToBuy = async data =>
  postApi('order/payment', {}, data);
export const confirmOrderPayment = async data =>
  postApi('order/payment/confirm', {}, data);
export const createOrderInGmo = async data =>
  postApiDirectURL('https://p01.mul-pay.jp/payment/EntryTran.idPass', {}, data);
export const paymentOrderInGmo = async data =>
  postApiDirectURL('https://p01.mul-pay.jp/payment/ExecTran.idPass', {}, data);

export const getUserDetails = async () => getApi('user/me', {}, {});
export const getDepositeAll = async () => getApi('deposit/get', {}, {});
export const getDepositeAndCouponBalance = async () =>
  getApi('deposit/balance', {}, {});
export const uploadProfileImage = async (
  keyValue,
  uri,
  fileType,
  fileName,
  ApiUrl,
) =>
  postApiFormData(
    'upload-img/profile-pic',
    {},
    keyValue,
    uri,
    fileType,
    fileName,
  );
export const uploadTweetImage = async (
  keyValue,
  uri,
  fileType,
  fileName,
  ApiUrl,
) =>
  postApiFormData(
    'upload-img/tweet-pic',
    {},
    keyValue,
    uri,
    fileType,
    fileName,
  );

export const uploadAgeEvidence = async (
  keyValue,
  uri,
  fileType,
  fileName,
  ApiUrl,
) =>
  evidencePostApiFormData(
    'upload-img/age-evidence',
    {},
    keyValue,
    uri,
    fileType,
    fileName,
  );

//message
export const allMessage = () => getApi('message', {}, {});
export const deleteMessage = async data =>
  postApi(`message/delete/${data}`, {}, data);
export const singleUserUpdatedMessage = data =>
  getApi(`message/show/${data}`, {}, {});
export const sendMessage = async data => postApi('message/send', {}, data);
export const getAllGiftsIcon = async data => getApi('message/gift/get', {}, {});
export const sendGift = async data => postApi('message/gift', {}, data);
export const uploadMessageImage = async (
  keyValue,
  uri,
  fileType,
  fileName,
  reciver_id,
) =>
  messagePostApiFormData(
    'message/send',
    {},
    keyValue,
    uri,
    fileType,
    fileName,
    reciver_id,
  );

// giveNice
export const giveNice = async data => postApi('user/nice', {}, data);

//Create Cast call
export const CreateCastCall = async data => postApi('create-meeting', {}, data);
// export const getSignleTweet = async data => getApi(data, {}, {});
