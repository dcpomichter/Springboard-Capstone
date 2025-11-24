"use client"
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast"
import Loading from "../components/Loading";

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
        console.log(data)
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="title">Games</h1>
                {loading ? <Loading message="Loading Games..." /> : ""}
                <div className="flex flex-col w-1/2  items-center games">
                    {data.map((game: any) => (
                        <div className="game" key={game._id.toString()}>
                            <Link href={`/games/${game._id.toString()}`} key={game._id} >
                                <p>{game.title}</p>
                                <p>Category: {game.category}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <button> <Link href={'/games/creategame'}>Add a Game </Link></button>
            </div>
        </>
    )
}
