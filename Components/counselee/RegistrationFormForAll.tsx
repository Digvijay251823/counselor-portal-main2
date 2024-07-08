import { useGlobalState } from "../context/state";

export default function RegistrationFormForAll() {
  const { state } = useGlobalState();
  return (
    <div className="w-full py-2.5 mb-5 flex flex-col gap-3">
      <div
        className={`px-5 py-1.5 text-lg font-semibold rounded-t-lg ${
          state.theme.theme === "LIGHT" ? "bg-gray-100" : "bg-stone-800"
        }`}
      >
        Please Register First Cause You Are Not Registered
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label htmlFor="firstName" className="font-bold text-lg">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-white px-4 py-1.5 border border-purple-200 text-lg rounded focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
              : "bg-stone-950 px-4 py-1.5 border border-stone-800 text-lg rounded focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
          }`}
          placeholder="John"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label htmlFor="lastName" className="font-bold text-lg">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-white px-4 py-1.5 border border-purple-200 text-lg rounded focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
              : "bg-stone-950 px-4 py-1.5 border border-stone-800 text-lg rounded focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
          }`}
          placeholder="Doe"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label htmlFor="age" className="font-bold text-lg">
          age
        </label>
        <input
          type="number"
          name="age"
          id="age"
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-white px-4 py-1.5 border border-purple-200 text-lg rounded focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
              : "bg-stone-950 px-4 py-1.5 border border-stone-800 text-lg rounded focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
          }`}
          placeholder="23"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label htmlFor="gender" className="font-bold text-lg">
          gender
        </label>
        <input
          type="text"
          name="gender"
          id="gender"
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-white px-4 py-1.5 border border-purple-200 text-lg rounded focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
              : "bg-stone-950 px-4 py-1.5 border border-stone-800 text-lg rounded focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
          }`}
          placeholder="MALE"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <label htmlFor="address" className="font-bold text-lg">
          Where do you live in pune
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className={`${
            state.theme.theme === "LIGHT"
              ? "bg-white px-4 py-1.5 border border-purple-200 text-lg rounded focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
              : "bg-stone-950 px-4 py-1.5 border border-stone-800 text-lg rounded focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
          }`}
          placeholder="Pune City"
        />
      </div>
    </div>
  );
}
