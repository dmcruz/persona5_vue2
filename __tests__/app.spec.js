import { mount } from '@vue/test-utils'
import P5List from './../src/views/P5List.vue'

describe('P5List', () => {
  // Inspect the raw component options
  it('has data', () => {
    expect(typeof P5List.data).toBe('function')
  })
  it('check initial data', () => {
    expect(P5List.data().sortOrder).toBe('asc')
    expect(P5List.data().list).toStrictEqual([])
    expect(P5List.data().headerAttributes).toStrictEqual([ "lvl", "persona", "arcana", "inherits", "stats", "elems"])
    expect(P5List.data().personaAttributes).toStrictEqual([ "level", "persona", "inherits", "item", "rare item",
    "arcana", "trait", "elems", "stats", "skills"])
  })
});
describe('Mounted P5List', () => {
  const wrapper = mount(P5List);

  test('check mounted data', () => {
    expect(wrapper.vm.$data.list).toHaveLength(232);
  })
});