<template>
  <div>
    <header class="header container">
      <button class="button is-light" @click="handleExitButtonClick">Выйти</button>
    </header>
    <section class="section">
      <router-view />
    </section>
  </div>
</template>
<script>
export default {
  methods: {
    handleExitButtonClick: function() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
<style scoped>
.header {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
