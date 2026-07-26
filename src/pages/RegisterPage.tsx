import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link} from "react-router";
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";


const formSchema = z.object({
  username: z.string().trim().min(6, {error: "Username must be at least 6 characters"}),
  password: z.string().trim().min(5, {error: "Password must be at least 5 characters"}),
  email: z.email().trim().min(6, {error: "Email must be at least 6 characters"}),
  name: z.string().min(8, {error: "Full name must be at least 8 characters"}),
  confirmPassword: z.string().min(0, {error: "Passwords do not match"}),
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
      username: "",
      password: "",
      email: "",
      name: "",
      confirmPassword: ""
    }
  })

  const onSubmit = (data: FormValues) => {
    console.log(data);
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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
        <div className="relative z-10 border border-mt-light-gray rounded p-12 w-full max-w-lg space-y-6 mb-2 mt-14">
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
              <label className="text-white text-sm mb-1 block">Username</label>
              <input
                  {...register("username")}
                  type="text"
                  placeholder="Enter a username..."
                  className="w-full border rounded-lg px-4 py-2.5 bg-transparent text-white text-base"
              />
              {errors.username && (
                  <p className="text-mt-red text-sm mt-1">{errors.username.message}</p>
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
                <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password..."
                    className="w-full border rounded-lg px-4 py-2.5 bg-transparent text-white text-base pr-10"
                />
                {showPassword? <Eye onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mt-light-gray cursor-pointer" size={18} />
                    : <EyeOff onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mt-light-gray cursor-pointer" size={18} />}
              </div>
              {errors.password && (
                  <p className="text-mt-red text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="text-white text-sm mb-1 block">Confirm Password</label>
              <div className="relative">
                <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your password again..."
                    className="w-full border rounded-lg px-4 py-2.5 bg-transparent text-white text-base pr-10"
                />
                {showConfirmPassword? <Eye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mt-light-gray cursor-pointer" size={18} />
                    : <EyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mt-light-gray cursor-pointer" size={18} />}
              </div>
              {errors.confirmPassword && (
                  <p className="text-mt-red text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
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