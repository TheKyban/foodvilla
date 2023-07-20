import { Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={async (value) => {}}
			>
				<Form className="form">
					<label htmlFor="email">Email : </label>
					<Field name="email" id="email" type="email" />
					<label htmlFor="password">Password : </label>
					<Field name="password" id="password" type="password" />
					<button type="submit">Submit</button>

					<span>Don't have an account ? <Link to={"/signup"}>Sign Up</Link></span>
				</Form>
			</Formik>
		</div>
    )
}

export default Login