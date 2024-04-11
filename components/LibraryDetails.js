import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LibraryDetails = () => {
    const [totalHours, setTotalHours] = useState();
    const [totalCost, setTotalCost] = useState();
    const [hoursPerWeek, setHoursPerWeek] = useState();
    const [isTotalCostLoading, setIsTotalCostLoading] = useState(true); // State to track loading of totalCost

    useEffect(() => {
        if (typeof window !== "undefined") {
            const steamId = localStorage.getItem("steamId");

            // Fetch total hours and average hours per week without affecting the loading state of totalCost
            axios.get(`http://localhost:5000/steam/api/total-hours?steamid=${steamId}`)
                .then(response => {
                    setTotalHours(response.data.total_hours_played);
                })
                .catch(error => {
                    console.error('Error fetching total hours:', error);
                });

            axios.get(`http://localhost:5000/steam/api/average-hours-per-week?steamid=${steamId}`)
                .then(response => {
                    setHoursPerWeek(response.data.average_hours_per_week);
                })
                .catch(error => {
                    console.error('Error fetching hours per week:', error);
                });

            // Fetch total library value separately to manage its loading state
            axios.get(`http://localhost:5000/steam/api/library-value?steamid=${steamId}`)
                .then(response => {
                    setTotalCost(response.data.total_library_value_usd);
                    setIsTotalCostLoading(false); // Set loading to false after fetching
                })
                .catch(error => {
                    console.error('Error fetching library value:', error);
                    setIsTotalCostLoading(false); // Consider handling loading state even on error
                });
        }
    }, []);

    return (
        <div className='h-full flex flex-col justify-center'>
            <div className='flex flex-col justify-center gap-3'>
                {/* Total Hours Played */}
                <div className='bg-black p-3 flex items-end justify-between gap-3 border border-neutral-400 rounded-xl'>
                    <p>Total Hours Played: </p>
                    <p className='text-3xl'>{totalHours}</p>
                </div>

                {/* Total Library Value with conditional loading animation */}
                <div className='bg-black p-3 flex items-end justify-between gap-3 border border-neutral-400 rounded-xl'>
                    <p>Total Library Value: </p>
                    {isTotalCostLoading ? (
                        <div>Loading...</div> // Placeholder for your loading animation
                    ) : (
                        <p className='text-3xl'>${totalCost}</p>
                    )}
                </div>

                {/* Average Hours per Week */}
                <div className='bg-black p-3 flex items-end justify-between gap-3 border border-neutral-400 rounded-xl'>
                    <p>Avg Hours/Week: </p>
                    {hoursPerWeek && <p className='text-3xl'>{hoursPerWeek.toFixed(2)}</p>}
                </div>
            </div>
        </div>
    );
};

export default LibraryDetails;
