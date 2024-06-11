import axios from 'axios'

const ApiService = {
  jsonRequest: async (url, payload = {}, callback) => {
    await axios
      .post(url, payload, { withCredentials: true })
      .then(({ data }) => callback(data))
      .catch((error) => {
        callback({
          isError: true,
          message: error.response?.data?.message ? error.response.data.message : error.message
        })
      })
  }
}

export default ApiService
