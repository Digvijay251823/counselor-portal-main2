import { useGlobalState } from "@/Components/context/state";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, useState } from "react";

function PasswordToggleComp({
  password,
  setPassword,
}: {
  password: string;
  setPassword: (value: string) => void;
}) {
  const { state } = useGlobalState();
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <div className="relative">
      <label htmlFor="password" className={`block mb-2 text-sm font-medium `}>
        Password
      </label>
      <input
        type={togglePassword ? "text" : "password"}
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        className={`border sm:text-sm rounded-lg block w-full p-2.5 focus:ring-4 outline-none ${
          state.theme.theme === "LIGHT"
            ? "bg-stone-50 border-stone-300 text-stone-900 focus:ring-purple-100 focus:border-purple-500"
            : "bg-stone-700 border-stone-600 placeholder-stone-400  focus:ring-purple-950 focus:border-purple-500"
        }`}
        required
      />
      <p
        className="absolute top-10 right-0 mx-5"
        onClick={() => setTogglePassword(!togglePassword)}
      >
        {!togglePassword ? (
          <EyeIcon className="h-5 w-5" />
        ) : (
          <EyeSlashIcon className="h-5 w-5" />
        )}
      </p>
    </div>
  );
}

export default PasswordToggleComp;
