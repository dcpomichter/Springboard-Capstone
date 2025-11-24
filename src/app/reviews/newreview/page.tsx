"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import Loading from '@/app/components/Loading';

export default function CreateReviewPage() {
    const router = useRouter()
    const [review, setReview] = React.useState({
        title: "",
        description: "",
        rating: 0,
        reviewer: null,
        game: ""

    })


    const [buttonDisabled, setbuttonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const createReview = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/reviews/create", review);
            toast.success("Review Created")
            router.push("/reviews")
        }
        catch (error: any) {
            toast.error("Creation Failed" + error.message)
        } finally {
            setLoading(false)
        }
    }

    const [gamesList, setGamesList] = React.useState<any>(null)
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

    useEffect(() => {
        getGames()
    }, [])

    useEffect(() => {
        if (review.title.length > 0 && review.description.length > 0 && review.rating > 0 && review.game.length > 0) {
            setbuttonDisabled(false)
        } else {
            setbuttonDisabled(true)
        }
    }, [review])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            {loading ? <Loading message="Processing Review..." /> : <h1>Create a New Review</h1>}
            <br />
            <label htmlFor='title'>Title</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='title'
                type='text'
                value={review.title}
                onChange={(evt) => setReview({ ...review, title: evt.target.value })}
                placeholder='Title*'
            />
            <label htmlFor='description'>Description</label>
            <textarea
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 wrap-break-word'
                id='description'
                value={review.description}
                onChange={(evt) => setReview({ ...review, description: evt.target.value })}
                placeholder='Description*'
            />
            <label htmlFor='rating'>Rating</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='rating'
                type='number'
                max={5}
                value={review.rating}
                onChange={(evt) => setReview({ ...review, rating: evt.target.valueAsNumber })}
                placeholder='Rating, out of 5*'
            />
            <label htmlFor='game'>Game</label>
            <select
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id="game"
                value={review.game}
                onChange={(evt) => {
                    setReview({ ...review, game: evt.target.value })
                    if (evt.target.value === "Not Listed") {
                        router.push('/games/creategame')
                    }
                }
                }
                required >
                <option value="">--Select Game--</option>
                {!fetching ? gamesList.map((game: any) => (
                    <option key={game._id.toString()} value={game._id}> {game.title}
                    </option>)) : ""}
                <option>Not Listed</option>
            </select>
            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={createReview}>{buttonDisabled ? "Cannot Post" : "Post Review"}</button>
        </div>
    )
}
