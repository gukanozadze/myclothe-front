import React, { Fragment, useState } from 'react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import axios from 'axios'
import { shared, navigation, user } from '../shared/shared'
import { NavLink, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { resetUserState, selectCurrentUser } from '../features/user/user-slice'
import { resetProductState } from '../features/product/product-slice'

const Header = () => {
	const [open, setOpen] = useState(false)
	const currentUser = useAppSelector(selectCurrentUser)
	const dispatch = useAppDispatch()
	return (
		<div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
			<div className='border-b border-gray-700'>
				<div className='flex items-center justify-between h-16 px-4 sm:px-0'>
					<div className='flex items-center'>
						<div className='flex-shrink-0'>
							<Link to='/'>
								<img
									className='h-8 w-8'
									src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
									alt='Workflow'
								/>
							</Link>
						</div>
						<div className='hidden md:block'>
							<div className='ml-10 flex items-baseline space-x-4'>
								{navigation.map(item => {
									if (!currentUser?.is_manager && item.admin) {
										return null
									}
									return (
										<NavLink
											key={item.name}
											to={item.to}
											className={({ isActive }) =>
												shared(
													isActive
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'px-3 py-2 rounded-md text-sm font-medium'
												)
											}
										>
											{item.name}
										</NavLink>
									)
								})}
							</div>
						</div>
					</div>
					<div className='hidden md:block'>
						<div className='ml-4 flex items-center md:ml-6'>
							{/* Profile dropdown */}
							<Menu as='div' className='ml-3 relative'>
								<div>
									<Menu.Button className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
										<span className='sr-only'>Open user menu</span>
										<img className='h-8 w-8 rounded-full' src={user.imageUrl} alt='' />
									</Menu.Button>
								</div>
								<Transition
									as={Fragment}
									enter='transition ease-out duration-100'
									enterFrom='transform opacity-0 scale-95'
									enterTo='transform opacity-100 scale-100'
									leave='transition ease-in duration-75'
									leaveFrom='transform opacity-100 scale-100'
									leaveTo='transform opacity-0 scale-95'
								>
									<Menu.Items className='origin-top-right absolute right-0 mt-2 w-36 h-8 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
										<Menu.Item>
											<div>
												<Link
													to='/login'
													className='p-4'
													onClick={async () => {
														dispatch(resetProductState())
														dispatch(resetUserState())
														localStorage.removeItem('user')

														await axios.get('/logout')
													}}
												>
													Sign Out
												</Link>
											</div>
										</Menu.Item>
									</Menu.Items>
								</Transition>
							</Menu>
						</div>
					</div>
					<div className='-mr-2 flex md:hidden'>
						{/* Mobile menu button */}
						<Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
							<span className='sr-only'>Open main menu</span>
							{open ? (
								<XIcon
									onClick={() => setOpen(!open)}
									className='block h-6 w-6'
									aria-hidden='true'
								/>
							) : (
								<MenuIcon
									onClick={() => setOpen(!open)}
									className='block h-6 w-6'
									aria-hidden='true'
								/>
							)}
						</Disclosure.Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
