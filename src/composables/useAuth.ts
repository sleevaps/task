import { computed } from 'vue'
import { userStore } from '@/modules/user'

export function useAuth() {
  const user = computed(() => userStore.state.user)
  const isAuth = computed(() => userStore.state.isAuth)

  return {
    user,
    isAuth,
    login: userStore.login,
    register: userStore.register,
    logout: userStore.logout
  }
}
