import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visiblityIcon from "../assets/svg/visibilityIcon.svg";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import {
	doc,
	setDoc,
	serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
	// States
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	// Destructuring formData properties
	const { name, email, password } = formData;
	const navigate = useNavigate();

	// Function for reading in text input
	const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.id]: event.target.value,
		}));
	};

	// Function to handle form submission
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			// Authentication
			const auth = getAuth();

			const userCredential =
				await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);

			const user = userCredential.user;
			updateProfile(auth.currentUser, {
				displayName: name,
			});

			// Add new user to database
			const formDataCopy = { ...formData }; //Preserving our form data state by copying it
			delete formDataCopy.password; //Don't want to submit the password to the database
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(
				doc(db, "users", user.uid),
				formDataCopy
			); //Adding an item to the db with the uid and formDataCopy as the payload

			navigate("/");
			toast.success("Now signed up!");
		} catch (error) {
			toast.error(
				"Oops, something went wrong with registration..."
			);
		}
	};

	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Welcome!</p>
				</header>
				<main>
					<form onSubmit={onSubmit}>
						<input
							type='text'
							className='nameInput'
							placeholder='Name'
							id='name'
							value={name}
							onChange={onChange}
						/>
						<input
							type='email'
							className='emailInput'
							placeholder='Email'
							id='email'
							value={email}
							onChange={onChange}
						/>
						<div className='passwordInputDiv'>
							<input
								type={
									showPassword
										? "text"
										: "password"
								}
								className='passwordInput'
								placeholder='Password'
								id='password'
								value={password}
								onChange={onChange}
							/>
							<img
								src={visiblityIcon}
								alt='show password'
								className='showPassword'
								onClick={() =>
									setShowPassword(
										(prevState) =>
											!prevState
									)
								}
							/>
						</div>
						{/* Sign up Label and Button */}
						<div className='signUpBar'>
							<p className='signUpText'>
								Sign Up
							</p>
							<button className='signUpButton'>
								<ArrowRightIcon
									fill='#ffffff'
									width='34px'
									height='34px'
								/>
							</button>
						</div>
					</form>

					{/* Google OAuth */}

					<Link
						to='/sign-in'
						className='registerLink'
					>
						Already Registered? Sign In
					</Link>
				</main>
			</div>
		</>
	);
}

export default SignUp;
