import { React } from "react";
import Link from 'next/link';
import './../app/globals.css';

const SideNav = () => {
    return (
        <div className="min-h-screen w-56 bg-neutral-900 text-white flex flex-col">
            <div className="py-5 px-2 text-xl font-semibold border-b bg-neutral-900 border-gray-600">SteamPulse</div>
            <ul className="flex flex-col py-5">
            <li className="mb-2 pl-3 flex items-center hover:bg-neutral-700 rounded-sm">
                    <img src='/global.svg' className="h-6"/>
                    <Link legacyBehavior href="/GlobalDashboard">
                        <a className="block p-2 text-neutral-300">Store Dashboard</a>
                    </Link>
                </li>
                <li className="mb-2 pl-3 flex items-center hover:bg-neutral-700 rounded-sm">
                    <img src='/profile.svg' className="h-6"/>
                    <Link legacyBehavior href="/YourDashboard">
                        <a className="block p-2 text-neutral-300">Account Dashboard</a>
                    </Link>
                </li>
                <li className="mb-2 pl-3 flex items-center hover:bg-neutral-700 rounded-sm">
                    <img src='/chart.svg' className="h-6"/>
                    <Link legacyBehavior href="/AboutUs">
                        <a className="block p-2 text-neutral-300">About Us</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideNav;