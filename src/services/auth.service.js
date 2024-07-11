import { CLIENT_TOKEN } from 'src/common/const'
import TokenService from './TokenService'
import { algoAxiosInstance, axiosInstance } from 'src/common/AxiosInstance'

export const AuthService = {
  login: async (username, password) => {
    try {

      const response = await axiosInstance.post('/auth/local', {
        identifier: username,
        password,
      })
      if (response.data.jwt) {


        TokenService.setUser({...response.data})
      }
      return response.data
    } catch (error) {
      throw error
    }
  },

  logout: async () => {
    TokenService.removeUser()
  },

  getCurrentUser: () => {
    TokenService.getUser()
  },
}
