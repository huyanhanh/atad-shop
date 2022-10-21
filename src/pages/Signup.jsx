import React, { useState } from 'react'

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { storage } from '../firebase.config'
import { db } from '../firebase.config'
import { async } from '@firebase/util'

import Helmet from '../components/Helmet/Helmet'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button/Button'
import { toast } from 'react-hot-toast'

const Signup = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [file, setFile] = useState(null)
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const signup = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password)

			const user = userCredential.user

			const storageRef = await ref(storage, `images/${Date.now() + username}`)
			const uploadTask = uploadBytesResumable(storageRef, file)


			uploadTask.on(
				(error) => {
					toast.error(error.message)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then(async (downloadURL) => {
							// update user profile
							await updateProfile(user, {
								displayName: username,
								photoURL: downloadURL
							})

							// storage user data in firebase
							await setDoc(doc(db, 'users', user.uid), {
								uid: user.uid,
								displayName: username,
								email,
								photoURL: downloadURL
							})
						})
				}
			)

			setLoading(false)
			toast.success('Account created success')
			navigate('/login')
		} catch (error) {
			setLoading(false)
			toast.error('Something wrong!')
		}
	}

	return (
		<Helmet title={'Login'}>
			{
				loading
					? <div className='loading-text'>Loading...</div>
					: <div className='login'>
						<div className='login__form-wrapper'>
							<h3 className='login__form-text'>Signup</h3>
							<form className='login__form-inner' onSubmit={signup}>
								<div className='login__form-inner-input'>
									<input
										className='login__form-inner-input__input'
										type="text"
										placeholder='Username'
										value={username}
										onChange={e => setUsername(e.target.value)}
									/>
									<span className='login__form-inner-input-message'></span>
								</div>

								<div className='login__form-inner-input'>
									<input
										className='login__form-inner-input__input'
										type="text"
										placeholder='Your email@gmail.com'
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

								<div>
									<input
										className='login__form-inner-input__input'
										type="file"
										onChange={e => setFile(e.target.files[0])}
									/>
								</div>


								<div className='login__form-inner-btn'>
									<Button bg={'blue'}>Create an Account</Button>
								</div>
								<p className='login__form-inner-navigate'>
									You already an Account ?
									<Link to='/login'>
										<span>Login</span>
									</Link>
								</p>
							</form>
						</div>
					</div>
			}
		</Helmet>
	)
}

export default Signup