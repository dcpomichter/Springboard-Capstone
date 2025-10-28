"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast'

export default function CreateGamePage() {
    const router = useRouter()
    const [game, setGame] = React.useState({
        title: "",
        category: "",
        numberOfPlayers: 0,
        gameplayTime: 0,
        publisher: "",
        owners: []
    })


    const [buttonDisabled, setbuttonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const createGame = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/games/create", game);
            toast.success("Game Created")
            router.push("/games")
        }
        catch (error: any) {
            toast.error("Creation Failed" + error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (game.title.length > 0 && game.category.length > 0 && game.numberOfPlayers > 0 && game.gameplayTime > 0) {
            setbuttonDisabled(false)
        } else {
            setbuttonDisabled(true)
        }
    }, [game])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>{loading ? "Procesing..." : "Create a New Game"}</h1>
            <br />
            <label htmlFor='title'>Title</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='title'
                type='text'
                value={game.title}
                onChange={(evt) => setGame({ ...game, title: evt.target.value })}
                placeholder='Title*'
            />
            <label htmlFor='category'>Category</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='category'
                type='category'
                value={game.category}
                onChange={(evt) => setGame({ ...game, category: evt.target.value })}
                placeholder='Category*'
            />
            <label htmlFor='numberOfPlayers'>Number of Players</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='numberOfPlayers'
                type='number'
                value={game.numberOfPlayers}
                onChange={(evt) => setGame({ ...game, numberOfPlayers: evt.target.valueAsNumber })}
                placeholder='Number of Players*'
            />
            <label htmlFor='gameplayTime'>Gameplay Time</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='gameplayTime'
                type='number'
                value={game.gameplayTime}
                onChange={(evt) => setGame({ ...game, gameplayTime: evt.target.valueAsNumber })}
                placeholder='Gameplay Time*'
            />
            <label htmlFor='publisher'>Publisher</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='publisher'
                type='text'
                value={game.publisher}
                onChange={(evt) => setGame({ ...game, publisher: evt.target.value })}
                placeholder='Publisher'
            />
            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={createGame}>{buttonDisabled ? "Cannot Create" : "Create Game"}</button>
        </div>
    )
}
