import axios from "axios"

const send = async ({method='', path='', data={}, access_token=''} = {}) => {
  const commonUrl = 'http://localhost:8080' // 실제 서버 URL로 수정 필요
  const versionUrl = '/api/v1'
  const url = commonUrl + versionUrl + path

  const headers = {
    "content-type": "application/json;charset=UTF-8",
    "accept": "application/json",
    'Authorization': access_token ? `Bearer ${access_token}` : ''
  };

  const options = {
    method,
    url,
    headers,
    data,
    withCredentials: true,
  }

  try {
    const response = await axios(options);
    return response.data
  }
  catch(error) {
    console.error(error)
  }
}

const getApi = ({path='', access_token=''} = {}) => {
  return send({method: 'GET', path: path, access_token: access_token})
}

const putApi = ({path='', data={}, access_token=''} = {}) => {
  return send({method: 'PUT', path: path, data: data, access_token: access_token})
}

const patchApi = ({path='', data={}, access_token=''} = {}) => {
  return send({method: 'PATCH', path: path, data: data, access_token: access_token})
}

const postApi = ({path='', data={}, access_token=''} = {}) => {
  return send({method: 'POST', path: path, data: data, access_token: access_token})
}

const delApi = ({path='', data={}, access_token=''} = {}) => {
  return send({method:'DELETE', path: path, data: data, access_token: access_token})
}

export {
  getApi,
  putApi,
  patchApi,
  postApi,
  delApi,
}
