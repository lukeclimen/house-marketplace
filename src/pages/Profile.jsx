import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

function Profile() {
	const [user, setUser] = useState(null);
	const auth = getAuth();
	useEffect(() => {
		setUser(auth.currentUser);
	}, [auth.currentUser]);
	return user ? (
		<h1>Welcome {user.displayName}</h1>
	) : (
		"Not Logged In"
	);
}

export default Profile;
