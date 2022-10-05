import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visiblityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const { name, email, password } = formData;
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
					<p className='pageHeader'>Welcome!</p>
				</header>
				<main>
					<form>
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
						<Link
							to='/forgot-password'
							className='
							forgotPasswordLink'
						>
							Forgot Password?
						</Link>
						<div className='signUpBar'>
							<p className='signUpText'>
								Sign Up
							</p>
							<button className='signUpButton'>
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
						Already Registered? Sign In
					</Link>
				</main>
			</div>
		</>
	);
}

export default SignUp;
