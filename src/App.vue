<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      theme="dark"
      permanent
    >
      <v-list-item title="Time Clock Report" subtitle="Feel Better"></v-list-item>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Report hours" value="report" :to="{name:'home'}"></v-list-item>
        <v-list-item prepend-icon="mdi-account-supervisor-circle" title="About me" value="about" :to="{name:'about'}"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="teal-darken-4"
      image="nav-bar.jpg"
    >
      <template v-slot:image>
        <v-img gradient="to top right, rgba(179, 238, 223, .9), rgba(179, 238, 223, .8), rgba(179, 238, 223, .8)"></v-img>
      </template>

      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Time Clock Report</v-app-bar-title>

      <v-spacer></v-spacer>

    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({ drawer: null }),
}
</script>
