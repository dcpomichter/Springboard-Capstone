"use client";

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import Loading from '../components/Loading';
import TermsOfServiceModal from '../components/TermsOfServiceModal';
import geocode from '@/helpers/Geocode';

interface PostalResult {
    placeName: string;
    lat: string;
    lng: string;
    postalCode: string;
    countryCode: string;
}

export default function SignupPage() {
    const router = useRouter()


    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [results, setResults] = React.useState<PostalResult[]>([]);
    const [isDropdownOpen, setDropdownOpen] = React.useState(false);

    const [postal, setPostal] = React.useState("");
    const [country, setCountry] = React.useState("US");

    const [city, setCity] = React.useState("");
    const [lat, setLat] = React.useState<number | null>(null);
    const [lon, setLon] = React.useState<number | null>(null);
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
        city: city
    })

    const [buttonDisabled, setbuttonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [lookupError, setLookupError] = React.useState("");

    const onSignup = async () => {
        try {
            setLoading(true)
            if (!lat || !lon) {
                alert("Please select a city from the dropdown.");
                return;
            }
            const response = await axios.post("/api/users/signup", user);
            toast.success("Signup success")
            router.push("/login")
        }
        catch (error: any) {
            toast.error("Signup Failed" + error.message)
        } finally {
            setLoading(false)
        }
    }

    const [tosOpen, setTosOpen] = React.useState(false);

    const [isChecked, setIsChecked] = React.useState(false); // Initial state is unchecked

    const handleCheckboxChange = (evt: any) => {
        setIsChecked(evt.target.checked); // Update state based on checkbox's 'checked' property
    };

    function handleSelect(result: PostalResult) {
        setPostal(result.postalCode);
        setCity(result.placeName);
        setLat(parseFloat(result.lat));
        setLon(parseFloat(result.lng));
        setResults([]);
        setDropdownOpen(false);
    }

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0 && isChecked && city) {
            setbuttonDisabled(false)
        } else {
            setbuttonDisabled(true)
        }
    }, [user, isChecked, city])

    useEffect(() => {
        if (!postal || postal.length < 2) {
            setResults([]);
            return;
        }

        const delay = setTimeout(async () => {
            try {
                setLookupError("");

                const data = await geocode(postal)

                if (!data.postalCodes) {
                    setResults([]);
                } else {
                    setResults(data.postalCodes);
                }

                setDropdownOpen(true);
            } catch (err) {
                console.error(err);
                setLookupError("Error retrieving location data.");
            }
        }, 300);

        return () => clearTimeout(delay);
    }, [postal, country]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setUser({ ...user, city: city });
    }, [city])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            {loading ? <Loading message="Processing Signup..." /> : <h1 className='title'>Sign Up!</h1>}
            <hr />
            <label htmlFor='username'>Username</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='username'
                type='text'
                value={user.username}
                onChange={(evt) => setUser({ ...user, username: evt.target.value })}
                placeholder='username'
            />
            <label htmlFor='email'>Email</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='email'
                type='email'
                value={user.email}
                onChange={(evt) => setUser({ ...user, email: evt.target.value })}
                placeholder='email'
            />
            <label htmlFor='password'>Password</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='password'
                type='password'
                value={user.password}
                onChange={(evt) => setUser({ ...user, password: evt.target.value })}
                placeholder='password'
            />
            <label htmlFor='postal'>Postal Code</label>
            <input
                id='postal'
                type="text"
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                value={postal}
                required
                placeholder="Type your postal code..."
                onChange={(evt) => {
                    setPostal(evt.target.value);
                    setDropdownOpen(true);
                }}
                onFocus={() => postal.length > 1 && setDropdownOpen(true)}
            />
            {isDropdownOpen && results.length > 0 && (
                <div className="mt-1 bg-white border rounded shadow-lg z-10 max-h-60 overflow-y-auto">
                    {results.map((result, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleSelect(result)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100"
                        >
                            <p className="font-medium">
                                {result.postalCode} - {result.placeName}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            {city && lat && lon && (
                <div className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
                    <p><strong>City:</strong> {city}</p>
                </div>
            )}
            <input type="checkbox" id="tos" className="h-4 w-4" checked={isChecked} onChange={handleCheckboxChange} />
            <label htmlFor="tos" className="text-sm">
                I agree to the{' '}
                <p
                    className="text-blue-600 underline"
                    onClick={() => setTosOpen(true)}
                >
                    Terms of Service
                </p>
            </label>
            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onSignup}>{buttonDisabled ? "No Signup" : "Signup"}</button>
            <Link href='/login'>Visit Login Page</Link>
            <TermsOfServiceModal open={tosOpen} onClose={() => setTosOpen(false)} />

        </div>
    )
}
