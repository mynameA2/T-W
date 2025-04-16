<template>
  <div class="login-page">
    <form @submit.prevent="onLogin">
    <div class="login-form">
      <input v-model="username" placeholder="Логин" />
      <input v-model="password" type="password" placeholder="Пароль" />
      <button type="submit">Войти</button>
      <p v-if="error" class="error-msg">
        Введены неверные данные авторизации. Попробуйте ещё раз
      </p>
    </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const username = ref("");
const password = ref("");
const error = ref(false);
const auth = useAuthStore();

async function onLogin() {
  const success = await auth.login(username.value, password.value);
  error.value = !success;
  if (success) {
    navigateTo("/account");
  }
}
</script>

<style lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
input,
button {
  display: block;
  margin: 0.5rem;
  padding: 0.5rem;
  width: 100%;
}

.error-msg {
  color: red;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 1rem;
  display: flex;
  align-items: center;
}
</style>
