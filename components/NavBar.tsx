import Link from 'next/link'
import React from 'react'
import { auth, signOut } from '@/auth'

const NavBar = async() => {
    const session = await auth();
    console.log('session = = = = = ==',session);
    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-end">
                <ul className="flex space-x-6">
                    {!session ? (
                        <>
                             <li>
                                <Link href="/auth/login" className="text-white hover:text-gray-300 font-semibold transition-colors duration-300">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/signup" className="text-white hover:text-gray-300 font-semibold transition-colors duration-300">
                                    SignUp
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                {session.user?.email}

                                <Link href="/auth/signup" 
                                    className="text-white hover:text-gray-300 font-semibold transition-colors duration-300"
                                >
                                    <form
                                        action={async () => {
                                           'use server';
                                            const res = await signOut();
                                            console.log('res = = =', res);
                                        }}
                                    >
                                        <button>
                                            Logout
                                        </button>

                                    </form>
                                </Link>
                            </li>
                        </>
                    )}
                   
                </ul>
            </div>
        </nav>
    )
}

export default NavBar