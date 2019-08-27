<template>
  <div class="container">
    <h1 class="title">Форма обратной связи</h1>
    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label" for="header">Тема:</label>
        <input
          v-model="header"
          class="input"
          type="text"
          id="header"
          name="header"
          required
        >
      </div>

      <div class="field">
        <label class="label" for="message">Сообщение:</label>
        <textarea
          v-model="body"
          class="textarea"
          name="message"
          id="message"
          cols="30"
          rows="10"
        ></textarea>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <div
            class="file"
            :class="{ 'has-name': file }"
          >
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="attach"
                @change="handleFileAttach"
              >
              <span class="file-cta">
            <span class="file-label">
              Выберите файл
            </span>
          </span>
              <span v-if="file" class="file-name">
            {{ file.name }}
          </span>
            </label>
          </div>
        </div>

        <div class="control">
          <button class="button is-primary" type="submit">Отправить</button>
        </div>
      </div>

      <div
        v-if="error"
        class="message is-warning"
      >
        <div class="message-body">
          {{error}}
        </div>
      </div>

      <div
        v-if="success"
        class="message is-success"
      >
        <div class="message-body">
          {{success}}
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        error: state => state.request.contactError,
        success: state => state.request.contactSuccess,
      }),
    },
    data() {
      return {
        header: '',
        body: '',
        file: null,
      };
    },
    methods: {
      handleFileAttach: function (e) {
        this.file = e.target.files[0];
      },

      handleSubmit: function () {
        const formdata = new FormData();
        formdata.append('header', this.header);
        formdata.append('body', this.body);
        formdata.append('file', this.file);

        this.$store.dispatch('createRequest', {
          data: formdata,
          token: this.$store.state.user.token,
        });
      },
    },
  };
</script>
