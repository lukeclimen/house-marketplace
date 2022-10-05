import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visiblityIcon from "../assets/svg/visibilityIcon.svg";

function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	const navigate = useNavigate();
	const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.id]: event.target.value,
		}));
	};

	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>
						Welcome Back!
					</p>
				</header>
				<main>
					<form>
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
						<Link
							to='/forgot-password'
							className='
							forgotPasswordLink'
						>
							Forgot Password?
						</Link>
						<div className='signInBar'>
							<p className='signInText'>
								Sign In
							</p>
							<button className='signInButton'>
								<ArrowRightIcon
									fill='#fff'
									width={36}
									height={36}
								/>
							</button>
						</div>
					</form>

					{/* Google OAuth */}

					<Link
						to='/sign-up'
						className='registerLink'
					>
						Sign Up
					</Link>
				</main>
			</div>
		</>
	);
}

export default SignIn;
