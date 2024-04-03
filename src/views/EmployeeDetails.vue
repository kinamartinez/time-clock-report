<template>
  <div>
    <v-banner
      class="my-4"
      color="primary"
      lines="two"
    >
      <template v-slot:prepend>
        <v-avatar
          :color="entity.color"
          icon="mdi-account"
        ></v-avatar>
      </template>

      <v-banner-text class="text-lg">
        <h2>{{ entity.name }}</h2>
        {{entity.position}}
      </v-banner-text>

      <template v-slot:actions>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="mb-2"
              color="primary"
              dark
              v-bind="props"
            >
              Add hours
            </v-btn>
          </template>
          <AddWorkingHours  @close="close" @save="save" ></AddWorkingHours>
        </v-dialog>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
              Generate report
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in entity.monthly_reports"
              :key="index"
              :value="index"
            >
              <v-list-item-title @click="getReport(item.month)">{{ item.month }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </template>
    </v-banner>
    <v-container>
      <MonthlyReport :monthly_reports="entity.monthly_reports"></MonthlyReport>
    </v-container>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import AddWorkingHours from '@/components/addWorkingHours.vue'
import { monthNameToNumber } from '@/data/monthNameToNum.js'
import { useRouter } from 'vue-router'
import MonthlyReport from '@/components/monthlyReport.vue'

const router = useRouter();
const store = useStore();
let dialog = ref(false);
const entity = computed(() => store.getters.getSelectedEmployee);

watch(dialog, (val) => {
  if (!val) {
    close();
  }
});

const close = () => {
  handleClose(dialog);
};

const save = (data) => {
  let monthExists = false;

  entity.value.monthly_reports.forEach(item => {
    if (item.month.toLowerCase() === data.month.toLowerCase()) {
      monthExists = true;
      item.daily_reports.push(formatDailyReport(data));
    }
  });

  if (!monthExists) {
    entity.value.monthly_reports.push({
      month: data.month,
      daily_reports: [formatDailyReport(data)]
    });
  }
  close();
};

const formatDailyReport = (data) => {
  const monthNumber = monthNameToNumber(data.month);
  return {
    day: `${data.year}-${monthNumber}-${data.day}`,
    total_worked_hours: calculateTotalWorkedHours(data.start_time, data.end_time),
    start_time: data.start_time,
    end_time: data.end_time,
  }
}

const handleClose = (dialogRef) => {
  dialogRef.value = false;
};

const calculateTotalWorkedHours = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${String(minutes).padStart(2, '0')}`;
}

const getReport = (month) => {
  const payload = {
    month,
    employeeId: entity.value.id
  }
  store.dispatch('getReportByMonth', payload);
  router.push({ name: 'report', params: { id: entity.value.id } });
}

</script>


<style scoped>

</style>