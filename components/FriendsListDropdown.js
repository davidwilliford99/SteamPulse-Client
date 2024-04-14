import { React, useState, useEffect } from "react";
import axios from "axios";
import './../app/globals.css';

const FriendsListDropdown = () => {
    const [friendsList, setFriendsList] = useState([]);
    const [amount, setAmount] = useState(10);
    const [isLoading, setIsLoading] = useState(true); // State for initial loading
    const [isMoreLoading, setIsMoreLoading] = useState(false); // State for loading more friends

    // when user wants to load more friends
    const loadMore = () => {
        setIsMoreLoading(true); // Start loading more friends
        const steamId = localStorage.getItem("steamId");
        const newAmount = amount + 10;
        setAmount(newAmount); // Update the amount state to request more friends

        axios.get(`http://localhost:5000/steam/api/friends?steamid=${steamId}&amount=${newAmount}`)
            .then(response => {
                setFriendsList(response.data); // Replace the current list with the new list
                setIsMoreLoading(false); // End loading more friends
            })
            .catch(error => {
                console.error('Error fetching Steam friends list:', error);
                setIsMoreLoading(false); // Ensure loading state is reset on error
            });
    }

    // get friends list
    useEffect(() => {
        if (typeof window !== "undefined") {
            const steamId = localStorage.getItem("steamId");
            axios.get(`http://localhost:5000/steam/api/friends?steamid=${steamId}&amount=${amount}`)
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
        <div className="w-full h-full bg-neutral-800 rounded-md">
            <h1 className="text-center py-5 text-2xl">Your Friends List</h1>
            <div className="h-96 overflow-y-scroll no-scrollbar bg-neutral-900">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        Loading...
                    </div>
                ) : (
                    friendsList.map((friend) => (
                        <div key={friend.steamid} className="flex justify-between px-3">
                            <div className="flex items-center p-2 my-2 gap-5">
                                <img src={friend.avatarmedium} alt="avatar" className="h-8"/>
                                <h1 className="text-xl">{friend.personaname}</h1>
                            </div>
                            <p className="text-sm text-neutral-500 pr-3">{friend.realname}</p>
                        </div>
                    ))
                )}
                {!isLoading && (
                    <div className="text-center">
                        {isMoreLoading ? (
                            <div>Loading more...</div> // Placeholder for actual loading animation
                        ) : (
                            <p onClick={loadMore} className="py-3 cursor-pointer text-purple-500 underline text-md">Load More</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FriendsListDropdown;
