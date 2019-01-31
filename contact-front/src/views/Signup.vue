<template>
  <div class="container">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleSubmit" class="signup-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          v-model="email"
          type="email"
          name="email"
          id="email"
          class="form-control"
          placeholder="Enter email"
          required
        >
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input 
          v-model="password"
          type="password"
          name="password"
          id="password"
          class="form-control"
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

      <button type="submit" class="btn btn-primary">Зарегистироваться</button>
      <router-link to="/login" class="text-secondary">Войти</router-link>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      error: state => state.user.signupError
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
      this.$store.dispatch("signup", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
