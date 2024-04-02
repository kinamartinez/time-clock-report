import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { components, directives } from 'vuetify/dist/vuetify.js'
import AboutView from '@/views/AboutView.vue'
import sinon from 'sinon'
import { JSDOM } from 'jsdom'

const vuetify = createVuetify({
  components,
  directives,
})
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost'
})
// eslint-disable-next-line no-undef
global.window = dom.window
// eslint-disable-next-line no-undef
global.document = dom.window.document

describe('AboutView', () => {
  it('renders properly', () => {
    const wrapper = mount(AboutView, {
      global: {
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toContain('Karina MartinezAs a web developer')
  })

  it('contains name and description', () => {
    const wrapper = mount(AboutView, {
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.find('.v-card-title').text()).toBe('Karina Martinez')
    expect(wrapper.find('.v-card-text p').text()).toBe('As a web developer, I am driven by a passion for problem-solving. I thrive on challenges and approach each task with enthusiasm, creativity, and a commitment to self-improvement. Known for my dedication, diligence, and sense of responsibility, I excel both independently and as part of a collaborative team environment. I am continuously expanding my knowledge and skills, eagerly applying them to new projects as I strive for excellence in every pursuit.')
  })

  it('opens LinkedIn profile on button click', () => {
    const openLinkSpy = sinon.spy(window, 'open')

    const wrapper = mount(AboutView, {
      global: {
        plugins: [vuetify]
      }
    })

    wrapper.find('.linkedin-btn .v-icon').trigger('click')

    expect(openLinkSpy.calledWith('https://www.linkedin.com/in/karina-martinez-aab2ab129/', '_blank')).toBeTruthy()

    openLinkSpy.restore()
  })

  it('opens GitHub profile on button click', () => {
    const openLinkSpy = sinon.spy(window, 'open')

    const wrapper = mount(AboutView, {
      global: {
        plugins: [vuetify]
      }
    })

    wrapper.find('.github-btn .v-icon').trigger('click')

    expect(openLinkSpy.calledWith('https://github.com/kinamartinez', '_blank')).toBeTruthy()

    openLinkSpy.restore()
  })
})