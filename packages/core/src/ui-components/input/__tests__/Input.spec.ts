import { shallowMount } from '@vue/test-utils'

import { createTestVue } from '@core/test-helper'
import Input from '../Input.vue'

describe('Input.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Input, {
      localVue: createTestVue()
    })
  })

  it('should exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
