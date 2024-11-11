import axios from 'axios'
import qs from 'qs'

const api = {
  async get (url: string, query?: object) {
    try {
      const res = await axios.get(`${url}${query ? `?${qs.stringify(query, {encodeValuesOnly: true})}` : ""}`)

      return res.data
    } catch (error) {
      return {
        data: null, error
      }
    } 
  },
}

export default api