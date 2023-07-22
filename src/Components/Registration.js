import { Formik, Form, Field } from "formik";
import "../styles/Registration.css";
import { Link } from "react-router-dom";

const Registration = () => {
	return (
		<div className="formWrapper">
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					password: "",
				}}
				onSubmit={async (value) => {}}
			>
				<Form className="form">
					<label htmlFor="firstName">FirstName : </label>
					<Field name="firstName" id="firstName" />
					<label htmlFor="LastName">LastName : </label>
					<Field name="LastName" id="LastName" />
					<label htmlFor="email">Email : </label>
					<Field name="email" id="email" type="email" />
					<label htmlFor="password">Password : </label>
					<Field name="password" id="password" type="password" />
					<button type="submit">Submit</button>

					<span>Have an account ? <Link to={"/login"}>Login</Link></span>
				</Form>
			</Formik>
		</div>
	);
};

export default Registration;
