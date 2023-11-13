import './login.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../utils/firebase'
// import * as Yup from 'yup'
// import { Formik } from 'formik'
// import Validator from 'email-validator'

const Login = () => {
  const [isError, setIsError] = useState(false)

	const handleLogin = async (email, password) => {
		try {
			await signInWithEmailAndPassword(firebaseAuth, email, password)
		} catch (error) {
			console.log(error.code)
			setIsError(true)
		}
	}


	return (
		<div className="login">
			<div className="top">
				<div className="wrapper">
					<img
						className="logo"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt=""
					/>
				</div>
			</div>
			<div className="container">
				<form className='formCont'>
					<h1>Sign In</h1>
					<input
						type="email"
						placeholder="Email or phone number"
						onChange={(e) => setEmail(e.target.value)}
            className='input'
					/>
					<input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
            className='input'
					/>
					<button className="loginButton" onClick={handleLogin}>
						Sign In
					</button>

					<div className="save">
						<div className="checkbox">
							<input type="checkbox" id="checkbox" />
							<label htmlFor="checkbox">Remember me ?</label>
						</div>

						<div className="help">Need help?</div>
					</div>

					<div className="signupLink">
						New to Netflix? {/* <Link to={'/signup'}> */}
						<b>Sign up now</b>
						{/* </Link> */}
					</div>
					<small>
						This page is protected by Google reCAPTCHA to ensure you're not a
						bot. <b>Learn more</b>.
					</small>
				</form>
			</div>
		</div>
	)
}

export default Login
