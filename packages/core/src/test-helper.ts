/* eslint-disable import/no-extraneous-dependencies */
import Composition from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'
import shortId from 'shortid'
import { Component } from 'vue'

export function createTestVue() {
  const localVue = createLocalVue()
  localVue.use(Composition)
  return localVue
}

interface StubOptions {
  /**
   * @default div
   */
  tag?: string
  /**
   * The data-test attribute
   */
  test?: string
}

export function stubComponent(opts?: StubOptions): Component {
  return {
    render: (h) =>
      h(opts.tag ?? 'div', {
        attrs: {
          'data-test': opts.test ?? shortId.generate()
        }
      })
  }
}

export default { createTestVue }
