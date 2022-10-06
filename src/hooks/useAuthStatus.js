import { useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
	// State
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	// Fixing memory leak issue
	const isMounted = useRef(true);

	// UseEffect to fire whenever the state of auth changes
	useEffect(() => {
		if (isMounted) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
					console.log("Logged In");
				}
				setLoading(false);
			});
		}
		return () => {
			isMounted.current = false;
		};
	}, [isMounted]);

	return { loggedIn, loading };
};
