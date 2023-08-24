import { useState } from "react";

type Theater = {
    id: string;
    name: string;
};

function FindTheaterPage() {
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [query, setQuery] = useState('');

    const searchForTheaters = async () => {
        try {
            const response = await fetch(`/api/searchTheaters?query=${query}`);
            if (!response.ok) {
                console.error("Error fetching theaters:", response.statusText);
                return;
            }
            const data: Theater[] = await response.json();
            setTheaters(data);
        } catch (error) {
            console.error("Error while fetching theaters:", error);
        }
    };

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a theater..."
            />
            <button onClick={searchForTheaters}>Search</button>

            <ul>
                {theaters.map(theater => (
                    <li key={theater.id}>
                        {theater.name}
                        {/* add other theater details here */}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FindTheaterPage;
