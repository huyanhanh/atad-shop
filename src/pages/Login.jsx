import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'

import Helmet from '../components/Helmet/Helmet'
import Button from '../components/Button/Button'
import { toast } from 'react-hot-toast'
import { async } from '@firebase/util'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()


	const signIn = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password)

			const user = userCredential.user

			setLoading(false)
			toast.success('Login sucess')
			navigate('/checkout')

		} catch (error) {
			setLoading(false)
			toast.error(error.message)
		}
	}

	return (
		<Helmet title={'Login'}>
			{
				loading
					? <h5>Loading ...</h5>
					: <div className='login'>
						<div className='login__form-wrapper'>
							<h3 className='login__form-text'>Login</h3>
							<form className='login__form-inner' onSubmit={signIn}>
								<div className='login__form-inner-input'>
									<input
										className='login__form-inner-input__input'
										type="text"
										placeholder='Enter your email'
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
									<span className='login__form-inner-input-message'></span>
								</div>

								<div className='login__form-inner-input'>
									<input
										className='login__form-inner-input__input'
										type="password"
										placeholder='Password'
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
								</div>

								<div className='login__form-inner-btn'>
									<Button bg={'blue'}>Login</Button>
								</div>
								<p className='login__form-inner-navigate'>
									You don't have an account?
									<Link to='/signup'>
										<span>Create an account</span>
									</Link>
								</p>
							</form>
						</div>
					</div>
			}
		</Helmet>
	)
}

export default Login