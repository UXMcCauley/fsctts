import {Fragment} from 'react'
import {signOut} from "next-auth/react"
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import {useRouter} from "next/router";

const navigation = [
    {name: 'Dashboard', href: '/', current: true},
    {name: 'Dreams', href: '/dreams', current: false},
    {name: 'Life Area Surveys', href: '/life-area-surveys', current: false},
    // {name: 'Map of My Dreams', href: '/map-of-my-dreams', current: false},
    {name: 'Care Plans', href: '/care-plans', current: false},
]
const userNavigation = [
    {name: 'Your Profile', href: '/profile'},
    {name: 'Settings', href: '/settings'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({children, title, session, loadingState}) {
    const router = useRouter()
    return (
        <>
            <div
                className={`fixed w-full h-full bg-gray-600 bg-opacity-50 flex align-middle justify-center ${loadingState ? "visible" : "hidden"}`}>
                <div className={"uppercase text-white self-center rounded-full p-5 bg-orange-600 shadow"}>loading...
                </div>
            </div>
            <div className="min-h-full">
                <div className="bg-gradient-to-r from-orange-600 to-orange-400 pb-32 print:hidden">
                    <Disclosure as="nav" className="bg-gradient-to-r from-orange-600 to-orange-400">
                        {({open}) => (
                            <>
                                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                    <div className="border-b border-orange-400">
                                        <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="w-[90px]"
                                                        src="/img/TTS_Logo2_vertical.png"
                                                        alt="Workflow"
                                                    />
                                                </div>
                                                <div className="hidden md:block">
                                                    <div className="ml-10 flex items-baseline space-x-4">
                                                        {navigation.map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href={item.href}
                                                                className={classNames(
                                                                    router.pathname === item.href
                                                                        ? 'bg-orange-700 text-white'
                                                                        : 'text-white hover:bg-orange-400 hover:text-white',
                                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                                )}
                                                                aria-current={item.current ? 'page' : undefined}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        ))}
                                                        <a
                                                            href={"/users"}
                                                            className={classNames(
                                                                router.pathname === "/users"
                                                                    ? 'bg-orange-700 text-white'
                                                                    : 'text-white hover:bg-orange-400 hover:text-white',
                                                                'px-3 py-2 rounded-md text-sm font-medium'
                                                            )}
                                                            aria-current={router.pathname === "/users" ? 'page' : undefined}
                                                        >
                                                            My Clients
                                                        </a>
                                                        <a
                                                            href={"/directory"}
                                                            className={classNames(
                                                                router.pathname === "/directory"
                                                                    ? 'bg-orange-700 text-white'
                                                                    : 'text-white hover:bg-orange-400 hover:text-white',
                                                                'px-3 py-2 rounded-md text-sm font-medium'
                                                            )}
                                                            aria-current={router.pathname === "/directory" ? 'page' : undefined}
                                                        >
                                                            Directory
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-4 flex items-center md:ml-6">
                                                    {/*<button*/}
                                                    {/*    type="button"*/}
                                                    {/*    className="bg-orange-500 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-orange-200 focus:ring-white"*/}
                                                    {/*>*/}
                                                    {/*    <span className="sr-only">View notifications</span>*/}
                                                    {/*    <BellIcon className="h-6 w-6" aria-hidden="true"/>*/}
                                                    {/*</button>*/}

                                                    {/* Profile dropdown */}
                                                    <Menu as="div" className="ml-3 relative">
                                                        <div>
                                                            <Menu.Button
                                                                className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                                <span className="sr-only">Open user menu</span>
                                                                <img className="h-8 w-8 rounded-full"
                                                                     src={session.image} alt=""/>
                                                            </Menu.Button>
                                                        </div>
                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items
                                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                {userNavigation.map((item) => (
                                                                    <Menu.Item key={item.name}>
                                                                        {({active}) => (
                                                                            <a
                                                                                href={item.href}
                                                                                className={classNames(
                                                                                    active ? 'bg-gray-100' : '',
                                                                                    'block px-4 py-2 text-sm text-white'
                                                                                )}
                                                                            >
                                                                                {item.name}
                                                                            </a>
                                                                        )}
                                                                    </Menu.Item>
                                                                ))}
                                                                <Menu.Item>
                                                                    {({active}) => (
                                                                        <a
                                                                            onClick={() => {
                                                                                signOut()
                                                                                    .then(() => {
                                                                                        router.reload()
                                                                                    })
                                                                            }}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                                            )}
                                                                        >
                                                                            Sign Out
                                                                        </a>
                                                                    )}
                                                                </Menu.Item>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </div>
                                            </div>
                                            <div className="-mr-2 flex md:hidden">
                                                {/* Mobile menu button */}
                                                <Disclosure.Button
                                                    className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">Open main menu</span>
                                                    {open ? (
                                                        <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                                    ) : (
                                                        <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                                    )}
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                                    <div className="px-2 py-3 space-y-1 sm:px-3">
                                        {navigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className={classNames(
                                                    router.pathname === item.href ? 'bg-orange-700 text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                                                    'block px-3 py-2 rounded-md text-base font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                    <div className="pt-4 pb-3 border-t border-gray-700">
                                        <div className="flex items-center px-5">
                                            <div className="flex-shrink-0">
                                                <img className="h-10 w-10 rounded-full" src={session.image} alt=""/>
                                            </div>
                                            <div className="ml-3">
                                                <div
                                                    className="text-base font-medium leading-none text-white">{session.name}</div>
                                                <div
                                                    className="text-sm font-medium leading-none text-white">{session.email}</div>
                                            </div>
                                            {/*<button*/}
                                            {/*    type="button"*/}
                                            {/*    className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"*/}
                                            {/*>*/}
                                            {/*    <span className="sr-only">View notifications</span>*/}
                                            {/*    <BellIcon className="h-6 w-6" aria-hidden="true"/>*/}
                                            {/*</button>*/}
                                        </div>
                                        <div className="mt-3 px-2 space-y-1">
                                            {userNavigation.map((item) => (
                                                <Disclosure.Button
                                                    key={item.name}
                                                    as="a"
                                                    href={item.href}
                                                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                                                >
                                                    {item.name}
                                                </Disclosure.Button>
                                            ))}
                                            <Disclosure.Button
                                                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                                                onClick={() => {
                                                    signOut()
                                                        .then(() => {
                                                            router.reload()
                                                        })
                                                }}
                                            >
                                                Sign Out
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                    <header className="py-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-light text-white font-serif">{title}</h1>
                        </div>
                    </header>
                </div>

                <main className="-mt-32 print:mt-0">
                    <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                            {children}
                        </div>

                    </div>
                </main>
            </div>
        </>
    )
}
