import {z} from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { User, Lock } from 'lucide-react';

const formSchema = z.object({
  username: z.string().trim().min(1, {error: "Username is required"}),
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
      username: "",
      password: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  }

  return (
      <div className="flex items-center justify-center h-full">
        <div className="border border-mt-light-gray rounded p-16 w-full max-w-3xl space-y-6 mb-2">
          <h1 className="text-white text-4xl font-bold text-center">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <input
                  {...register("username")}
                  type="text"
                  placeholder="Username"
                  className="w-full border rounded-full px-6 py-4 bg-transparent text-white text-lg pr-12"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-mt-light-gray" />
              {errors.username && (
                  <p className="text-mt-red text-sm mt-1">{errors.username.message}</p>
              )}
            </div>
            <div className="relative">
              <input
                  {...register("password")}
                  type="text"
                  placeholder="Password"
                  className="w-full border rounded-full px-6 py-4 bg-transparent text-white text-lg pr-12"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-mt-light-gray" />
              {errors.password && (
                  <p className="text-mt-red text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <button
                type="submit"
                className="w-full bg-mt-red text-white px-4 py-2 rounded text-lg">
              Login
            </button>
          </form>
          <p className="text-center text-white text-lg">
            Don't have an account?{" "}
            <a href="/register" className="text-mt-red underline hover:text-white">
              Sign up
            </a>
          </p>
        </div>
      </div>
  )
}

export default LoginPage