import React from 'react'
import { Disclosure } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import Header from './Header'
import { navigation, shared, user } from '../shared/shared'
import { Link } from 'react-router-dom'

const Nav = () => {
	return (
		<Disclosure as='nav' className='bg-gray-800'>
			<Header />

			<Disclosure.Panel className='border-b border-gray-700 md:hidden'>
				<div className='px-2 py-3 space-y-1 sm:px-3'>
					{/* {navigation.map(item => (
						<Disclosure.Button
							key={item.name}
							as='a'
							className={shared(
								item.current
									? 'bg-gray-900 text-white'
									: 'text-gray-300 hover:bg-gray-700 hover:text-white',
								'block px-3 py-2 rounded-md text-base font-medium'
							)}
							aria-current={item.current ? 'page' : undefined}
						>
							<Link to={item.to}>{item.name}</Link>
						</Disclosure.Button>
					))} */}
				</div>
				<div className='pt-4 pb-3 border-t border-gray-700'>
					<div className='flex items-center px-5'>
						<div className='flex-shrink-0'>
							<img className='h-10 w-10 rounded-full' src={user.imageUrl} alt='' />
						</div>
						<div className='ml-3'>
							<div className='text-base font-medium leading-none text-white'>{user.name}</div>
							<div className='text-sm font-medium leading-none text-gray-400'>{user.email}</div>
						</div>
						<button
							type='button'
							className='ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
						>
							<span className='sr-only'>View notifications</span>
							<BellIcon className='h-6 w-6' aria-hidden='true' />
						</button>
					</div>
					{/* <div className="mt-3 px-2 space-y-1">
                                {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div> */}
				</div>
			</Disclosure.Panel>
		</Disclosure>
	)
}

export default Nav
