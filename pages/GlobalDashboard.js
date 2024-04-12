import React from "react";
import Layout from "@/components/Layout";
import './../app/globals.css';
import GameInfoCard from "@/components/GameInfoCard";

const GlobalDashboard = () => {
    return (
        <div className="font-source">
            <Layout>
                <div className="mb-5">
                    <GameInfoCard/>
                </div>
            </Layout>
        </div>
    )
}

export default GlobalDashboard;