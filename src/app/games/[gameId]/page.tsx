"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function GameDetailsPage({ params }: any) {
    const router = useRouter()
    const [data, setData] = React.useState({})
    const [loading, setLoading] = React.useState({})

    const { gameId } = React.use(params)

    const getGameDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`/api/games/${gameId}`, { gameId })
            setData(response.data.game)
            toast.success('Game Data Retrieved')
        }
        catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getGameDetails()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {loading ? <h1>Loading...</h1> :
                <>
                    <h1 className="text-2xl">{data.title}</h1>
                    <div className="game">
                        <p><span>Category:</span> {data.category || "Unknown"}</p>
                        <p><span>Number of Player:</span> {data.numberOfPlayers || "Unknown"}</p>
                        <p><span>Play Time:</span> {`${data.gameplayTime} min` || "Unknown"}</p>
                        <p><span>Publisher:</span> {data.publisher || "Unknown"}</p>
                    </div>
                </>}
        </div>
    )
}
