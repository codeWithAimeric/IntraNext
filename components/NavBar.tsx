import Link from 'next/link'
import React from 'react'
import { auth, signOut } from '@/auth'
import LogoutButton from './LogoutButton';

const NavBar = async () => {
    const session = await auth();
    console.log('session = = = = = ==', session);
    return (
        <nav className="bg-gray-800 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between">
                <div className="flex space-x-4">
                    <a href="/" className="text-white font-semibold hover:text-gray-300 transition-colors">Home</a>
                </div>
                <ul className="flex space-x-6">
                    {!session?.user ? (
                        <>
                            <li>
                                <Link href="/auth/login" className="text-white hover:text-gray-300 font-semibold transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/signup" className="text-white hover:text-gray-300 font-semibold transition-colors">
                                    SignUp
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <span className="text-white text-sm">{session?.user?.email}</span>
                                <LogoutButton />
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>

    )
}

export default NavBar