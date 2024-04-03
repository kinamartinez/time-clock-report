<template>
  <SearchView />
</template>

<script>
import { defineComponent } from 'vue';
import SearchView from '@/views/SearchView.vue'

export default defineComponent({
  name: 'HomeView',

  components: {
    SearchView,

  },
});
</script>
