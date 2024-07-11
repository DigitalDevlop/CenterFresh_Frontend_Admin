import TokenService from './TokenService'
import { axiosInstance } from 'src/common/AxiosInstance'

export const PlayerService = {
  getPlayers: async (searchNumber, page = 1, pageSize = 20) => {
    try {
      let filter = ''
      if (searchNumber) {
        filter = `&filters[mobile][$eq]=${searchNumber}`
      }

      const response = await axiosInstance.get(
        `/players?populate=*${filter}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=updatedAt:desc`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
  getWinners: async (searchNumber, tab, page = 1, pageSize = 20) => {
    try {
      let filter = ''
      if (searchNumber) {
        if (tab != 'all') {
          filter = `&filters[mobile][$eq]=${searchNumber}&filters[category][$eq]=${tab}`
        } else {
            filter = `&filters[mobile][$eq]=${searchNumber}`
        }
      } else {
        if (tab != 'all') {
          filter = `&filters[category][$eq]=${tab}`
        }
      }

      const response = await axiosInstance.get(
        `/winners?populate=*${filter}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=updatedAt:desc`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  getSmsLogs: async (searchNumber, tab, page = 1, pageSize = 20) => {
    try {
      let filter = ''
      if (searchNumber) {
        if (tab != 'all') {
          filter = `&filters[mobile][$eq]=${searchNumber}&filters[category][$eq]=${tab}`
        } else {
            filter = `&filters[mobile][$eq]=${searchNumber}`
        }
      } else {
        if (tab != 'all') {
          filter = `&filters[category][$eq]=${tab}`
        }
      }

      const response = await axiosInstance.get(
        `/sms-logs?populate=*${filter}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=updatedAt:desc`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
}
