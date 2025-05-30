import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/useAuth";
import { Checkbox,Image } from "@fluentui/react-northstar";
import { useState } from "react";
import dinosaurio from "../assets/dinosaurio.png";

type RegisterFormsInputs = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
};
const validation = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("It is not a standard email format."),
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
const RegisterPage = () => {
  const [checked, setChecked] = useState<boolean>();
  const [checkedConfirm, setCheckedConfirm] = useState<boolean>();

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
        <div style={{ marginBottom: "2rem" }}>
        <Image
          src={dinosaurio}
          alt="Login Illustration"
          style={{
            width: "350px",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
      </div>
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
                type={checked == true ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password ? <p>{errors.password.message}</p> : ""}
            </div>
            <Checkbox
              label={<span>Show password</span>}
              onChange={() => setChecked(!checked)}
            />
            <div style={{ marginBottom: "10px" }}></div>
            <div>
              <label htmlFor="password">ConfirmPassword</label>
              <input
                type={checkedConfirm == true ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.password ? <p>{errors.password.message}</p> : ""}
            </div>
            <Checkbox
              label={<span>Show password</span>}
              onChange={() => setCheckedConfirm(!checkedConfirm)}
            />
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
