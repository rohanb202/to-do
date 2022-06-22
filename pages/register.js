import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/router";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [msg, setMsg] = useState(null);
  const onSubmit = async (data) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const dataUser = await response.json();
    if (dataUser?._id) {
      router.push("/login");
    } else {
      setMsg(dataUser?.error);
    }
  };
  return (
    <div className="w-screen h-screen">
      <div className="absolute inset-0  w-[50vw] h-[65vh]  min-w-[300px] max-w-[450px] flex flex-col items-center justify-center m-auto rounded-lg shadow-lg">
        <h1 className="py-5 text-3xl font-semibold">Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6"
        >
          <label className="block">
            <span className="text-gray-700">Name</span>
            <input
              autoComplete="off"
              type="text"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              autoComplete="off"
              type="email"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              placeholder="Password"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("password", { required: true })}
            />
          </label>

          <div className="flex items-center justify-around space-x-2">
            <button
              type="submit"
              className="w-full py-2 text-white bg-green-600 rounded-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
        {msg && <h1 className="pt-2 text-red-500">{msg}</h1>}
      </div>
    </div>
  );
}

export default Register;
