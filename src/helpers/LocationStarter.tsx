"use client";

import { useState, useEffect } from "react";

interface TomTomSuggestion {
    address: {
        freeformAddress?: string;
        municipality?: string;
        countrySubdivision?: string;
    };
    position: {
        lat: number;
        lon: number;
    };
}

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cityQuery, setCityQuery] = useState("");
    const [cityDisplayName, setCityDisplayName] = useState("");
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [suggestions, setSuggestions] = useState<TomTomSuggestion[]>([]);

    const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;

    // ---- AUTOCOMPLETE LOOKUP WHEN USER TYPES ----
    useEffect(() => {
        if (!cityQuery || cityQuery.length < 2) {
            setSuggestions([]);
            return;
        }

        const controller = new AbortController();

        async function fetchSuggestions() {
            try {
                const res = await fetch(
                    `https://api.tomtom.com/search/2/autocomplete/${encodeURIComponent(
                        cityQuery
                    )}.json?key=${apiKey}&language=en-US&limit=5`,
                    { signal: controller.signal }
                );
                const data = await res.json();

                if (data?.results) {
                    setSuggestions(data.results);
                }
            } catch (err) {
                if (err instanceof DOMException) return;
                console.error("TomTom autocomplete error:", err);
            }
        }

        fetchSuggestions();
        return () => controller.abort();
    }, [cityQuery, apiKey]);

    // ---- USER SELECTS A SUGGESTION ----
    async function handleSelectCity(suggestion: TomTomSuggestion) {
        const label =
            suggestion.address?.freeformAddress ||
            suggestion.address?.municipality ||
            "";

        setCityQuery(label);
        setCityDisplayName(label);
        setLat(suggestion.position.lat);
        setLon(suggestion.position.lon);
        setSuggestions([]);
    }

    // ---- REVERSE GEO: lat/lon -> City Name (optional helper) ----
    async function reverseGeocode(lat: number, lon: number): Promise<string> {
        const res = await fetch(
            `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=${apiKey}`
        );
        const data = await res.json();
        const addr = data?.addresses?.[0]?.address;

        return (
            addr?.municipality ||
            addr?.freeformAddress ||
            addr?.countrySubdivision ||
            "Unknown"
        );
    }

    // ---- FORM SUBMIT ----
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!lat || !lon) {
            alert("Please select a city from the dropdown.");
            return;
        }

        const body = {
            email,
            username,
            password,
            city: cityDisplayName,
            latitude: lat,
            longitude: lon,
        };

        console.log("Submitting signup data:", body);

        // TODO: Replace with your API route
        // await fetch("/api/signup", { method: "POST", body: JSON.stringify(body) })

        alert("Signup submitted! Check console for payload.");
    }

    return (
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg bg-white">
            <h1 className="text-xl font-bold mb-4">Sign Up</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* EMAIL */}
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full border p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* USERNAME */}
                <div>
                    <label className="block font-medium">Username</label>
                    <input
                        type="text"
                        required
                        className="w-full border p-2 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* PASSWORD */}
                <div>
                    <label className="block font-medium">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full border p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* CITY AUTOCOMPLETE */}
                <div className="relative">
                    <label className="block font-medium">City</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        placeholder="Type your city..."
                        value={cityQuery}
                        onChange={(e) => setCityQuery(e.target.value)}
                    />

                    {/* DROPDOWN SUGGESTIONS */}
                    {suggestions.length > 0 && (
                        <ul className="absolute bg-white border w-full mt-1 rounded shadow-md z-10">
                            {suggestions.map((s, i) => (
                                <li
                                    key={i}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectCity(s)}
                                >
                                    {s.address.freeformAddress ||
                                        s.address.municipality ||
                                        "Unnamed location"}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
}
