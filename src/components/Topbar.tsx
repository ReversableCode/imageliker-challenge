/* eslint-disable @next/next/no-img-element */
import { Disclosure, Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';

import { useUI } from '@/contexts/ui.context';

const NAVIGATION_ITEMS = [
  { name: 'Parcourir', href: '/' },
  { name: 'Images aimées', href: '/liked' },
];

export default function Topbar() {
  const { unauthorize } = useUI();
  const router = useRouter();

  function handleLogout() {
    unauthorize();
    router.replace('/auth/login');
  }

  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <IoClose className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <IoMenu className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <img
                    className='block h-8 w-auto lg:hidden'
                    src='/images/logo.png'
                    alt='ImageLiker'
                  />
                  <div className='hidden h-8 w-auto flex-row items-center gap-2 lg:flex'>
                    <img
                      className='h-8 w-auto'
                      src='/images/logo.png'
                      alt='ImageLiker'
                    />
                    <h1 className='text-lg font-bold leading-none tracking-wide text-gray-900'>
                      ImageLiker
                    </h1>
                  </div>
                </div>
                <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                  {NAVIGATION_ITEMS.map(({ name, href }) => (
                    <Link key={name + '-desktop'} href={href}>
                      <a
                        className={clsx(
                          'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-semibold tracking-wide transition-all duration-300',
                          router.pathname === href
                            ? 'border-gray-900 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                        )}
                      >
                        {name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='flex rounded-full border-2 border-gray-400 bg-white text-sm focus:outline-none'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-10 w-10 rounded-full bg-center object-cover shadow-sm'
                        src='https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png'
                        alt='Profile image'
                        style={{ minWidth: '2rem', minHeight: '2rem' }}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type='button'
                            className={clsx(
                              active ? 'bg-gray-100' : '',
                              'block w-full px-4 py-2 text-left text-sm font-semibold text-gray-700'
                            )}
                            onClick={handleLogout}
                          >
                            Se déconnecter
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 pt-2 pb-4'>
              {NAVIGATION_ITEMS.map(({ name, href }) => (
                <Disclosure.Button
                  key={name + '-mobile'}
                  as='a'
                  href={href}
                  className={clsx(
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-all duration-300',
                    router.pathname === href
                      ? 'border-gray-900 bg-gray-50 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  )}
                >
                  {name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
