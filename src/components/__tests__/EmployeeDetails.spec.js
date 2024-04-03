globalThis.ResizeObserver = class ResizeObserver {
  constructor(callback) {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import EmployeeDetails from '@/views/EmployeeDetails.vue'
import HomeView from '@/views/HomeView.vue'
import GenerateReport from '@/views/GenerateReport.vue'
import { createVuetify } from 'vuetify'
import { components, directives } from 'vuetify/dist/vuetify.js'
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost'
})
// eslint-disable-next-line no-undef
global.window = dom.window
// eslint-disable-next-line no-undef
global.document = dom.window.document

describe('EmployeeDetails', () => {
  const store = createStore({
    getters: {
      getSelectedEmployee: () => ({
        name: 'Karina Martinez',
        position: 'Developer',
        id: '12345',
        color: 'blue',
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
          }
      ]
      })
    },
    actions: {
      getReportByMonth: () => {}
    }
  });

  const router = createRouter({
    history: createWebHistory(),
    routes: [ {
      path: '/',
      name: 'home',
      component: HomeView
    },
      {
        path: '/employee/:id',
        name: 'employee',
        component: EmployeeDetails,
        props: true
      },
      {
        path: '/employee/:id/report',
        name: 'report',
        component: GenerateReport,
        props: true
      }]
  })

  const vuetify = createVuetify({
    components,
    directives,
  })

  it('renders entity details correctly', () => {
    const wrapper = mount(EmployeeDetails, {
      global: {
        plugins: [store, router, vuetify]
      }
    });

    expect(wrapper.text()).toContain('Karina Martinez');
    expect(wrapper.text()).toContain('Developer');
  });

  it('toggles dialog when "Add hours" button is clicked', async () => {
    const wrapper = mount(EmployeeDetails, {
      global: {
        plugins: [store, router, vuetify]
      }
    });

    const addButton = wrapper.find('.addHours');
    await addButton.trigger('click');

    expect(wrapper.vm.dialog).toBe(true);
  });

  it('formats daily report correctly', () => {
    const wrapper = mount(EmployeeDetails, {
      global: {
        plugins: [store, router, vuetify]
      }
    });

    const data = {
      month: 'January',
      year: 2024,
      day: 1,
      start_time: '08:00',
      end_time: '17:00'
    };

    const formattedReport = wrapper.vm.formatDailyReport(data);

    expect(formattedReport.day).toBe('2024-01-1');
    expect(formattedReport.start_time).toBe('08:00');
    expect(formattedReport.end_time).toBe('17:00');
    expect(formattedReport.total_worked_hours).toBe('9:00');
  });

  it('calculates total worked hours correctly', () => {
    const wrapper = mount(EmployeeDetails, {
      global: {
        plugins: [store, router, vuetify]
      }
    });

    const startTime = '08:00';
    const endTime = '17:30';

    const totalWorkedHours = wrapper.vm.calculateTotalWorkedHours(startTime, endTime);

    expect(totalWorkedHours).toBe('9:30');
  });
});
