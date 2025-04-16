export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();
    if (import.meta.client && !auth.isLoggedIn) return navigateTo('/')
})