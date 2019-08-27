<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Регистрация</h1>
      <form @submit.prevent="handleSubmit" class="signup-form">
        <div class="field">
          <label class="label" for="email">Email:</label>
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            class="input"
            placeholder="Enter email"
            required
          >
        </div>
        <div class="field">
          <label class="label" for="password">Пароль:</label>
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            class="input"
            placeholder="Enter password"
            required
          >
        </div>

        <div class="field">
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': loading }"
          >
            Зарегистрироваться
          </button>
          <router-link to="/login" class="button is-text">Войти</router-link>
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
        error: state => state.user.signupError,
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
        this.$store.dispatch('signup', {
          email: this.email,
          password: this.password,
        });
      },
    },
  };
</script>
