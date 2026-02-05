<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

type Mode = 'login' | 'register'

const email = ref('')
const password = ref('')
const remember = ref(false)
const loading = ref(false)
const error = ref('')

const mode = ref<Mode>('login')

const { login, register } = useAuth()
const router = useRouter()

const title = computed(() =>
  mode.value === 'login' ? 'Welcome back' : 'Create account'
)

const subtitle = computed(() =>
  mode.value === 'login'
    ? 'Build your nutrition dashboard effortlessly'
    : 'Start tracking your dishes and calories'
)

const submitText = computed(() =>
  mode.value === 'login' ? 'Login' : 'Sign up'
)

const toggleText = computed(() =>
  mode.value === 'login'
    ? 'Don’t have an account? Sign up'
    : 'Already have an account? Login'
)

const submit = async () => {
  loading.value = true
  error.value = ''

  try {
    if (mode.value === 'login') {
      await login(email.value, password.value)
    } else {
      await register(email.value, password.value)

      mode.value = 'login'
      error.value = 'Account created. Please log in.'
    }

    router.push('/')
  } catch (e) {
    error.value = 'Authentication failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="promo">
      <div class="overlay">
        <h2>All the dishes you need<br />are here.</h2>
        <p class="author">
          sleevaps<br />
          <span>mini-project for Fact</span>
        </p>
      </div>
    </div>

    <div class="form-wrap">
      <div class="form-card">
        <h1>{{ title }}</h1>
        <p class="subtitle">{{ subtitle }}</p>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password (At least 8 symbols)"
        />

        <div v-if="mode === 'login'" class="row">
          <label>
            <input type="checkbox" v-model="remember" />
            Remember me
          </label>

          <a href="#">Forgot password?</a>
        </div>

        <button :disabled="loading" @click="submit">
          {{ loading ? 'Please wait…' : submitText }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>

        <p
          class="toggle"
          @click="mode = mode === 'login' ? 'register' : 'login'"
        >
          {{ toggleText }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  background: #f5f6fa;
}

.promo {
  background: url('https://hayat.rest/image/catalog/blog/shutterstock_644368891(1).jpg')
    center / cover no-repeat;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0.55),
    rgba(0, 0, 0, 0.35)
  );
  color: white;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.overlay h2 {
  font-size: 28px;
  line-height: 1.3;
}

.author {
  margin-top: 16px;
  font-size: 14px;
  opacity: 0.9;
}

.author span {
  opacity: 0.7;
}

.form-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-card {
  width: 100%;
  max-width: 380px;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

h1 {
  margin: 0;
}

.subtitle {
  margin: 6px 0 24px;
  color: #666;
}

input[type='email'],
input[type='password'] {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  font-size: 14px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 16px;
}

.row a {
  color: #6366f1;
  text-decoration: none;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #6366f1;
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
}

button:hover {
  background: #5457e0;
}

.error {
  margin-top: 12px;
  color: #ef4444;
  font-size: 13px;
  text-align: center;
}

.toggle:hover { 
  color: #6366f1;
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .promo {
    display: none;
  }
}
</style>
