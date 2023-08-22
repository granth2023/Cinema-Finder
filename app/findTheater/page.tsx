import { useState } from "react";

type Theater = {
    id : string;
    name: string;
};

function FindTheaterPage() {
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [query, setQuery] = useState('');
    const [error, setError]= useState<string | null>(null)
    
const searchForTheaters = async () => {
    setError(null);

    try {
        const response = await fetch(`/api/searchTheaters?query=${query}`);
        const data = await response.json();

        if (response.ok) {
            setTheaters(data);
        } else {
            setError(data.error || "something went wrong");
    }
} catch (error){
    console.error("error fetching theaters:", error);
    setError("failed to fetch theaters");
}
}
       
        

return ( 
    <div>
        <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a theater..."
        />
        <button onClick={searchForTheaters}>Search</button>

        {error && <p style={{ color: 'red'}}> {error}</p>}

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