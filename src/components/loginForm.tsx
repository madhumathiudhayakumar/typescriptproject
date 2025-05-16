import type React from "react";
import { useState, type FormEvent } from "react";


type formData = {
	email: string,
	password: string,
	rememberme: boolean
}


const LoginForm: React.FC = () => {
	const [inputData, setInputData] = useState<formData>({ email: "", password: "", rememberme: false })
	const [showPassword, setShowPassword] = useState<boolean>(true)

	const togglePassword = () => {
		setShowPassword((prev) => !prev)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target;

		setInputData((prev) => ({
			...prev,
			[name]: name === "rememberme" ? checked : value,
		}));
	};
	
	console.log(inputData, "inputttt");

	const handleSubmit = (e: FormEvent) : void => {
		e.preventDefault();
		console.log(inputData,"inputeeee")
		alert("Form Submmitted Successfully")
		setInputData({email:"",password:"",rememberme:false})
	}


	return (
		<div className="container d-flex justify-content-center align-items-center min-vh-100">
			<div  style={{ width: "400px" }}>
				<div> <h4 className="fw-bold">Sign In</h4>
					<p className="fw-sm">Please enter your details to sign in </p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="mb-3  position-relative">
						<label className="form-label text-start w-100 fw-bold">Email address</label>
						<input type="email" className="form-control " id="email" placeholder="Enter Email" onChange={handleChange} name="email" value={inputData?.email} required />
						<i className="bi bi-envelope position-absolute" style={{
							top: '38px',
							right: '10px',
							cursor: 'pointer',
							fontSize: '1.2rem',
						}}></i>
					</div>
					<div className="mb-3 position-relative">
						<label className="form-label text-start w-100 fw-bold">Password</label>
						<input type={showPassword ? "password" : "text"} className="form-control pe-5" id="password" placeholder="Enter Password" name="password" onChange={handleChange} value={inputData?.password} required
						/>
						<i
							className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
							style={{
								top: '38px',
								right: '10px',
								cursor: 'pointer',
								fontSize: '1.2rem',
							}}
							onClick={togglePassword}
						></i>
					</div>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<div className="form-check d-flex align-items-center">
							<input
								className="form-check-input"
								type="checkbox"
								id="rememberme"
								onChange={handleChange}
								name="rememberme"
								// value={inputData?.rememberme}
								style={{ borderColor: "var(--primary-color)", backgroundColor: inputData?.rememberme ? "var(--primary-color)" : "white" }}
							/>
							<label className="form-check-label ms-2" htmlFor="rememberme">
								Remember Me
							</label>
						</div>

						<p className="mb-0 text-danger" style={{ cursor: 'pointer' }}>
							Forgot Password
						</p>
					</div>
					<div className="mb-3  align-items-center position-relative ">
						<button type="submit" className="btn btn-primary w-100 ">Sign In</button>
					</div>
					<div className="mb-3">
						<p >Don't have an account? <span style={{ color: "var(--primary-color)" ,cursor:"pointer"}}>Create Account</span> </p>
					</div>
				</form>
			</div>
		</div>
	)
}
export default LoginForm