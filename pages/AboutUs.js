import React from "react";
import Layout from "@/components/Layout";
import './../app/globals.css';


const AboutUs = () => {

    const description = "SteamPulse is a dynamic web application designed for avid PC gamers and developers alike. Harnessing the power of the Steam Web API, SteamPulse offers users a rich interface to explore a wide array of games, along with recommendations for PC specs, ratings, and options for discovering similar and featured games. By entering their Steam ID, users can access personalized data such as favorite genres, the total value of their game library, total gameplay hours, and average gaming time per week. Created purely as a passion project, SteamPulse stands as a testament to the joy of web development and PC gaming, crafted with no other intent than the sheer love of the gaming community."

    const contributors = [
        {
            name: "David",
            github: "davidwilliford99",
            description: "Computer Science student at ECU. Class of Spring 2024."
        },
        {
            name: "Francisco",
            github: "fmaldonado21",
            description: "Computer Science student at ECU. Class of Spring 2024."
        },
        {
            name: "Nicholas",
            github: "johnsonnich19",
            description: "Computer Science student at ECU. Class of Spring 2024."
        }
    ]

    return (
        <div className="font-source w-full">
            <Layout>
                <div>
                    

                    {/* Simple Description */}
                    <div className="my-5 rounded-md">
                        <h1 className="p-5 text-4xl text-center">About SteamPulse</h1>
                        <p className="p-5 text-neutral-300 text-center">{description}</p>
                    </div>


                    {/* Contributors */}
                    <div className="my-5 rounded-md">
                        <h1 className="p-5 text-2xl text-center">Contributors</h1>
                        <div className="p-5 flex gap-3 justify-between">
                            {
                                contributors.map((contributor) => {
                                    const githubLink = `www.github.com/${contributor.github}`
                                    return (
                                        <div className="bg-neutral-800 p-5 px-20 rounded-md flex flex-col items-center justify-center">
                                            <p className="text-center text-lg">{contributor.name}</p>
                                            <a href={githubLink} className="my-3 py-2 rounded-md w-full flex justify-center">
                                                <img src="/github-logo.png" className="h-8"/>
                                            </a>
                                            <p className="text-center text-sm">{contributor.description}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>


                    {/* Our Users: Will have a vertical list of steam accounts connected */}
                    <div className="my-5 rounded-md">
                        <h1 className="text-2xl text-center">Gamers who use SteamPulse</h1>
                    </div>



                </div>
            </Layout>
        </div>
    )
}

export default AboutUs;