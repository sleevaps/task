import { pb } from './pocketbase'

export const authApi = {
  login(email: string, password: string) {
    return pb.collection('users').authWithPassword(email, password)
  },

  logout() {
    pb.authStore.clear()
  },

  getUser() {
    return pb.authStore.model
  },

  isAuth() {
    return pb.authStore.isValid
  }
}
