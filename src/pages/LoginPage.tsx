import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/useAuth";
type LoginFormsInputs = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInputs) => {
    loginUser(form.email, form.password);
  };
  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-box">
          <h1>Sign in to your account</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Email"
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
            <button type="submit">Sign in</button>
            <p>
              Don’t have an account yet? <a href="register">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </section>

  
  );
};

export default LoginPage;