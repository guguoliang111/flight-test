import axios from "axios";
import qs from "qs";

axios.defaults.timeout = 5000000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = '';

const HTTP = {};

HTTP.get = function(url, params, parseResult = true) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then(response => {
          let result = response.data
          if (parseResult) {
            if (result.code === 200) {
              resolve(result.message)
            } else {
              reject(result)
            }
          } else {
            resolve(result)
          }
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

HTTP.post = function(url, params, parseResult = true) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      })
      .then(
        response => {
          let result = response.data

          if (parseResult) {
            if (result.code === 200) {
              resolve(result.message)
            } else {
              reject(result);
            }
          } else {
            resolve(result)
          }
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

HTTP.postJson = function(url, params, json, parseResult = true) {
  return new Promise((resolve, reject) => {
      axios.post(url + '?' + qs.stringify(params), json).then(response => {
              let result = response.data;
              if (parseResult) {
                  if (result.code === 0) {
                      resolve(result.message);
                  } else {
                      reject(result)
                  }
              } else {
                  resolve(result)
              }
          }, err => {
              reject(err);
          })
          .catch((error) => {
              reject(error)
          })
  })
}

export default HTTP

