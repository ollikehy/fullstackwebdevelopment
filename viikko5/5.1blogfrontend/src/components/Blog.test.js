import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('shows only title and author when not clicked', () => {
        const blog = {
            title: 'title',
            author: 'author',
            likes: 0,
            url: 'www.url.fi',
            user: null
        }

        const blogComponent = shallow(<Blog blog={blog}/>)

        const simpleDiv = blogComponent.find('.simpleView')
        simpleDiv.simulate('click')

        expect(simpleDiv.text()).toContain(blog.author)
        expect(simpleDiv.contains(<div class="fullView" />)).toEqual(false)

        const fullDiv = blogComponent.find('.fullView')
        
        expect(fullDiv.text()).toContain(blog.likes)
        expect(fullDiv.text()).toContain(blog.url)
    })
})