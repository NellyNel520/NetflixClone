import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../utils/firebase'
// import { registerUser } from '../../context/apiCalls'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Validator from 'email-validator'
import './signup.scss'

const Signup = () => {
  const [email, setEmail] = useState('')


	const emailRef = useRef()
	const passwordRef = useRef()
	const usernameRef = useRef()

	const handleStart = () => {
		setEmail(emailRef.current.value)
	}

  // const handleFinish = async (email, password, username) => {
	// 	try {
	// 		await createUserWithEmailAndPassword(firebaseAuth, email, password)
	// 		await registerUser({
	// 			username,
	// 			email,
	// 		})
	// 	} catch (error) {
	// 		console.log(error)
	// 		// Alert.alert('Opps ...', error.message)
	// 	}
	// }
  return (
    <div className="signUp">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <button className="loginButton">Sign In</button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email" ref={emailRef} className='textInput'/>
            <button className="signupButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="Username" ref={usernameRef} className='textInput'/>
            <input type="password" placeholder="Password" ref={passwordRef} className='textInput' />
            <button className="signupButton" 
            // onClick={handleFinish}
            >
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Signup