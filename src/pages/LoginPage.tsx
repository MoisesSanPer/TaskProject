import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/useAuth";
import { useState } from "react";
import { Checkbox, Image } from "@fluentui/react-northstar";
import dragon from "../assets/dragon.png";
type LoginFormsInputs = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("It is not a standard email format."),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const [checked, setChecked] = useState<boolean>();
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
      <div style={{ marginBottom: "2rem" }}>
        <Image
          src={dragon}
          alt="Login Illustration"
          style={{
            width: "400px",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
      </div>
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
                type={checked ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                {...register("password")}
              />
              <Checkbox
                label={<span>Show password</span>}
                onChange={() => setChecked(!checked)}
              />
              {errors.password ? <p>{errors.password.message}</p> : ""}
            </div>
            <button type="submit">Sign in</button>
            <p>
              Don´t have an account yet? <a href="register">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
