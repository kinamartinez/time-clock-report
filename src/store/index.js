import { createStore } from 'vuex';
import employeesData from '../data/employeesData.json';

export default createStore({
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
        setMonthlyReportObj(state, monthlyReportObj) {
            state.monthlyReportObj = monthlyReportObj;
        }
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
        getReportByMonth({ state, commit }, payload) {
            const employeeById = state.employees.find((employee) => employee.id === payload.employeeId);
            const monthlyItems = employeeById.monthly_reports.find(item => item.month === payload.month);

            const totalHoursPerMonth = monthlyItems.daily_reports.reduce((total, report) => total + report.total_worked_hours, 0);

            const monthlyReport = {
                ...monthlyItems,
                totalHoursPerMonth: totalHoursPerMonth,
                name: employeeById.name,
                position: employeeById.position,
                image: employeeById.image,
                color: employeeById.color,
                id: employeeById.id,
            };

            console.log(monthlyReport);
            commit('setMonthlyReportObj', monthlyReport);
        }
    },
    getters: {
        getFilteredEmployees(state) {
            return state.filteredEmployees;
        },
        getSelectedEmployee(state) {
            return state.selectedEmployee;
        },
        getMonthlyReport(state) {
            return state.monthlyReportObj;
        }
    }
});
