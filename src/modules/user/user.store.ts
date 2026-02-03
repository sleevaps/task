import { reactive } from "vue"
import { authApi } from "@/api/auth.api"
import type { RecordModel } from 'pocketbase'

interface UserState {
    user: RecordModel | null
    isAuth: boolean
}

const state = reactive<UserState>({
    user: authApi.getUser(),
    isAuth: authApi.isAuth()
})

export const userStore = {
    state,

    async login(email: string, password: string) {
        const authData = await authApi.login(email, password)

        state.user = authData.record
        state.isAuth = true
    },

    logout() {
        authApi.logout()
        state.user = null
        state.isAuth = false
    },

    init() {
        state.user = authApi.getUser()
        state.isAuth = authApi.isAuth()
    }
}