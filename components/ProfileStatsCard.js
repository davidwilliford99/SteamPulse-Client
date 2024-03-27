/**
 * This component is for the user info card 
 * If user is signed in, steam ID will be stored in local storage
 * Steam ID will be used for requests
 */

import { React, useState, useEffect } from "react";
import './../app/globals.css';


const ProfileStatsCard = ({ userData }) => {
     
    return (
        <div className="bg-neutral-800 p-5 rounded-md">
            <div className="title-section flex">
                <div className="flex items-center">
                    <img src={userData.avatarmedium} className="mr-3"/>
                    <h1 className="text-3xl">{userData.personaname}</h1>
                </div>
            </div>
        </div>
    )
}

export default ProfileStatsCard;