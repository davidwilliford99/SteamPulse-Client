import { React, useState, useEffect } from "react";
import axios from "axios";
import './../app/globals.css';



const FriendsListDropdown = () => {

    const [friendsList, setFriendsList] = useState([]);
    const [amount, setAmount] = useState(10);

    // when user wants to load more friends
    const loadMore = () => {
        const steamId = localStorage.getItem("steamId");
        setAmount(prevAmount => prevAmount + 10);
        axios.get(`http://localhost:5000/steam/api/friends?steamid=${steamId}&amount=${amount}`)
            .then(response => {
                console.log(response.data);
                setFriendsList(response.data);
        })
            .catch(error => {
                console.error('Error fetching Steam friends list:', error);
        });
    }

    // get friends list
    useEffect(() => {
        if (typeof window !== "undefined") {
            const steamId = localStorage.getItem("steamId");
            axios.get(`http://localhost:5000/steam/api/friends?steamid=${steamId}`)
                .then(response => {
                    setFriendsList(response.data);
            })
                .catch(error => {
                    console.error('Error fetching Steam friends list:', error);
            });
        }
    }, []);


    return (
        <div className="w-full h-full bg-neutral-800 rounded-md">
            <h1 className="text-center py-5 text-2xl">Your Friends</h1>
            <hr className="border-1 border-neutral-300"/>

            {/* Returning list of friends */}
            <div className="h-96 overflow-y-scroll no-scrollbar">
                {
                    friendsList.map((friend) => {
                        return (
                            <div key={friend.steamid}>
                                <div className="flex justify-between">
                                    <div className="flex items-center p-2 my-2 gap-5">
                                        <img src={friend.avatarmedium} className="h-8"/>
                                        <h1 className="text-xl">{friend.personaname}</h1>
                                    </div>
                                    <p className="text-sm text-neutral-500 pr-3">{friend.realname}</p>
                                </div>

                                <hr className="border-t border-neutral-700"/>
                            </div>
                        )
                    })
                }
                <p onClick={loadMore} className="py-3 cursor-pointer text-purple-500 text-center underline text-md">Load More</p>
            </div>

        </div>
    )
}

export default FriendsListDropdown;