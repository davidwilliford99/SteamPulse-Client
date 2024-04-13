import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * 
 * TODO
 * 
 * Find a way to pass appId 
 * 
 */

const GameInfoCard = () => {

    const [gameData, setGameData] = useState();
    const [bgImg, setBgImg] = useState('');

    // Get current game data
    useEffect(() => {
        if (typeof window !== "undefined") {

            let appId = 0;
            if (!localStorage.getItem("appId")) {
                appId = "1938090"
            }
            else {
                appId = localStorage.getItem("appId");
            }


            axios.get(`http://localhost:5000/steam/api/game-details?appid=${appId}`)
                .then(response => {
                    setGameData(response.data)
                    setBgImg(response.data.images.background)
                    console.log(response.data);
                    
                    // setIsLoading(false); 
                })
                .catch(error => {
                    console.error('Error fetching game details:', error);
                     // setIsLoading(false); 
                });
        }
    }, []);


    // dynamically setting background image
    const backgroundStyle = {
        backgroundImage: `url(${bgImg})`
    };

    return (
        <div className="bg-neutral-800 rounded-md">

            {/* Top row */}
            <div className="p-5 title-section flex gap-3">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center">
                        {gameData && <h1 className="text-2xl">{gameData.title}</h1>}
                    </div>

                    {gameData && <p className='text-sm'>Released: {gameData.release_date}</p>}


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
                <div style={backgroundStyle} className='p-3 bg-cover bg-no-repeat bg-center'>
                    

                    {/* Second Row */}
                    <div className='flex items-start justify-between gap-5'>

                        <div>
                            <div className='flex items-end gap-5'>
                                <img src={gameData.images.header_image} className="h-32 mr-3"/>
                                <h1 className='text-3xl'>{gameData.title}</h1>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: gameData.pc_requirements }} className='my-2 text-xs'/>
                        </div>

                        <div className='bg-neutral-900 p-3 rounded-xl '>
                            {/* <p className='text-neutral-500'>{gameData.ratings.esrb.descriptors}</p> */}
                            <p>Rated {gameData.ratings.esrb.rating.toUpperCase()}</p>
                        </div>

                        <div className='bg-neutral-900 p-3 rounded-xl text-left'>
                            <h1 className='text-2xl'>Developers</h1>
                            {
                                gameData.developers.map((developer) => {
                                    return (
                                        <p className='text-sm py-1'>{developer}</p>
                                    )
                                })
                            }
                        </div>

                    </div>
                    


                    <div className='flex flex-wrap gap-3 mt-3'>
                    {
                        gameData.categories.map((category) => {
                            return (
                                <p className='text-sm px-3 py-1 rounded-xl bg-neutral-600'>{category.description}</p>
                            )
                        })
                    }
                    </div>




                </div>

            }



        </div>
    )
}

export default GameInfoCard