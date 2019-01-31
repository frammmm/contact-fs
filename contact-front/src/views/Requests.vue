<template>
  <div class="container">
    <ul v-if="items" class="list-group">
      <li
        v-for="item in items"
        :key="item.id"
        class="list-group-item list-group-item-action justify-content-between card card-body"
        @click="activeItem = item.id"
      >
        <h6>{{item.header}}
          <span v-if="item.complete" class="badge badge-success">Прочтено</span>
        </h6>
        <div v-if="item.id === activeItem" class="card-text">
          <p>{{item.body}}</p>
          <a
            v-if="item.file_url"
            class="text-primary"
            :href="`http://localhost:7331/api/${item.file_url}` | fixUrl"
          >Attach</a>
          
          <button
            v-if="!item.complete"
            @click="handleReadedButtonClick(item.id)"
            class="btn badge badge-dark"
          >Ответил</button>
        </div>

      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      activeItem: -1
    };
  },
  computed: {
    ...mapState({
      items: state => state.request.items
    })
  },
  methods: {
    handleReadedButtonClick: function(id) {
      this.$store.dispatch("markAsReaded", {
        id,
        token: this.$store.state.user.token
      });
    }
  },
  mounted() {
    this.$store.dispatch("getRequests", {
      token: this.$store.state.user.token
    });
  },
  filters: {
    fixUrl: function(value) {
      const fixed = value.replace(/\\/g, "/");

      return value.replace(/\\/g, "/");
    }
  }
};
</script>
