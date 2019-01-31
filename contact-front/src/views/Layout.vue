<template>
  <div>
    <div class="header container">
      <button class="btn btn-secondary" @click="handleExitButtonClick">Выйти</button>
    </div>
    <div class="router-view">
      <router-view />
    </div>
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
.router-view {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
