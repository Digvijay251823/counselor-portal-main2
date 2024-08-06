import { ChangeEvent } from "react";
import { useGlobalState } from "../context/state";

export default function ChildrenAdd({ formData, setFormState }: any) {
  const { state } = useGlobalState();
  const handleInputChangeChildrens = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newChildren = [...formData.children];
    newChildren[index][name] = value;

    setFormState({
      ...formData,
      children: newChildren,
    });
  };

  // Function to handle adding a new child
  const addNewChild = () => {
    setFormState((prevState: any) => ({
      ...prevState,
      children: [...prevState.children, { name: "", age: "" }],
    }));
  };
  const removeChild = (index: number) => {
    setFormState((prevState: any) => ({
      ...prevState,
      children: prevState.children.filter((_: any, i: any) => i !== index),
    }));
  };
  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {formData.children.map((child: any, index: any) => (
          <div
            key={index}
            className={`${
              state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
            } p-5 flex-col gap-5 rounded-3xl`}
          >
            <div className="flex items-center justify-between">
              <div className="bg-purple-500 text-white p-1 rounded-full px-3 flex items-center w-max gap-5">
                <p>child</p>
                <p>{index + 1}</p>
              </div>
              <button
                className={`${
                  state.theme.theme === "LIGHT"
                    ? "bg-red-500 text-white"
                    : "bg-red-700 text-white"
                } px-2 py-1.5 rounded-full`}
                onClick={() => removeChild(index)}
              >
                - Remove
              </button>
            </div>
            <div className="flex flex-col gap-2 ">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={child.name}
                onChange={(event) => handleInputChangeChildrens(index, event)}
                className={`${
                  state.theme.theme === "LIGHT"
                    ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                    : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
                }`}
                required
                id="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                value={child.age}
                onChange={(event) => handleInputChangeChildrens(index, event)}
                className={`${
                  state.theme.theme === "LIGHT"
                    ? "bg-white px-4 py-2 border border-purple-200 text-lg rounded-xl focus:ring-4 focus:ring-purple-200 outline-none focus:border-purple-700"
                    : "bg-stone-950 px-4 py-2 border border-stone-800 text-lg rounded-xl focus:ring-4 focus:ring-purple-950 outline-none focus:border-purple-400"
                }`}
                required
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className={`px-5 py-1.5 font-semibold rounded-lg ${
          state.theme.theme === "LIGHT"
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
        onClick={addNewChild}
      >
        + ADD
      </button>
    </div>
  );
}
