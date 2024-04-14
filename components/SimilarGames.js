import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const SimilarGames = () => {
    const router = useRouter();

    const [genre, setGenre] = useState('');
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const appId = router.query.appId || '1938090';

    // Fetch game details to determine the genre
    useEffect(() => {
        const appId = router.query.appId || '1938090';
        const fetchGameDetails = async () => {
            setLoading(true); // Start loading
            setError(''); // Reset errors
            try {
                const response = await axios.get(`http://localhost:5000/steam/api/game-details?appid=${appId}`);
                const gameGenre = response.data.genre[0]; // Assuming the genre is stored like this
                console.log(response.data)
                setGenre(gameGenre.toLowerCase());
            } catch (error) {
                console.error('Error fetching game details:', error);
                setError('Failed to fetch game details');
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchGameDetails();
    }, [appId]);

    // Fetch similar games once the genre is set
    useEffect(() => {
        if (genre) { // Make sure genre is not empty
            setLoading(true); // Start loading
            const fetchSimilarGames = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/steam/api/apps-in-genre?genre=${encodeURIComponent(genre)}`);
                    setGames(response.data);
                } catch (error) {
                    console.error(`Error fetching games from genre ${genre}:`, error);
                    setError(`Failed to fetch games from genre ${genre}`);
                } finally {
                    setLoading(false); // End loading
                }
            };

            fetchSimilarGames();
        }
    }, [genre]);

    return (
        <div className='rounded-md bg-neutral-800'>
            <h1 className='p-5 text-2xl'>Similar Titles</h1>

            {loading && <div>Loading...</div>}

            {error && <p>{error}</p>}

            {!loading && games.length > 0 && !error &&
                <div className='bg-neutral-900 h-96 flex flex-col overflow-y-scroll no-scrollbar'>

                    {games.map((game) => {
                        const url = `/GlobalDashboard?appId=${game.steam_appid}`;
                        return (
                            <a key={game.steam_appid} href={url} className='flex flex-col justify-center gap-3 shrink-0 p-4'> 
                                <img src={game.images.header_image} alt={`Screenshot of ${game.title}`} className='h-2/3 w-auto'/>
                                <div>
                                    <h1 className='text-xl font-bold'>{game.title}</h1>
                                    <div className='flex gap-3 items-center'>
                                        <p className='text-lg text-green-500'>${game.base_price}</p>
                                    </div>
                                </div>
                            </a>
                        )
                    })}

                </div>
            }


        </div>
    );
};

export default SimilarGames;
