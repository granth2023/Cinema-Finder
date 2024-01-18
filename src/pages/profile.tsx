// src/pages/profile.tsx
import { useUser } from '../../contexts/UserContext';

const ProfilePage: React.FC = () => {
    const { user } = useUser();
    console.log(user);

    // If user is not available, you can provide a default message or redirect the user
    if (!user) return <p>Please login to view your profile</p>;

    return <div>Hello, {user.name}!</div>;
}

export default ProfilePage;
