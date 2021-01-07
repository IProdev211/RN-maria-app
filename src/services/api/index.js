import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import apiConfig from './config';
import * as qs from 'qs';

export const getApi = async (action, headers = {}) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `Bearer ${userToken}`,
            }
          : {
              'Client-ID': apiConfig.clientId,
            }),
        ...headers,
        ...{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
      item => !_.isEmpty(item),
    );
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: 'GET',
      headers: requestHeaders,
    });

    let responseJson = await response.json();
    console.log(action, '----------', responseJson);
    return {result: responseJson, isSuccess: true, status: response.status};
  } catch (error) {
    console.log(action, '+++', error);
    return {result: null, isSuccess: false, message: error};
  }
};

export const postApi = async (action, headers = {}, body = {}) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    let formData = new FormData();
    formData.append('name', 'John');
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `Bearer ${userToken}`,
            }
          : {
              'Client-ID': apiConfig.clientId,
            }),
        ...headers,
        ...{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
      item => !_.isEmpty(item),
    );
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(body),
    });
    let responseJson = await response.json();
    console.log(action, '----------', responseJson);
    return {
      result: responseJson,
      isSuccess: response.Success ? response.Success : true,
      status: response.status,
    };
  } catch (error) {
    console.log(action, '+++', error);
    return {result: null, isSuccess: false, message: error};
  }
};

export const postApiDirectURL = async (url, headers = {}, body = {}) => {
  try {
    let formData = new FormData();
    formData.append('name', 'John');
    let requestHeaders = _.pickBy(
      {
        ...headers,
        ...{
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json, text/plain, */*',
        },
      },
      item => !_.isEmpty(item),
    );

    let response = await fetch(`${url}`, {
      method: 'POST',
      headers: requestHeaders,
      body: qs.stringify(body, {encode: false}),
    });

    let responseJson = qs.parse(await response.text(), {
      decoder: decodeURIComponent,
    });
    return {
      result: responseJson,
      isSuccess: response.Success ? response.Success : true,
      status: response.status,
    };
  } catch (error) {
    console.error(error, 77);
    return {result: null, isSuccess: false, message: error};
  }
};

export const postCallApi = async (action, headers = {}, body = {}) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    let formData = new FormData();
    formData.append('name', 'John');
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `Bearer ${userToken}`,
            }
          : {
              'Client-ID': apiConfig.clientId,
            }),
        ...headers,
        ...{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
      item => !_.isEmpty(item),
    );
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(body),
    });

    let responseJson = await response;
    return {
      result: responseJson,
      isSuccess: response.Success ? response.Success : true,
      status: response.status,
    };
  } catch (error) {
    console.error(error, 77);
    return {result: null, isSuccess: false, message: error};
  }
};

export const postApiFormData = async (
  action,
  headers = {},
  keyValue = {},
  uri = '',
  fileType = '',
  fileName = '',
) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `Bearer ${userToken}`,
            }
          : {
              'Client-ID': apiConfig.clientId,
            }),
        ...headers,
        ...{
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
      item => !_.isEmpty(item),
    );

    var formData = new FormData();
    formData.append(keyValue.key, keyValue.Value);

    // pictureSource is object containing image data.

    if (uri) {
      var photo = {
        uri: uri,
        type: fileType,
        name: fileName,
      };
      formData.append('image', photo);
    }
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: 'POST',
      headers: requestHeaders,
      body: formData,
    });
    let responseJson = await response.json();

    return {
      result: responseJson,
      isSuccess: response.Success ? response.Success : true,
      status: response.status,
    };
  } catch (error) {
    console.error(error);
    return {result: null, isSuccess: false, message: error};
  }
};

export const evidencePostApiFormData = async (
  action,
  headers = {},
  keyValue = {},
  uri = '',
  fileType = '',
  fileName = '',
) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `Bearer ${userToken}`,
            }
          : {
              'Client-ID': apiConfig.clientId,
            }),
        ...headers,
        ...{
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
      item => !_.isEmpty(item),
    );

    var formData = new FormData();
    formData.append(keyValue.key, keyValue.Value);

    // pictureSource is object containing image data.

    if (uri) {
      var photo = {
        uri: uri,
        type: fileType,
        name: fileName,
      };
      formData.append('age_evidence', photo);
    }
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: 'POST',
      headers: requestHeaders,
      body: formData,
    });
    let responseJson = await response.json();

    return {
      result: responseJson,
      isSuccess: response.Success ? response.Success : true,
      status: response.status,
    };
  } catch (error) {
    console.error(error);
    return {result: null, isSuccess: false, message: error};
  }
};

export const messagePostApiFormData = async (
  action,
  headers = {},
  keyValue = {},
  uri = '',
  fileType = '',
  fileName = '',
  reciver_id,
) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    let requestHeaders = _.pickBy(
      {
        ...(userToken
          ? {
              Authorization: `Bearer ${userToken}`,
            }
          : {
              'Client-ID': apiConfig.clientId,
            }),
        ...headers,
        ...{
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      },
      item => !_.isEmpty(item),
    );

    var formData = new FormData();
    formData.append(keyValue.key, keyValue.Value);

    // pictureSource is object containing image data.

    if (uri) {
      var photo = {
        uri: uri,
        type: fileType,
        name: fileName,
      };
      formData.append('image', photo);
      formData.append('receiver_id', reciver_id);
    }
    console.log(formData);
    let response = await fetch(`${apiConfig.url}${action}`, {
      method: 'POST',
      headers: requestHeaders,
      body: formData,
    });
    let responseJson = await response.json();

    return {
      result: responseJson,
      isSuccess: response.Success ? response.Success : true,
      status: response.status,
    };
  } catch (error) {
    console.error(error);
    return {result: null, isSuccess: false, message: error};
  }
};
