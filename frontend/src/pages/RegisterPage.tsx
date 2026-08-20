import { z } from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "react-router";
import {useState, useEffect} from "react";
import PasswordInput from "../components/PasswordInput.tsx";


const formSchema = z.object({
  email: z.email({error: "Invalid email address"}),
  password: z.string().trim().min(5, {error: "Password must be at least 5 characters"}),
  name: z.string().min(3, {error: "Full name must be at least 8 characters"}),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

type FormValues = z.infer<typeof formSchema>



const RegisterPage = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: ""
    }
  })

  const onSubmit = (data: FormValues) => {
    fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        full_name: data.name,
        email: data.email,
        password: data.password,
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Email already exists");
        }
        return res.json();
      })
      .then(() => {
        return fetch("http://127.0.0.1:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        })
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid email or password");
        }
        return res.json();
      })
      .then((response) => {
        localStorage.setItem("token", response.access_token);
        navigate("/home");
      })
      .catch((error) => {
        setRegisterError(error.message)
    })
  }

  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    document.title = "Register Page";
  }, [])


  return (
      <>
        <div
            className="fixed inset-0 z-0"
            style={{
              backgroundImage: "url('/login-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
        />
        <div className="relative z-10 border border-mt-light-gray rounded p-12 w-full max-w-lg space-y-6 mb-2 mt-14 mx-4">
          <h1 className="text-white text-3xl font-bold text-center">Register your account</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <label className="text-white text-sm mb-1 block">Name</label>
              <input
                  {...register("name")}
                  type="text"
                  placeholder="Enter your full name..."
                  className="w-full border rounded-lg px-4 py-2.5 bg-transparent text-white text-base"
              />
              {errors.name && (
                  <p className="text-mt-red text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="relative">
              <label className="text-white text-sm mb-1 block">Email</label>
              <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email address..."
                  className="w-full border rounded-lg px-4 py-2.5 bg-transparent text-white text-base"
              />
              {errors.email && (
                  <p className="text-mt-red text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-white text-sm mb-1 block">Password</label>
              <div className="relative">
                <PasswordInput placeholder="Password" registration={register("password")} inputClassName="w-full border rounded-lg px-4 py-2.5 bg-transparent text-white text-base" />
                {errors.password && (
                    <p className="text-mt-red text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <label className="text-white text-sm mb-1 block">Confirm Password</label>
              <div className="relative">
                <PasswordInput placeholder="Confirm your password" registration={register("confirmPassword")} inputClassName="w-full border rounded-lg px-4 py-2.5 bg-transparent text-white text-base" />
                {errors.confirmPassword && (
                    <p className="text-mt-red text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            {registerError && (
                <p className="text-mt-red text-sm text-center">{registerError}</p>
            )}
            <button
                type="submit"
                className="w-full bg-mt-red text-white px-4 py-2 rounded text-base">
              Sign Up
            </button>
          </form>
          <p className="text-center text-white text-base">
            Already have an account?{" "}
            <Link to="/" className="text-mt-red underline hover:text-white">
              Sign in
            </Link>
          </p>
        </div>
      </>
  )
}

export default RegisterPage