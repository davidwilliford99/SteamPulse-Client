import React, { useState, useEffect, useRef } from 'react';
import './../app/globals.css';
import axios from 'axios';

const FeaturedGames = () => {
    const [featured, setFeatured] = useState();

    useEffect(() => {
        if (typeof window !== "undefined") {
            axios.get(`http://localhost:5000/steam/api/featured-games`)
                .then(response => {
                    setFeatured(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching featured games:', error);
                });
        }
    }, []);


    return (
        <div className='bg-neutral-800 overflow-x-hidden rounded-md'>

            <h1 className='p-5 text-2xl'>Featured Games</h1>

            <div className='bg-neutral-900 flex items-center'>

                <div className='flex flex-col h-96 overflow-y-scroll no-scrollbar'>
                    {featured &&
                        featured.map((game) => {
                            const url = `/GlobalDashboard?appId=${game.id}`;
                            return (
                                <a key={game.id} className='flex items-center gap-3 shrink-0 p-4' href={url}>
                                    <img src={game.header_image} alt={game.name} className="h-2/3"/>
                                    <div>
                                        <h1 className='text-xl font-bold'>{game.name}</h1>
                                        <div className='flex gap-3 items-center'>
                                            <p className='text-lg text-green-500'>${game.final_price / 100}</p>
                                            {game.discount_percent && <p className='text-red-500'>-{game.discount_percent}%</p>}
                                        </div>
                                    </div>

                                </a>
                            );
                        })
                    }
                </div>

            </div>

        </div>

    );
}

export default FeaturedGames;
