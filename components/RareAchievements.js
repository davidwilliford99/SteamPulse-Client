import React, { useState, useEffect } from 'react';
import './../app/globals.css';
import axios from 'axios';

const RareAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add a state to track loading status

    useEffect(() => {
        const steamId = localStorage.getItem('steamId');
        if (steamId) {
            axios.get(`http://localhost:5000/steam/api/rare-achievements?steamid=${steamId}`)
                .then(response => {
                    setAchievements(response.data);
                    setIsLoading(false); // Data has been loaded
                })
                .catch(error => {
                    console.error('Error fetching rare achievements:', error);
                    setIsLoading(false); // Handle loading state even in case of an error
                });
        }
    }, []);

    return (
        <div className='rounded-md border border-neutral-800 overflow-hidden m-4'>
            <h2 className="text-lg text-center p-2 bg-neutral-800">Your Rarest Achievements</h2>
            <div className="h-48 overflow-y-scroll no-scrollbar flex flex-col gap-3">
                {isLoading ? (
                    // Show loading animation or message here
                    <div className="flex justify-center items-center h-full">
                        <img src='/loading.gif' className='h-40'/> {/* Replace this with your actual loading animation */}
                    </div>
                ) : (
                    achievements.map((achievement, index) => (
                        <div key={index} className="bg-black text-md p-3">
                            <p className='flex gap-3'>
                                <span className='text-purple-500'>Game:</span> 
                                {achievement.game}
                            </p>
                            <p className='flex gap-3 text-yellow-500'>
                                <span className='text-purple-500'>Achievement:</span> 
                                {
                                    achievement.achievement.length > 30 
                                        ? `${achievement.achievement.substring(0, 30)}...` 
                                        : achievement.achievement
                                }
                            </p>
                            <p className='flex gap-3'>
                                <span className='text-purple-500'>Rarity</span> 
                                {achievement.rarity.toFixed(2)}%
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RareAchievements;
