import { shallowMount } from '@vue/test-utils'

import Room from '../Room.vue'

describe('Room.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Room, {
      mocks: {
        $route: {
          params: {
            roomId: '123'
          }
        }
      }
    })
  })

  describe('default', () => {
    it('should create', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })
})
