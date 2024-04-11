/**
 * This component is for the user info card 
 * If user is signed in, steam ID will be stored in local storage
 * Steam ID will be used for requests
 */

import { React, useState, useEffect } from "react";
import './../app/globals.css';
import GenrePieChart from "./GenrePieChart";
import LibraryDetails from "./LibraryDetails";
import RareAchievements from "./RareAchievements";


const ProfileStatsCard = ({ userData }) => {

    // Dealing with Date
    const timeCreated = userData.timecreated;
    let dateCreated = new Date(timeCreated * 1000);
    var year = dateCreated.getFullYear();
    var month = dateCreated.getMonth() + 1; 
    var day = dateCreated.getDate();

    // Concatenate to get a YYYY-MM-DD format
    var formattedDate = month + '/' + day + '/' + year;
     

    return (
        <div className="bg-neutral-800 rounded-md">

            {/* Top row */}
            <div className="p-5 title-section flex gap-3">
                <div className="w-full flex items-center justify-between gap-3">
                    <div className="flex items-center">
                        <img src={userData.avatarmedium} className="h-12 mr-3"/>
                        <h1 className="text-2xl">{userData.personaname}</h1>
                    </div>

                    <p className="text-neutral-300 text-lg font-semibold">Member Since: {formattedDate}</p>
                    <a href={userData.profileurl} className=" flex gap-2 items-center bg-purple-700 p-2 rounded-xl text-sm text-neutral-300">
                        <img src="/steam-logo.png" className="h-5"/>
                        <p>Profile</p>
                    </a>

                </div>  
            </div>

            {/* Second row */}
            <div className="title-section flex justify-between gap-3 bg-neutral-900">

                <div className="flex items-center p-2">
                    <GenrePieChart/>
                </div>  

                <div>
                    <LibraryDetails/>
                </div>

                <div>
                    <RareAchievements/>
                </div>
            </div>


        </div>
    )
}

export default ProfileStatsCard;