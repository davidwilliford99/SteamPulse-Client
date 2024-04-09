import { React, useEffect, useState } from "react";
import './../app/globals.css';
import ProfileStatsCard from "@/components/ProfileStatsCard";
import RecommendedDropdown from "@/components/RecommendedDropdown";
import Layout from '@/components/Layout';
import axios from "axios";
import FriendsListDropdown from "@/components/FriendsListDropdown";
import SteamLogo from '../public/steam-logo.png';


const YourDashboard = () => {

    const [userData, setUserData] = useState(null);
    const [friendsList, setFriendsList] = useState(null);
    const [steamId, setSteamId] = useState(null);

    // get info on user account 
    useEffect(() => {
        if (typeof window !== "undefined") {
            const steamId = localStorage.getItem("steamId");
            setSteamId(steamId)
            axios.get(`http://localhost:5000/steam/api/user?steamid=${steamId}`)
                .then(response => {
                    setUserData(response.data.response.players[0]);
            })
                .catch(error => {
                    console.error('Error fetching Steam user data:', error);
            });
        }
    }, []);


    if (!userData) {
        return <div>Loading user data...</div>;
    }



    return (
        <Layout>

            <div className="mb-5">
                <h1 className="mb-5">Welcome, {userData.personaname}!</h1>
                <ProfileStatsCard userData={userData}/>
            </div>
            <div className="flex gap-5 justify-center">
                <RecommendedDropdown/>
                <FriendsListDropdown/>
            </div>

        </Layout>
    )
}

export default YourDashboard;