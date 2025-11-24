export default async function geocode(postal) {
    const url = `https://${process.env.NEXT_PUBLIC_MAP_URL}/postalCodeSearchJSON?postalcode=${encodeURIComponent(
        postal
    )}&maxRows=10&username=${process.env.NEXT_PUBLIC_API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    return data
}
