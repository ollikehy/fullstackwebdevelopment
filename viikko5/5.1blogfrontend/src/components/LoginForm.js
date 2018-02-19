import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleChange, username, password}) => {
    return (
        <div className="loginForm">
            <h2>Kirjaudu sovellukseen</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    käyttäjätunnus
                    <input
                        value={username}
                        onChange={handleChange}
                        name='username'
                    />
                </div>
                <div>
                    salasana
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit'>kirjaudu</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm