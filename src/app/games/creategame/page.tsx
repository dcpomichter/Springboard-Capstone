"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import Loading from '@/app/components/Loading';

export default function CreateGamePage() {
    const router = useRouter()
    const [game, setGame] = React.useState({
        title: "",
        category: "",
        numberOfPlayers: "",
        gameplayTime: "",
        publisher: "",
        owners: []
    })
    const [gamesList, setGamesList] = React.useState(null)

    const [fetching, setFetching] = React.useState(true)
    const getGames = async () => {
        try {
            setFetching(true)
            const response = await axios.get('/api/games')
            setGamesList(response.data.games)
            toast.success("Games Retrieved")
        }
        catch (error: any) {
            toast.error("Loading Failed" + error.message)
        } finally {
            setFetching(false)
        }
    }

    const [publisherList, setPublisherList] = React.useState(null)
    const [fetchPublisher, setFetchPublisher] = React.useState(true)
    const getPublishers = async () => {
        try {
            setFetchPublisher(true)
            const response = await axios.get('/api/publishers')
            setPublisherList(response.data.publishers)
            toast.success("Publishers Retrieved")
        }
        catch (error: any) {
            toast.error("Loading Failed" + error.message)
        } finally {
            setFetchPublisher(false)
        }
    }

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
        getGames();
        getPublishers()
    }, [])

    useEffect(() => {
        if (((game.title.length > 0 && game.title !== "Not Listed") && game.category.length > 0 && game.numberOfPlayers.length > 0 && game.gameplayTime.length > 0 && (game.publisher.length > 0 && game.publisher !== "Not Listed")) || (game.title.length > 0 && newGame === "")) {
            setbuttonDisabled(false)
        } else {
            setbuttonDisabled(true)
        }
    }, [game])

    let newGame = ""

    if (gamesList) {
        let gameTitles = []
        gamesList.map((game) => { gameTitles.push(game._id) })
        if (game.title !== "" && (!gameTitles.includes(game.title) || game.title === "Not Listed")) {
            newGame = <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='title'
                type='text'
                value={game.title !== "Not Listed" ? game.title : ""}
                onChange={(evt) => setGame({ ...game, title: evt.target.value })}
                placeholder='New Game Title*' />
        }
    }

    let newPublisher = ""

    if (publisherList) {
        let publisherNames = []
        publisherList.map((publisher) => { publisherNames.push(publisher._id) })
        if (game.publisher !== "" && (!publisherNames.includes(game.publisher) || game.publisher === "Not Listed")) {
            newPublisher = <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='publihser'
                type='text'
                value={game.publisher !== "Not Listed" ? game.publisher : ""}
                onChange={(evt) => setGame({ ...game, publisher: evt.target.value })}
                placeholder='New Publisher Name*' />
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            {loading ? <Loading message="Processing..." /> : <h1 className='title'>Add a Game</h1>}
            <br />

            <label htmlFor='title'>Title</label>
            <select
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id="title"
                value={game.title}
                onChange={(evt) => setGame({ ...game, title: evt.target.value })}
                required >
                <option value="">--Select Game--</option>
                {!fetching ? gamesList.map((game) => (
                    <option key={game._id.toString()} value={game._id}> {game.title}
                    </option>)) : ""}
                <option>Not Listed</option>
            </select>
            {newGame}
            {newGame === "" ? "" : <>
                <label htmlFor='category'>Category</label>
                <select
                    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                    id='category'
                    value={game.category}
                    onChange={(evt) => setGame({ ...game, category: evt.target.value })}>
                    <option value="">--Select Category--</option>
                    <option>Cooperative</option>
                    <option>Classic</option>
                    <option>Card</option>
                    <option>Party</option>
                    <option>Resource Management</option>
                    <option>Deck Building</option>
                    <option>RPG</option>
                    <option>Dice</option>
                    <option>Social Deduction</option>
                    <option>Legacy</option>
                    <option>Combat</option>
                    <option>Family</option>
                    <option>Push your Luck</option>
                    <option>Campaign</option>
                    <option>Eurogame</option>
                    <option>City Building</option>
                </ select>
                <label htmlFor='numberOfPlayers'>Number of Players</label>
                <input
                    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                    id='numberOfPlayers'
                    type='text'
                    value={game.numberOfPlayers}
                    onChange={(evt) => setGame({ ...game, numberOfPlayers: evt.target.value })}
                    placeholder='Number of Players*'
                />
                <label htmlFor='gameplayTime'>Gameplay Time</label>
                <input
                    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                    id='gameplayTime'
                    type='text'
                    value={game.gameplayTime}
                    onChange={(evt) => setGame({ ...game, gameplayTime: evt.target.value })}
                    placeholder='Gameplay Time*'
                />
                <label htmlFor='publisher'>Publisher</label>
                <select
                    className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                    id="publisher"
                    value={game.publisher}
                    onChange={(evt) => setGame({ ...game, publisher: evt.target.value })}
                    required >
                    <option value="">--Select Publisher--</option>
                    {!fetchPublisher ? publisherList.map((publisher) => (
                        <option key={publisher._id.toString()} value={publisher._id}> {publisher.name}
                        </option>)) : ""}
                    <option>Not Listed</option>
                </select>
                {newPublisher}
            </>}
            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={createGame}>{buttonDisabled ? "Cannot Create" : "Add Game to Library"}</button>
        </div>
    )
}
