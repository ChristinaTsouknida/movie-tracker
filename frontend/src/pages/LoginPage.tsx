import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Mail, EyeOff, Eye} from 'lucide-react';
import { Link, useNavigate } from "react-router";
import {useState, useEffect} from "react";


const formSchema = z.object({
  email: z.email({error: "Invalid email address"}),
  password: z.string().trim().min(5, {error: "Password is required"})
})

type FormValues = z.infer<typeof formSchema>

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const  navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
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
          setLoginError(error.message);
        });
  }

  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    document.title = "Login Page";
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
        <div className="relative z-10 border border-mt-light-gray rounded p-12 w-full max-w-md space-y-6 mb-2">
          <h1 className="text-white text-3xl font-bold text-center">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-full px-4 py-2.5 bg-transparent text-white text-base pr-10"
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-mt-light-gray" size={18} />
              {errors.email && (
                  <p className="text-mt-red text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border rounded-full px-4 py-2.5 bg-transparent text-white text-base pr-10"
              />
              {showPassword ? <Eye onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mt-light-gray" size={18} />
                  : <EyeOff onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mt-light-gray" size={18} />}
              {errors.password && (
                  <p className="text-mt-red text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            {loginError && (
                <p className="text-mt-red text-sm text-center">{loginError}</p>
            )}
            <button
                type="submit"
                className="w-full bg-mt-red text-white px-4 py-2 rounded text-base">
              Login
            </button>
          </form>
          <p className="text-center text-white text-base">
            Don't have an account?{" "}
            <Link to="/register" className="text-mt-red underline hover:text-white">
              Sign up
            </Link>
          </p>
        </div>
      </>
  )
}

export default LoginPage