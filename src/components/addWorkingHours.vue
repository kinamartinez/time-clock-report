<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add working hours</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col v-for="(value, key) in newItem" :key="key" cols="12" md="4" sm="6">
            <v-select
              v-if="['month'].includes(key)"
              label="Select"
              :items=months
              v-model="newItem[key]"
            ></v-select>
            <v-select
              v-if="['day'].includes(key)"
              label="Select"
              :items=days
              v-model="newItem[key]"
            ></v-select>
            <v-select
              v-if="['year'].includes(key)"
              label="Select"
              :items=years
              v-model="newItem[key]"
            ></v-select>
            <v-text-field v-if="['start_time', 'end_time'].includes(key)"  type="time" v-model="newItem[key]" :label="capitalize(key)"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="handleClose">Cancel</v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="handleSave">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>

import { ref } from 'vue'
import { getDefaultItem } from '@/data/defaultItem.js'

export default {
  name: 'AddWorkingHours',
  data() {
    return {
      newItem: ref(getDefaultItem()),
      months: ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
      days: ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]),
      years: ref([2022, 2023, 2024, 2024])
    }
  },
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    handleClose() {
      this.$emit("close");
    },
    handleSave() {
      this.$emit("save", this.newItem);
    }
  }
}
</script>


<style>

</style>