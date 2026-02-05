import { pb } from './pocketbase'

export const authApi = {
  async login(email: string, password: string) {
    return pb.collection('users').authWithPassword(email, password)
  },

  async register(email: string, password: string) {
    return pb.collection('users').create({
      email,
      password,
      passwordConfirm: password
    })
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
