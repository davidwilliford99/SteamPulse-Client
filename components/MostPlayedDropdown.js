import { React, useState, useEffect } from "react";
import axios from "axios";
import './../app/globals.css';



const MostPlayedDropdown = () => {

    const [mostPlayed, setMostPlayed] = useState([]);


    // get most played
    useEffect(() => {
        if (typeof window !== "undefined") {
            const steamId = localStorage.getItem("steamId");
            axios.get(`http://localhost:5000/steam/api/most-played?steamid=${steamId}`)
                .then(response => {
                    setMostPlayed(response.data);
            })
                .catch(error => {
                    console.error('Error fetching Steam friends list:', error);
            });
        }
    }, []);


    // handling long titles
    const truncateTitle = (title, maxLength) => {
        return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
    };



    return (
        <div className="w-full h-full bg-neutral-800 rounded-md">
            <h1 className="text-center py-5 text-2xl">Most Played</h1>

            {/* Returning list of most played games */}
            <div className="h-96 overflow-y-scroll no-scrollbar bg-neutral-900">
                {
                    mostPlayed.map((game) => {
                        let playtime = Math.floor(game.playtime_forever / 60);
                        return (
                            <div key={game.appid} className="px-3">
                                <div className="flex justify-between">
                                    <div className="flex items-center p-2 my-2 gap-5">
                                        <img src={game.imageurl} className="h-6"/>
                                        <h1 className="text-md">{truncateTitle(game.title, 20)}</h1>
                                    </div>
                                    <p className="text-sm text-neutral-500 pr-3">{playtime} hours</p>
                                </div>
                                {/* <hr className="border-t border-neutral-500"/> */}
                            </div>
                        )
                    })
                }
                {/* <p className="py-3 cursor-pointer text-purple-500 text-center underline text-md">Load More</p> */}
            </div>

        </div>
    )
}

export default MostPlayedDropdown;