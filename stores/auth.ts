import { defineStore } from 'pinia';
import MD5 from 'crypto-js/md5';
import { navigateTo } from 'nuxt/app';

export interface User {
    name: string
    surname: string
    credentials: {
        username: string
        passphrase: string
    }
    active: boolean
    created: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        user: null as User | null,
    }),
    actions: {
        async login(username: string, passphrase: string) {
            const response = await fetch('/users.json')
            const users: User[] = await response.json()

            const hash = MD5(passphrase).toString()
            const found = users.find(
                u => u.credentials.username === username && u.credentials.passphrase === hash
            )

            if (found && found.active) {
                this.isLoggedIn = true
                this.user = found
                localStorage.setItem('session', JSON.stringify(found))
                return true
            } else {
                return false
            }
        },
        logout() {
            this.isLoggedIn = false
            this.user = null
            localStorage.removeItem('session')
            navigateTo('/')
        },
        restoreSession() {
            const saved = localStorage.getItem('session')
            if (saved) {
                this.user = JSON.parse(saved)
                this.isLoggedIn = true
            }
        },
    },
})
