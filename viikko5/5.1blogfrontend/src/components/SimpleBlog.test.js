import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'title',
      author: 'author',
      likes: 0
    }
    const blogComponent = shallow(<SimpleBlog blog={blog}/>)
    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.title)
    const likesDiv = blogComponent.find('.likes')
    expect(likesDiv.text()).toContain(blog.likes)
  })
})

describe.only('<SimpleBlog />', () => {
  it('button pressed calls function', () => {
    const blog = {
      title: 'title',
      author: 'author',
      likes: 0
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})