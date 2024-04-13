import React from "react";
import Layout from "@/components/Layout";
import './../app/globals.css';
import GameInfoCard from "@/components/GameInfoCard";
import FeaturedGames from "@/components/FeaturedGames";
import SimilarGames from "@/components/SimilarGames";

const GlobalDashboard = () => {
    return (
        <div className="font-source w-full">
            <Layout>

                <div className="mb-5">
                    <GameInfoCard/>
                </div>

                <div className="flex gap-3 w-full">
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