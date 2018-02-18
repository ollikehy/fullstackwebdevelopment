import React from 'react'
import { shallow } from 'enzyme'
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