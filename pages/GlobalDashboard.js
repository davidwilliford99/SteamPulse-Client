import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import './../app/globals.css';
import GameInfoCard from "@/components/GameInfoCard";
import FeaturedGames from "@/components/FeaturedGames";
import SimilarGames from "@/components/SimilarGames";


const GlobalDashboard = () => {

    const [appId, setAppId] = useState("");

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const id = query.get('appId') || '1938090';
        setAppId(id);
    }, []);

    const handleAppIdChange = (event) => {
        setAppId(event.target.value); 
    };

    const handleAppIdSubmit = (event) => {
        event.preventDefault();
        window.location.href = (`/GlobalDashboard?appId=${appId}`); 
    };

    return (
        <div className="font-source w-full">
            <Layout>
                <form onSubmit={handleAppIdSubmit} className="flex justify-center mb-5">
                    <input
                        type="text"
                        value={appId}
                        onChange={handleAppIdChange}
                        placeholder="Enter App ID"
                        className="border-2 border-neutral-700 bg-neutral-900 rounded py-2 px-4 mr-2"
                        required
                    />
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 transition text-white font-bold py-2 px-4 rounded">
                        Load Game
                    </button>
                </form>

                <div className="mb-5">
                    <GameInfoCard/>
                </div>

                <div className="flex justify-center gap-3">
                    <div className="mb-5">
                        <FeaturedGames/>
                    </div>

                    <div className="mb-5">
                        <SimilarGames/>
                    </div>
                </div>

            </Layout>
        </div>
    )
}

export default GlobalDashboard;
