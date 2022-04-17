/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { RadioGroup, Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

const repos = [
	{
		name: 'Frontend Repo',
		link: 'https://github.com/gukanozadze/myclothe-front',
		linkLabel: 'github/gukanozadze/myclothe-front',
	},
	{
		name: 'Backend Repo',
		link: 'https://github.com/gukanozadze/myclothe-back',
		linkLabel: 'github/gukanozadze/myclothe-back',
	},
]

const GithubModal = ({ open, setOpen }: any) => {
	return (
		<Transition appear show={open} as={Fragment}>
			<Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={() => setOpen(false)}>
				<div className='min-h-screen px-4 text-center'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className='inline-block h-screen align-middle' aria-hidden='true'>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left sm:align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
							<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
								Selected Github Repo
							</Dialog.Title>
							<div className='mt-4'>
								<RadioGroup value onChange={() => null}>
									<RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
									<div className='space-y-2'>
										{repos.map(repo => (
											<RadioGroup.Option
												key={repo.name}
												value={repo}
												className={clsx(
													'transition relative text-gray-800 relative block bg-white rounded-lg border border-gray-300',
													'hover:text-white hover:border-transparent hover:bg-indigo-500 hover:ring-2 ring-indigo-500',
													'shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
												)}
											>
												<div className='flex items-center'>
													<div className='text-sm'>
														<RadioGroup.Label className='font-medium '>
															<a
																href={repo.link}
																target='_blank'
																rel='noreferrer'
															>
																<span
																	aria-hidden='true'
																	className='absolute inset-0'
																/>
																{repo.name}
															</a>
														</RadioGroup.Label>
														<RadioGroup.Description as='div'>
															<p className='sm:inline text-xs'>
																{repo.linkLabel}
															</p>
														</RadioGroup.Description>
													</div>
												</div>
											</RadioGroup.Option>
										))}
									</div>
								</RadioGroup>
							</div>

							<div className='mt-8'>
								<button
									type='button'
									className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
									onClick={() => setOpen(false)}
								>
									Got it, thanks!
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}
export default GithubModal
