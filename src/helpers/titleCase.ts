export default function toTitleCase(str: string) {
    if (!str) {
        return ""; // Handle empty or null strings
    }
    return str
        .toLowerCase() // Convert the entire string to lowercase first
        .split(" ") // Split the string into an array of words
        .map((word) => {
            // Capitalize the first letter of each word and concatenate with the rest
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" "); // Join the words back into a string
}
