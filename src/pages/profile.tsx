import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const ProfilePage: React.FC = () => {
    const { user } = useUser();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if(user){ 
                try { 
                    const res = await axios.get('/api/favorites/${user.id}');
                    setFavorites(res.data);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };
        fetchFavorites();
    }, [user]);

    if(!user) return <p>Please login to view your profile</p>
    return (
        <div className="container mx-auto p-4"> 
            <NavBar />
            <h1 className="text- 2x1 font-bold">Profile Page</h1>
            <h2>Your Favorites</h2>
            <ul>
                {favorites.map(movie => (
                    <li key={movie.id}> 
                        {movie.title}
                    </li>
                ))}
                </ul>

        </div>
    );
}

export default ProfilePage