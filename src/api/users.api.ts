import { pb } from './pocketbase'
import type { RecordModel } from 'pocketbase'

export interface User extends RecordModel {
  username: string
  email: string
  name?: string
  avatar?: string
}

export const usersApi = {
  async login(email: string, password: string) {
    const authData = await pb.collection('users').authWithPassword(email, password)
    return authData
  },

  async register(username: string, email: string, password: string, passwordConfirm: string) {
    const data = {
      username,
      email,
      password,
      passwordConfirm
    }
    return pb.collection('users').create(data)
  },

  async logout() {
    pb.authStore.clear()
  },

  async updateProfile(id: string, data: Partial<User>) {
    return pb.collection('users').update(id, data)
  },

  async requestPasswordReset(email: string) {
    return pb.collection('users').requestPasswordReset(email)
  },

  async getCurrent() {
  if (!pb.authStore.model?.id) {
    throw new Error('User not authenticated')
  }
    return pb.collection('users').getOne(pb.authStore.model.id)
  }
}