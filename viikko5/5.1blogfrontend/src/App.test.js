import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import BlogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it('only login form is rendered', () => {
            app.update()
            const loginForm = app.find('.loginForm')
            expect(loginForm.text()).toContain('Kirjaudu')
        })
    })

    describe('when user is logged in', () => {
        beforeEach(() => {
            const user = {
                username: 'epic',
                token: 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVwaWMiLCJpZCI6IjVhODZmNTFmMGFlYWU0N2E0YTUyNjMxMiIsImlhdCI6MTUxOTA1NjEyOH0.HWVW9U0uzuahK_B78tUt0qVLxkJyOS288ZA9KzI84Qo',
                name: 'eeppista'
            }

            localStorage.setItem('loggedUser', JSON.stringify(user))
            
            app = mount(<App />)
            })

        it('renders all blogs it gets from backend', () => {
            app.update()

            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(BlogService.blogs.length)
        })
    })
})