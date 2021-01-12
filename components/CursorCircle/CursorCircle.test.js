/**
 * @file CursorCircle.test.jsx
 * @url https://devhints.io/enzyme
 * @url https://github.com/airbnb/enzyme/blob/master/docs/guides/jest.md
 */
import * as React from 'react'
import { shallow, mount, render } from 'enzyme'
import CursorCircle from './CursorCircle.jsx'

describe('components', () => {
  describe('CursorCircle', () => {
    it('should mount with props', function () {
      const wrap = mount(<CursorCircle>Hello World</CursorCircle>)

      const expectedProps = {
        children: 'Hello World',
        tagName: 'div',
        className: '',
        variant: 'default'
      }

      expect(wrap.props()).toEqual(expectedProps)
    })

    it('should render as type and with content', function () {
      const wrap = render(<CursorCircle>Hello World</CursorCircle>)

      expect(wrap[0].type).toEqual('tag')
      expect(wrap[0].name).toEqual('div')
      // contain styles
      expect(wrap[0].attribs.class).toContain('cursor_circle')

      // contain text
      expect(wrap[0].children[0].type).toBe('text')
      expect(wrap[0].children[0].data).toBe('Hello World')

      // check for jsx styles
      expect(wrap[0].children[1].type).toBe('style')
    })
  })
})
