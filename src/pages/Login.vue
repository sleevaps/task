<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const remember = ref(true)
const error = ref('')

const { login } = useAuth()
const router = useRouter()

const submit = async () => {
  error.value = ''

  try {
    await login(email.value, password.value)
    router.push('/')
  } catch {
    error.value = 'Invalid email or password'
  }
}
</script>

<template>
  <div class="login-page">
    <!-- LEFT -->
    <div class="promo">
      <div class="overlay">
        <h2>All the dishes you need<br />are here.</h2>
        <p class="author">
          sleevaps<br />
          <span>mini-project for Fact</span>
        </p>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="form-wrap">
      <div class="form-card">
        <h1>Welcome back</h1>
        <p class="subtitle">
          Build your nutrition dashboard effortlessly
        </p>

        <input
          v-model="email"
          type="email"
          placeholder="Email"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
        />

        <div class="row">
          <label>
            <input type="checkbox" v-model="remember" />
            Remember me
          </label>

          <a href="#">Forgot password?</a>
        </div>

        <button @click="submit">Log in</button>

        <p v-if="error" class="error">{{ error }}</p>
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

/* LEFT */
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

/* RIGHT */
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


@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
  }

  .promo {
    display: none;
  }
}
</style>
