<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Вход</h1>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="field">
          <label class="label" for="email">Email:</label>
          <input
            id="email"
            v-model="email"
            class="input"
            type="email"
            name="email"
            placeholder="Enter email"
            required
          >
        </div>
        <div class="field">
          <label class="label" for="password">Пароль:</label>
          <input
            id="password"
            v-model="password"
            class="input"
            type="password"
            name="password"
            placeholder="Enter password"
            required
          >
        </div>

        <div class="field">
          <button
            type="submit"
            class="button is-primary control"
            :class="{ 'is-loading': loading }"
          >
            Войти
          </button>
          <router-link to="/signup" class="button is-text control">Регистрация</router-link>
        </div>

        <div
          v-if="error"
          class="message is-warning"
        >
          <div class="message-body">
            {{error}}
          </div>
        </div>
      </form>

    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        error: state => state.user.loginError,
        loading: state => state.user.loading,
      }),
    },
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      handleSubmit: function () {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
      },
    },
  };
</script>
