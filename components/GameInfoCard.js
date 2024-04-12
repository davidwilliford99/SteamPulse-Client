import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * 
 * TODO
 * 
 * Find a way to pass appId 
 * 
 */

const GameInfoCard = ({  }) => { 

    // Get current game data
    useEffect(() => {
        if (typeof window !== "undefined") {
            const steamId = localStorage.getItem("steamId");
            axios.get(`localhost:5000/steam/api/game-details?appid=${appId}`)
                .then(response => {
                    setFriendsList(response.data);
                    setIsLoading(false); // Data has been loaded
                })
                .catch(error => {
                    console.error('Error fetching Steam friends list:', error);
                    setIsLoading(false); // Handle loading state even on error
                });
        }
    }, []);



    return (
        <div className="bg-neutral-800 rounded-md">

            {/* Top row */}
            <div className="p-5 title-section flex gap-3">
                <div className="w-full flex items-center justify-between gap-3">
                    <div className="flex items-center">
                        <img src='/loading.gif' className="h-12 mr-3"/>
                        <h1 className="text-2xl">Game Name</h1>
                    </div>

                    <p className="text-neutral-300 text-lg font-semibold"></p>
                    <a href='/' className=" flex gap-2 items-center bg-purple-700 p-2 rounded-xl text-sm text-neutral-300">
                        <img src="/steam-logo.png" className="h-5"/>
                        <p>Profile</p>
                    </a>

                </div>  
            </div>


        </div>
    )
}

export default GameInfoCard