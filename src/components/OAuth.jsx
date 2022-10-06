import {
	doc,
	setDoc,
	getDoc,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";
import {
	useLinkClickHandler,
	useLocation,
	useNavigate,
} from "react-router-dom";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

function OAuth() {
	const navigate = useNavigate();
	const location = useLocation();

	const onGoogleClick = async () => {
		try {
			// Initialize the authentication and any authentication providers
			const auth = getAuth();
			const provider = new GoogleAuthProvider();

			// Get the result and the user after a successful sign-in with the provider
			const result = await signInWithPopup(
				auth,
				provider
			);
			const user = result.user;

			// If user doesn't exist in the db of users, create a new entry for them
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				await setDoc(docRef, {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			navigate("/");
		} catch (error) {
			toast.error("Could not authorize with Google");
		}
	};

	return (
		<div className='socialLogin'>
			<p>
				Sign{" "}
				{location.pathname === "/sign-up"
					? "Up "
					: "In "}
				with
			</p>
			<button
				className='socialIconDiv'
				onClick={onGoogleClick}
			>
				<img
					className='socialIconImg'
					src={googleIcon}
					alt='Google'
				/>
			</button>
		</div>
	);
}

export default OAuth;
