import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/useAuth";

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
};
const validation = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("It is not a standard email format."),
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const RegisterPage = () => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });
  const handleLogin = (form: RegisterFormsInputs) => {
    registerUser(form.email, form.userName, form.password);
  };
  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-box">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                {...register("userName")}
              />
              {errors.userName ? <p>{errors.userName.message}</p> : ""}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="email"
                {...register("email")}
              />
              {errors.email ? <p>{errors.email.message}</p> : ""}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password ? <p>{errors.password.message}</p> : ""}
            </div>
            <button type="submit">Sign up</button>
            <p>
              Have already an account? <a href="/">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
