import TokenService from './TokenService'
import { axiosInstance, axiosInstanceNoAuth } from 'src/common/AxiosInstance'

export const PlayerService = {
  getPlayers: async (searchNumber, page = 1, pageSize = 20, date, dateFiltery = "updatedAt") => {
    try {
      let filter = ''
      if (searchNumber) {
        filter = `&filters[mobile][$eq]=${searchNumber}$`
      }

      const response = await axiosInstance.get(
        `/players?populate=*${filter}${date
          ? `&filters[$and][0][${dateFiltery}][$gte]=${getPreviousDate(
            date,
          )}T18:30:00.000Z&filters[$and][1][${dateFiltery}][$lte]=${date}T18:30:00.999Z`
          : ''
        }&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=${dateFiltery}:desc`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  getWinners: async (searchNumber, tab, page = 1, pageSize = 20, date) => {
    try {
      let filter = ''
      console.log(searchNumber, tab, { date })
      if (searchNumber) {
        if (tab != 'all') {
          filter = `&filters[mobile][$eq]=${searchNumber}&filters[category][$eq]=${tab}${date
            ? `&filters[$and][0][updatedAt][$gte]=${getPreviousDate(
              date,
            )}T18:30:00.000Z&filters[$and][1][updatedAt][$lte]=${date}T18:30:00.999Z`
            : ''
            }`
        } else {
          filter = `&filters[mobile][$eq]=${searchNumber}${date
            ? `&filters[$and][0][updatedAt][$gte]=${getPreviousDate(
              date,
            )}T18:30:00.000Z&filters[$and][1][updatedAt][$lte]=${date}T18:30:00.999Z`
            : ''
            }`
        }
      } else {
        if (tab != 'all') {
          filter = `&filters[category][$eq]=${tab}${date
            ? `&filters[$and][0][updatedAt][$gte]=${getPreviousDate(
              date,
            )}T18:30:00.000Z&filters[$and][1][updatedAt][$lte]=${date}T18:30:00.999Z`
            : ''
            }`
          console.log(filter, date)
        } else {
          filter = date
            ? `&filters[$and][0][updatedAt][$gte]=${getPreviousDate(
              date,
            )}T18:30:00.000Z&filters[$and][1][updatedAt][$lte]=${date}T18:30:00.999Z`
            : ''
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

  getSmsLogs: async (searchNumber, tab, page = 1, pageSize = 20, date) => {
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
        `/sms-logs?populate=*${filter}${date
          ? `&filters[$and][0][updatedAt][$gte]=${getPreviousDate(
            date,
          )}T18:30:00.000Z&filters[$and][1][updatedAt][$lte]=${date}T18:30:00.999Z`
          : ''
        }&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=updatedAt:desc`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
  getPrizeConfig: async () => {
    try {
      const response = await axiosInstanceNoAuth.get('/prize-configurations')
      return response.data
    } catch (error) {
      throw error
    }
  },
  getVoucherDetails: async (searchNumber, tab, page = 1, pageSize = 20) => {
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
        `/daraz-vouchers?populate=*${filter}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=updatedAt:desc`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
  createVoucher: async (data) => {
    try {
      const response = await axiosInstance.post(`/daraz-vouchers`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getWinnerDataForChart: async () => {
    try {
      const response = await axiosInstance.get(`/week/winners`)
      return response.data
    } catch (error) {
      throw error
    }
  },


  getWinnersForChart: async (type) => {
    try {
      let filter = ''

      if (type) {
        filter = `&filters[category][$eq]=${type}`
      }

      const response = await axiosInstance.get(
        `/winners?populate=*${filter}&pagination[page]=1&pagination[pageSize]=99999999999&sort[0]=updatedAt:desc`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
}

function getNextDate(dateString) {
  const date = new Date(dateString)
  date.setDate(date.getDate() + 1)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getPreviousDate(dateString) {
  const date = new Date(dateString)
  date.setDate(date.getDate() - 1)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
