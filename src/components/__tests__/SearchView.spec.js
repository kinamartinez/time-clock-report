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
    }
  },
  actions: {
    searchEmployees({ state, commit }, searchText) {
      const filteredEmployees = state.employees.filter(employee =>
        employee.name.toLowerCase().includes(searchText.toLowerCase())
      );
      commit('setFilteredEmployees', filteredEmployees);
    }
  },
  getters: {
    getFilteredEmployees(state) {
      return state.filteredEmployees;
    }
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
})