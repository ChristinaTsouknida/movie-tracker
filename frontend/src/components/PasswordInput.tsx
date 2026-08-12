import type {PasswordInputProps} from "../shared/types.ts";
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";

const PasswordInput = ({ placeholder, registration, inputClassName }: PasswordInputProps) => {

  const [showPassword, setShowPassword] = useState(false);


  return (
      <>
        <div className="relative">
          <input
              {...registration}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              className={inputClassName || "w-full border rounded-full px-4 py-2.5 bg-transparent text-white text-base pr-10"}
          />
          {showPassword ? <Eye onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mt-light-gray" size={18} />
              : <EyeOff onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-mt-light-gray" size={18} />}
        </div>
      </>
  )
}

export default PasswordInput;