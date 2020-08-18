<template>
  <div class="container">
    <ul v-if="items" class="requests">
      <li
        v-for="item in items"
        :key="item.id"
        class="request card"
      >
        <header
          class="card-header"
          @click="activeItem = activeItem === item.id ? -1 : item.id"
        >
          <p class="card-header-title">
            {{item.header}}
            <span v-if="item.complete" class="tag is-success">Прочтено</span>
          </p>
        </header>
        <div v-if="item.id === activeItem" class="card-content">
          <div class="content">
            {{item.body}}
          </div>
        </div>

        <footer v-if="item.id === activeItem" class="card-footer">
          <a
            v-if="item.file_url"
            class="card-footer-item"
            :href="`http://localhost:7331/api/${item.file_url}` | fixUrl"
          >
            Прикрепленный файл
          </a>
          <div v-if="!item.complete" class="card-footer-item">
            <button @click="handleReadedButtonClick(item.id)" class="button is-white is-fullwidth">
              Ответил
            </button>
          </div>

        </footer>
      </li>
    </ul>
  </div>
</template>
<script>
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        activeItem: -1,
      };
    },
    computed: {
      ...mapState({
        items: state => state.request.items,
      }),
    },
    methods: {
      handleReadedButtonClick: function(id) {
        this.$store.dispatch('markAsReaded', { id });
      },
    },
    mounted() {
      this.$store.dispatch('getRequests');
    },
    filters: {
      fixUrl: value => value.replace(/\\/g, '/'),
    },
  };
</script>
<style scoped>


  .requests .request:not(:last-child) {
    margin-bottom: 12px;
  }

  .request .card-header {
    cursor: pointer;
  }

  .request .card-header-title .tag {
    margin-left: 15px;
  }

  .request .content {
    overflow-wrap: break-word;
  }
</style>
