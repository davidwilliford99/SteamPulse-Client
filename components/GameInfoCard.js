import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const GameInfoCard = () => {
    const router = useRouter(); // Using the useRouter hook to get access to the router object
    const [gameData, setGameData] = useState();
    const [bgImg, setBgImg] = useState('');

    useEffect(() => {
        const appId = router.query.appId || '1938090'; // Accessing the appId from URL parameters or using a default

        const fetchGameData = (appId) => {
            axios.get(`http://localhost:5000/steam/api/game-details?appid=${appId}`)
                .then(response => {
                    setGameData(response.data);
                    setBgImg(response.data.images.background);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching game details:', error);
                });
        };

        if (appId) {
            fetchGameData(appId);
        }
    }, [router.query.appId]); // Depend on router.query.appId to refetch data when it changes

    // Dynamically setting background image
    const backgroundStyle = {
        backgroundImage: `url(${bgImg})`
    };

    return (
        <div className="bg-neutral-800 rounded-md">
            {/* Top row */}
            <div className="p-5 title-section flex gap-3">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center text-2xl">
                         Currently Selected Game
                    </div>

                    <div className='flex gap-3'>
                        <a href='/' className="flex gap-2 items-center bg-green-700 p-2 rounded-xl text-sm text-neutral-300">
                            <img src="/steam-logo.png" className="h-5"/>
                            <p>Purchase</p>
                        </a>

                        <a href='/' className="flex gap-2 items-center bg-red-800 p-2 rounded-xl text-sm text-neutral-300">
                            <img src="/youtube-logo.png" className="h-5"/>
                            <p>Videos</p>
                        </a>
                    </div>
                </div>  
            </div>

            {/* Lower part of component */}
            {gameData && 
                <div style={backgroundStyle} className='overflow-hidden p-3 bg-cover bg-no-repeat bg-center'>
                    {/* Second Row */}
                    <div className='flex items-start justify-between gap-5'>

                        <div>
                            <div className='flex items-end gap-5'>
                                <img src={gameData.images.header_image} className="h-32 mr-3"/>
                                <h1 className='text-3xl'>{gameData.title}</h1>
                                <div>
                                    <p className='text-green-500'>${gameData.base_price}</p>
                                    <p className='text-sm text-neutral-400'>Released: {gameData.release_date}</p>
                                </div>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: gameData.pc_requirements }} className='my-2 text-xs text-neutral-300'/>
                        </div>

                        {
                            gameData.ratings.esrb &&
                            <div className='bg-neutral-900 p-3 rounded-xl '>
                                <p>Rated {gameData.ratings.esrb.rating.toUpperCase()}</p>
                            </div>
                        }

                        <div className='bg-neutral-900 p-3 rounded-xl text-left'>
                            <h1 className='text-2xl'>Developers</h1>
                            {gameData.developers.map((developer) => (
                                <p className='text-sm py-1'>{developer}</p>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-3 mt-3'>
                    {gameData.categories.map((category) => (
                        <p className='text-sm px-3 py-1 rounded-xl bg-neutral-600'>{category.description}</p>
                    ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default GameInfoCard;
