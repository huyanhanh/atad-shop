import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'

import { toast } from 'react-hot-toast'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { GoThreeBars } from 'react-icons/go'
import { BiUser } from 'react-icons/bi'
import { FiChevronLeft } from 'react-icons/fi'

const navigateMain = [
	{
		display: 'Home',
		path: '/home',
		idPath: 0
	},
	{
		display: 'Product',
		path: '/shop',
		idPath: 1
	}, {
		display: 'Contact',
		path: '/contact',
		idPath: 2
	}
]

const Header = () => {
	const navigate = useNavigate()

	// get path location page
	const { pathname } = useLocation()
	const activeNav = navigateMain.findIndex(e => e.path === pathname)

	const headerRef = useRef()
	const totalQuantity = useSelector(state => state.cart.totalQuantity)

	const menuLeft = useRef(null)
	const menuToggle = () => menuLeft.current.classList.toggle('active')

	const showProfileAction = useRef()
	const toggleProfile = () => showProfileAction.current.classList.toggle('show__profile')

	const { currentUser } = useAuth()

	useEffect(() => {
		const handleSrcollTop = () => {
			if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
				headerRef.current.classList.add('shrink')
			} else {
				headerRef.current.classList.remove('shrink')
			}
		}

		window.addEventListener('scroll', handleSrcollTop)

		return () => {
			window.removeEventListener('scroll', handleSrcollTop)
		}
	}, [])

	const logout = () => {
		signOut(auth)
			.then(() => {
				toast.success('Logout success')
				navigate('/home')
			})
			.catch(error =>
				toast.error(error.message)
			)
	}

	return (
		<header className='header' ref={headerRef}>
			<div className='container'>
				<div className='header__logo'>
					<Link to='/home'>
						<h1>JWT Punk</h1>
					</Link>
				</div>
				<div className='header__menu'>
					<div
						className='header__menu__mobile-toggle'
						onClick={menuToggle}
					>
						<GoThreeBars />
					</div>
					<div className='header__menu__left' ref={menuLeft}>
						<div className="header__menu__left__close" onClick={menuToggle}>
							<FiChevronLeft />
						</div>
						{
							navigateMain.map((item) => (
								<div
									key={item.idPath}
									className={`
										header__menu__item
										header__menu__left__item
										${item.idPath === activeNav ? 'active' : ''}
									`}
								>
									<Link to={item.path}>
										<span>{item.display}</span>
									</Link>
								</div>
							))
						}
					</div>
					<div className='header__menu__right'>
						<div className='header__menu__item '>
							<Link to='/cart'>
								<span className='header__menu__cart'>
									<AiOutlineShoppingCart />
									<span className='header__menu__cart-badge'>
										{totalQuantity}
									</span>
								</span>
							</Link>
						</div>
						<div className='header__menu__item '>
							<div className='header__menu__item-profile' onClick={toggleProfile} >
								{
									currentUser
										? <img
											className='header__menu__item__img-avatar'
											onClick={toggleProfile}
											src={currentUser.photoURL}
											alt="avartar" />
										: <span><BiUser /></span>
								}
								<div
									className='header__menu__item-profile__actions'
									ref={showProfileAction}
									onClick={toggleProfile}
								>
									{
										currentUser
											? (<span onClick={logout}>Logout</span>)
											: (
												<div>
													<span>
														<Link to='/login'>Login</Link>
													</span>
													<span>
														<Link to='/signup'>SignUp</Link>
													</span>
												</div>
											)
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header