import axios from 'axios';
import { REACT_APP_BASE_URL } from '../config';

class Analytics {
  static run(rout, options) {
    let headers = {"Content-Type": "application/json"};

    if (options.headers) {
      headers = { ...headers, ...options.headers };
    }

    const config = {
      method: options.method,
      url: REACT_APP_BASE_URL + rout,
      data: options.data,
      headers,
    };

    if (options.params) {
      config.params = options.params;
    }

    return axios(config);
  }

  static async logError({message}) {
    await Analytics.run("/api/log", {
      method: "POST",
      data: {
        eventType: 'error',
        message: message,
      }
    }).then((res) => {
      console.log('CREATE_ERROR_SUCCESS')
    }).catch((e) => {
      console.log('CREATE_ERROR_ERROR')
      console.log(e)
    });
  }
  static async logResponseTime(data) {
    await Analytics.run("/api/log", {
      method: "POST",
      data: data
    }).then((res) => {
      console.log('CREATE_RESPONSE_TIME_SUCCESS')
    }).catch((e) => {
      console.log('CREATE_RESPONSE_TIME_ERROR')
      console.log(e)
    });
  }
}

export default Analytics;
