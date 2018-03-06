import React from 'react'
import PropTypes from 'prop-types'
import { Container, Form, Button } from 'semantic-ui-react'

const LoginForm = ({ handleSubmit, handleChange, username, password}) => {
    return (
        <Container>
        <div>
            <h2>Kirjaudu sovellukseen</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Field width="10" onChange={handleChange}>
                    <label>käyttäjätunnus</label>
                    <input
                        value={username}
                        name='username'/>
                </Form.Field>
                <Form.Field width="10" onChange={handleChange}>
                <label>salasana</label>
                    <input
                        type="password"
                        name="password"
                        value={password}/>
                </Form.Field>
                <Button type='submit' color="instagram">kirjaudu</Button>
            </Form>
        </div>
        </Container>
    )
}

LoginForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm