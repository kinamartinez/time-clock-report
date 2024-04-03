import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createVuetify } from 'vuetify';
import GenerateReport from '@/views/GenerateReport.vue'

const vuetify = createVuetify();

describe('GenerateReport', () => {
  const store = createStore({
    getters: {
      getMonthlyReport: () => ({
        name: 'Karina Martinez',
        position: 'Developer',
        id: '12345',
        image: 'KarinaMartinez.jpg',
        totalHoursPerMonth: 160,
        monthly_reports: [
          {
            "month": "January",
            "daily_reports": [
              {
                "day": "2024-01-01",
                "total_worked_hours": 8,
                "start_time": "09:00",
                "end_time": "17:00"
              },
              {
                "day": "2024-01-02",
                "total_worked_hours": 7.5,
                "start_time": "09:30",
                "end_time": "17:00"
              },
              {
                "day": "2024-01-03",
                "total_worked_hours": 8.5,
                "start_time": "09:30",
                "end_time": "18:00"
              }
            ]
          }]
      })
    }
  });

  it('renders monthly report details correctly', () => {
    const wrapper = mount(GenerateReport, {
      global: {
        plugins: [store, vuetify]
      }
    });

    expect(wrapper.text()).toContain('Karina Martinez');

    expect(wrapper.text()).toContain('Developer');

    expect(wrapper.text()).toContain('ID: 12345');

    expect(wrapper.find('img').exists()).toBe(true);

    expect(wrapper.text()).toContain('Worked hours per month: 160');
  });
});
