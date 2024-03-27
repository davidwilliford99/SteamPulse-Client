import { React, useEffect, useState } from "react";
import './../app/globals.css';
import ProfileStatsCard from "@/components/ProfileStatsCard";
import SortedDropdown from "@/components/SortedDropdown";
import RecommendedDropdown from "@/components/RecommendedDropdown";
import Layout from '@/components/Layout';
import axios from "axios";


const YourDashboard = () => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const steamId = localStorage.getItem("steamId");
            axios.get(`http://localhost:5000/steam/api/user?steamid=${steamId}`)
                .then(response => {
                    console.log(response.data);
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

            <div>
                <h1 className="mb-5">Welcome, {userData.personaname}!</h1>
                <ProfileStatsCard userData={userData}/>
            </div>
            <div className="flex gap-5 justify-center">
                <SortedDropdown/>
                <RecommendedDropdown/>
            </div>

        </Layout>
    )
}

export default YourDashboard;