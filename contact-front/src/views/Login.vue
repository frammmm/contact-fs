<template>
  <div class="container">
    <h2>Вход</h2>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          id="email" 
          v-model="email"
          class="form-control" 
          type="email" 
          name="email" 
          placeholder="Enter email"
          required
        >
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input 
          id="password" 
          v-model="password"
          class="form-control" 
          type="password" 
          name="password" 
          placeholder="Enter password"
          required
        >
      </div>

      <div
        v-if="error"
        class="alert alert-warning"
      >
        {{error}}
      </div>

      <button type="submit" class="btn btn-primary">Войти</button>
      <router-link to="/signup" class="text-secondary">Регистрация</router-link>
    </form>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      error: state => state.user.loginError
    })
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    handleSubmit: function() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
