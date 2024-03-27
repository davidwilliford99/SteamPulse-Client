import { React } from "react";
import Link from 'next/link';
import './../app/globals.css';

const SideNav = () => {
    return (
        <div className="min-h-screen w-64 bg-neutral-800 text-white flex flex-col">
            <div className="py-5 px-2 text-xl font-semibold border-b border-gray-600">SteamPulse</div>
            <ul className="flex flex-col py-5">
                <li className="mb-2">
                    <Link legacyBehavior href="/">
                        <a className="block p-2 hover:bg-neutral-700 rounded">Global Dashboard</a>
                    </Link>
                </li>
                <li className="mb-2">
                    <Link legacyBehavior href="/your-dashboard">
                        <a className="block p-2 hover:bg-neutral-700 rounded">Your Dashboard</a>
                    </Link>
                </li>
                <li className="mb-2">
                    <Link legacyBehavior href="/about-us">
                        <a className="block p-2 hover:bg-neutral-700 rounded">About Us</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideNav;