<template>
  <div class="container">
    <h2>Форма обратной связи</h2>
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label for="header">Тема:</label>
        <input 
          v-model="header" 
          class="form-control" 
          type="text" 
          id="header" 
          name="header" 
          required
        >
      </div>
      <div class="form-group">
        <label for="message">Сообщение:</label>
        <textarea 
          v-model="body"
          class="form-control"
          name="message"
          id="message"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="form-group">
        <input @change="handleFileAttach" type="file" name="attach" id="attach">
      </div>

     <div
        v-if="error"
        class="alert alert-warning"
      >
        {{error}}
      </div>

      <button class="btn btn-primary" type="submit">Отправить</button>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      error: state => state.request.contactError
    })
  },
  data() {
    return {
      header: "",
      body: "",
      file: null
    };
  },
  methods: {
    handleFileAttach: function(e) {
      this.file = e.target.files[0];
    },

    handleSubmit: function() {
      const formdata = new FormData();
      formdata.append("header", this.header);
      formdata.append("body", this.body);
      formdata.append("file", this.file);
      this.$store.dispatch("createRequest", {
        data: formdata,
        token: this.$store.state.user.token
      });
    }
  }
};
</script>
