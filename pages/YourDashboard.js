import { React, useEffect, useState } from "react";
import './../app/globals.css';
import ProfileStatsCard from "@/components/ProfileStatsCard";
import MostPlayedDropdown from "@/components/MostPlayedDropdown";
import Layout from '@/components/Layout';
import axios from "axios";
import FriendsListDropdown from "@/components/FriendsListDropdown";
import SteamLogo from '../public/steam-logo.png';

const YourDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [steamId, setSteamId] = useState(null);

    // Check if steamId is available in local storage and fetch user data
    useEffect(() => {
        const localSteamId = localStorage.getItem("steamId");
        if (localSteamId) {
            setSteamId(localSteamId);
            fetchUserData(localSteamId);
        }
    }, []);

    const fetchUserData = (steamId) => {
        axios.get(`http://localhost:5000/steam/api/user?steamid=${steamId}`)
            .then(response => {
                setUserData(response.data.response.players[0]);
            })
            .catch(error => {
                console.error('Error fetching Steam user data:', error);
            });
    };

    const handleSteamIdSubmit = (event) => {
        event.preventDefault();
        const newSteamId = event.target.elements.steamIdInput.value;
        localStorage.setItem("steamId", newSteamId);
        setSteamId(newSteamId);
        fetchUserData(newSteamId);
    };

    return (
        <div className="font-source">
            <Layout>
                {steamId ? (
                    userData ? (
                        <div>
                            <div className="mb-5">
                                <h1 className="mb-5 text-neutral-300">Welcome, 
                                    <span className="font-vt">{userData.personaname}!</span>
                                </h1>
                                <ProfileStatsCard userData={userData}/>
                            </div>
                            <div className="flex gap-5 justify-center">
                                <MostPlayedDropdown/>
                                <FriendsListDropdown/>
                            </div>
                        </div>
                    ) : (
                        <div>Loading user data...</div>
                    )
                ) : (
                    <form onSubmit={handleSteamIdSubmit} className="flex flex-col items-center justify-center">
                        <label htmlFor="steamIdInput" className="mb-6 text-neutral-300 text-3xl">Enter your Steam ID:</label>
                        <input id="steamIdInput" name="steamIdInput" type="text" required className="mb-4 text-black p-2 rounded border-2 border-neutral-300"/>

                        <div className="my-5">
                            <p className="text-center">Your steam id is a long integer value, that can be found in your steam profile settings</p>
                            <p className="text-center">To get this to work properly, please go to your settings and enable your account information to be public. Otherwise, this application will not function properly for you</p>
                        </div>

                        <button type="submit" className="bg-purple-500 hover:bg-purple-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    </form>
                )}
            </Layout>
        </div>
    );
}

export default YourDashboard;
