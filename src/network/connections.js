import axios from 'axios';

//Get the BASE URL
const getBaseURL = (environment) => {
  switch (environment) {
    case 'DEV':
      return process.env.REACT_APP_BASE_URL_DEV;
    case 'TEST':
      return process.env.REACT_APP_BASE_URL_TEST;
    case 'PROD':
      return process.env.REACT_APP_BASE_URL_PROD;
    default:
      return process.env.REACT_APP_BASE_URL_DEV;
  }
}


const conn = axios.create({
    baseURL : getBaseURL(process.env.REACT_APP_ENVIRONMENT),
    headers: {
        'Content-Type': 'application/json',
    }
});

const connWithAuth =(token) => axios.create({
  baseURL : getBaseURL(process.env.REACT_APP_ENVIRONMENT),
  headers: {
      'accept': 'application/json',
      'token': `Bearer ${token}`
  }
});

const connWithApiKey = axios.create({
  baseURL : getBaseURL(process.env.REACT_APP_ENVIRONMENT),
  headers : {
    "Content-Type": "application/json",
    "x-api-Key": process.env.REACT_APP_WORD_GAME_API_KEY
  }
});


const getRequest = async (url, conn) => {
  return new Promise((resolve,reject) => {
    conn.get(url)
    .then( (response) => {
      return resolve(response.data);
    }).catch((err) => {
      console.error("ERROR",err);
      return reject(err);
    });
  });
}


const postRequest = async (url, conn, data=null) => {
  return new Promise((resolve,reject) => {
    conn.post(url,data)
    .then( (response) => {
      return resolve(response.data);
    }).catch((err) => {
      console.error("ERROR",err);
      return reject(err);
    });
  });
}




export {conn, connWithAuth, connWithApiKey, getRequest, postRequest};
