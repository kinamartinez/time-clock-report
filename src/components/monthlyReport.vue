<template>
  <v-row>
    <v-col cols="12">
      <v-card v-for="monthlyReport in monthly_reports" :key="monthlyReport.month" class="mb-4">
        <v-card-title>{{ monthlyReport.month }}</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="dailyReport in monthlyReport.daily_reports" :key="dailyReport.day">
              <v-list-item-title>{{ dailyReport.day }}</v-list-item-title>
              <v-list-item-subtitle>
                Worked hours: {{ dailyReport.total_worked_hours }} hours ({{ dailyReport.start_time }} - {{ dailyReport.end_time }})
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "MonthlyReport",
  props: {
    monthly_reports:  {
      type: Array,
      required: true
    },
  }
}
</script>

<style scoped>

</style>