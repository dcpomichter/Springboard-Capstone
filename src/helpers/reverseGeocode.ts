export default async function reverseGeocode(lat: number, lon: number): Promise<string> {
    const url = `https://${process.env.NEXT_PUBLIC_MAP_URL}/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&username=${process.env.NEXT_PUBLIC_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.geonames?.length > 0) {
        return data.geonames[0].name;
    }

    return "Unknown location";
}
