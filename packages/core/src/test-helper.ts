import Composition from '@vue/composition-api'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createLocalVue } from '@vue/test-utils'

export const createTestVue = () => {
  const localVue = createLocalVue()
  localVue.use(Composition)
  return localVue
}

export default { createTestVue }
