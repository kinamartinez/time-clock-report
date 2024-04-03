import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SearchView from '@/views/SearchView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import HomeView from '@/views/HomeView.vue'
import EmployeeDetails from '@/views/EmployeeDetails.vue'
import GenerateReport from '@/views/GenerateReport.vue'
import { createVuetify } from 'vuetify'
import { components, directives } from 'vuetify/dist/vuetify.js'
import employeesData from '@/data/employeesData.json'
import sinon from 'sinon'

const store = createStore({
  state: {
    employees: employeesData.employees,
    filteredEmployees: [],
    selectedEmployee: {},
    monthlyReportObj: {}
  },
  mutations: {
    setFilteredEmployees(state, employees) {
      state.filteredEmployees = employees;
    },
    setSelectedEmployee(state, selectedEmployee) {
      state.selectedEmployee = selectedEmployee;
    },
  },
  actions: {
    searchEmployees({ state, commit }, searchText) {
      const filteredEmployees = state.employees.filter(employee =>
        employee.name.toLowerCase().includes(searchText.toLowerCase())
      );
      commit('setFilteredEmployees', filteredEmployees);
    },
    getEmployeeById({ state, commit }, id) {
      const selectedEmployee = state.employees.find((employee) => employee.id === id);
      commit('setSelectedEmployee', selectedEmployee);
    },
  },
  getters: {
    getFilteredEmployees(state) {
      return state.filteredEmployees;
    },
    getSelectedEmployee(state) {
      return state.selectedEmployee;
    },
  }
})

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

describe('SearchView', () => {
  it('renders properly', () => {
    const wrapper = mount(SearchView, {
      global: {
        plugins: [store, router, vuetify]
      }
    })
    expect(wrapper.text()).toContain('SearchSearch')
  })

  it('search input field exists', () => {
    const wrapper = mount(SearchView, {
      global: {
        plugins: [store, router, vuetify]
      }
    });
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it('typing in the search input field updates filteredEmployees', async () => {
    const wrapper = mount(SearchView, {
      global: {
        plugins: [store, router, vuetify]
      }
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('Karina');

    await wrapper.vm.$nextTick();

    const filteredEmployees = store.getters.getFilteredEmployees;

    expect(filteredEmployees.length).toBeGreaterThan(0);
  });

  it('renders filtered employees correctly', async () => {
    const wrapper = mount(SearchView, {
      global: {
        plugins: [store, router, vuetify]
      }
    });
    await wrapper.vm.$nextTick();
    const filteredEmployees = store.getters.getFilteredEmployees;
    const employeeCards = wrapper.findAll('.v-card');
    expect(employeeCards.length).toBe(filteredEmployees.length);
  });

  it('renders correct number of employee cards', async () => {
    const wrapper = mount(SearchView, {
      global: {
        plugins: [store, router, vuetify]
      }
    });
    await wrapper.vm.$nextTick();
    const filteredEmployees = store.getters.getFilteredEmployees;
    const employeeCards = wrapper.findAll('.v-card');
    expect(employeeCards.length).toBe(filteredEmployees.length);
  });

  it('clicking on employee card triggers selectEmployee function', async () => {
    const wrapper = mount(SearchView, {
      global: {
        plugins: [store, router, vuetify]
      }
    });

    await wrapper.vm.$nextTick();
    const originalSelectEmployee = wrapper.vm.selectEmployee;
    wrapper.vm.selectEmployee = sinon.stub();
    const employeeCard = wrapper.find('.v-card');
    await employeeCard.trigger('click');
    expect(wrapper.vm.selectEmployee.called).toBeTruthy();
    wrapper.vm.selectEmployee = originalSelectEmployee;
  });
})