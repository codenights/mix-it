import { shallowMount } from '@vue/test-utils'

import { createTestVue } from '@core/test-helper'
import Input from '../Input.vue'

describe('Input.vue', () => {
  let wrapper

  describe('default', () => {
    it('should exist', () => {
      wrapper = shallowMount(Input, {
        localVue: createTestVue()
      })
      expect(wrapper.exists()).toBe(true)
    })

    it('should have default props', () => {
      // Then
      expect(wrapper.vm.placeholder).toStrictEqual('')
      expect(wrapper.vm.type).toStrictEqual('')
      expect(wrapper.vm.value).toStrictEqual('')
    })
  })

  describe('validator', () => {
    describe('type', () => {
      let typePropValidator
      beforeEach(() => {
        wrapper = shallowMount(Input, {
          localVue: createTestVue()
        })
        typePropValidator = wrapper.vm.$options.props.type.validator
      })
      it('should be true if type is falsy', () => {
        expect(typePropValidator(undefined)).toBe(true)
        expect(typePropValidator(null)).toBe(true)
      })
      it('should be true if type is search', () => {
        expect(typePropValidator('search')).toBe(true)
      })
      it('should be true if type is add', () => {
        expect(typePropValidator('add')).toBe(true)
      })
      it('should be false if type invalid', () => {
        expect(typePropValidator('invalid')).toBe(false)
      })
    })
  })

  describe('display', () => {
    describe('btnInput', () => {
      describe('When the props type is undefined', () => {
        it('should not display the button', () => {
          // Given
          wrapper = shallowMount(Input, {
            localVue: createTestVue(),
            propsData: {
              type: undefined
            }
          })
          const btnInput = wrapper.find('[data-test=btn-input]')
          // Then
          expect(btnInput.exists()).toBe(false)
        })
      })

      describe('When the props type is defined and valid', () => {
        it('should display the button search', () => {
          // Given
          wrapper = shallowMount(Input, {
            localVue: createTestVue(),
            propsData: {
              type: 'search'
            }
          })
          const btnInput = wrapper.find('[data-test=btn-input]')
          // Then
          expect(btnInput.exists()).toBe(true)
          expect(btnInput.classes('button__search')).toBeTruthy()
        })

        it('should display the button add', () => {
          // Given
          wrapper = shallowMount(Input, {
            localVue: createTestVue(),
            propsData: {
              type: 'add'
            }
          })
          const btnInput = wrapper.find('[data-test=btn-input]')
          // Then
          expect(btnInput.exists()).toBe(true)
          expect(btnInput.classes('button__add')).toBeTruthy()
        })
      })
    })
  })

  describe('@event', () => {
    describe('@click btnInput', () => {
      it('should emit event "submit"', () => {
        // Given
        wrapper = shallowMount(Input, {
          localVue: createTestVue(),
          propsData: {
            type: 'search',
            value: 'test'
          }
        })
        const btnInput = wrapper.find('[data-test=btn-input]')
        // When
        btnInput.trigger('click')
        // Then
        expect(wrapper.emitted('submit')).toBeTruthy()
        expect(wrapper.emitted('submit')[0][0]).toStrictEqual('test')
      })
    })

    describe('@keydown.enter input', () => {
      it('should emit event "submit"', () => {
        // Given
        wrapper = shallowMount(Input, {
          localVue: createTestVue(),
          propsData: {
            type: 'search',
            value: 'test'
          }
        })
        const input = wrapper.find('[data-test=input]')
        // When
        input.trigger('keydown.enter')
        // Then
        expect(wrapper.emitted('submit')).toBeTruthy()
        expect(wrapper.emitted('submit')[0][0]).toStrictEqual('test')
      })
    })
  })
})
