import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Component for displaying ...
 * ======================
 *  - Total Hours 
 *  - Avg hours per week
 *  - Library total Value
 */
const LibraryDetails = () => {

    const [totalHours, setTotalHours] = useState();
    const [totalCost, setTotalCost] = useState();
    const [hoursPerWeek, setHoursPerWeek] = useState();
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const steamId = localStorage.getItem("steamId");
            axios.get(`http://localhost:5000/steam/api/total-hours?steamid=${steamId}`)
                .then(response => {
                    setTotalHours(response.data.total_hours_played);
            })
                .catch(error => {
                    console.error('Error fetching total hours:', error);
            });

            axios.get(`http://localhost:5000/steam/api/library-value?steamid=${steamId}`)
            .then(response => {
                setTotalCost(response.data.total_library_value_usd);
            })
                .catch(error => {
                    console.error('Error fetching library value:', error);
            });

            axios.get(`http://localhost:5000/steam/api/average-hours-per-week?steamid=${steamId}`)
            .then(response => {
                setHoursPerWeek(response.data.average_hours_per_week);
            })
                .catch(error => {
                    console.error('Error fetching hours per week:', error);
            });

            setContentLoaded(true);
        }
    }, []);


    return (
        <div className='h-full flex flex-col justify-center'>
        {
            contentLoaded &&
            <div className='flex flex-col justify-center gap-3'>
                <div className='bg-black p-3 flex items-end gap-3 border border-neutral-400 rounded-xl'>
                    <p>Total Hours Played: </p>
                    <p className='text-3xl'>{totalHours}</p>
                </div>
                <div className='bg-black p-3 flex items-end gap-3 border border-neutral-400 rounded-xl'>
                    <p>Total Library Value: </p>
                    <p className='text-3xl'>${totalCost}</p>
                </div>
                <div className='bg-black p-3 flex items-end gap-3 border border-neutral-400 rounded-xl'>
                    <p>Avg Hours/Week: </p>
                    {hoursPerWeek &&
                        <p className='text-3xl'>{hoursPerWeek.toFixed(2)}</p>
                    }
                </div>
            </div>
        }
        </div>


    )
}

export default LibraryDetails;