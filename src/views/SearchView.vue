<template>
  <v-container fluid class="background-container">
    <v-row justify="center" dense>
      <v-col cols="12">
        <v-img
          class="mx-auto mt-5 mb-5"
          max-height="140"
          max-width="240"
          src="star-wars-icon.jpg"
        ></v-img>
      </v-col>

      <v-col cols="12">
        <v-container>
          <v-text-field v-model="searchText" label="Search" @input="searchEmployees" />
          <v-row>
            <v-col
              v-for="employee in filteredEmployees"
              :key="employee.id"
              cols="12"
              sm="12"
              md="6"
              lg="4"
            >
            <v-card class="mx-auto" max-width="320" @click="selectEmployee(employee.id)">
              <template #title>{{ employee.name }}</template>
              <template #subtitle>{{ employee.position }}</template>
              <template v-slot:prepend>
                <v-avatar :color=employee.color>
                  <v-icon icon="mdi-alarm"></v-icon>
                </v-avatar>
              </template>
              <template v-slot:append>
                <v-avatar size="40">
                  <v-img :alt="employee.name" :src="employee.image"></v-img>
                </v-avatar>
              </template>
            </v-card>
      </v-col>
    </v-row>
  </v-container>
  </v-col>

  </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const searchText = ref('');
    const router = useRouter();

    onMounted(() => {
      searchEmployees()
    })
    const searchEmployees = () => {
      store.dispatch('searchEmployees', searchText.value);
    };
    const filteredEmployees = computed(() => store.getters.getFilteredEmployees);

    const selectEmployee = (employeeId) => {
      router.push({ name: 'employee', params: { id: employeeId } });
      store.dispatch('getEmployeeById', employeeId);
    };

    return { searchText, searchEmployees, filteredEmployees, selectEmployee };
  }
};
</script>
