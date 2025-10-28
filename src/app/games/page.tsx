"use client"
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast"

export default function GamesPage() {
    const router = useRouter()
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const getGames = async () => {
        setLoading(true)
        const response = await axios.get('/api/games')
        setData(response.data.games)
        toast.success("Games Retrieved")
        setLoading(false)
    }


    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>Games</h1>
                <h2>{loading ? "Loading..." : ""}</h2>
                {<div className="games">
                    {data.map(game => (
                        <Link href={`/games/${game._id.toString()}`} key={game._id} className="game">
                            <p>{game.title}</p>
                            <p>Category: {game.category}</p>
                        </Link>
                    ))}
                </div>}
                <button> <Link href={'/games/creategame'}>Add a Game </Link></button>
            </div>
        </>
    )
}
