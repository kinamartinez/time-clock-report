
<template>
  <v-row>
    <v-col cols="12">
      <v-card class="mb-4" style="padding-left: 2vw; padding-bottom: 2vw;">
        <h1>Monthly Report</h1>
        <v-card-title>{{ monthlyReport.name }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="7">
              <v-list>
                <v-list-item>
                  <v-list-item-title>{{ monthlyReport.position }}</v-list-item-title>
                  <v-list-item-subtitle>
                    ID: {{ monthlyReport.id }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="4" class="d-flex justify-end">
              <v-avatar size="80">
                <v-img :alt="monthlyReport.name" :src="monthlyReport.image"></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-text>
        <h3>Worked hours per month: {{monthlyReport.totalHoursPerMonth}}</h3>
      </v-card>
    </v-col>
  </v-row>

  <MonthlyReport :monthly_reports="[monthlyReport]"></MonthlyReport>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import MonthlyReport from '@/components/monthlyReport.vue'

const store = useStore();
const monthlyReport = computed(() => store.getters.getMonthlyReport);
</script>

<style scoped>

</style>