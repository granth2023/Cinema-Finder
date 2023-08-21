import { useState } from "react";

type Theater = {
    id : string;
    name: string;
};

function FindTheaterPage() {
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [query, setQuery] = useState('');

    const searchForTheaters = async () => {
        const response = await fetch ('/api/searchTheaters?query=${query}')
        const data = await response.json()

        setTheaters(data.results || [])
}

return( 
    <div>
        <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a theater..."
        />
        <button onClick={searchForTheaters}>Search</button>


    <div>
        {theaters.map(theater => (
            <div key={theater.id}>
                {theater.name}
                {/* add other theater details here */}
            

            </div>
        ))}
        </div>
        </div>
)
        }

export default FindTheaterPage;