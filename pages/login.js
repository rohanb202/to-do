import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { userState } from "../atoms/userAtom";
import { tagsData } from "../atoms/tagsAtom";
import Head from "next/head";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [tags, setTags] = useRecoilState(tagsData);
  const [msg, setMsg] = useState(null);
  const onSubmit = async (data) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const dataUser = await response.json();
    setUser(dataUser);
    setTags(dataUser.tags);
    if (dataUser?.token) {
      router.push("/");
    } else {
      setMsg(dataUser.error);
    }
  };
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>To Do | Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="absolute inset-0 h-[60vh] w-[50vw] min-h-[400px] min-w-[300px] max-w-[450px] flex flex-col items-center justify-center m-auto rounded-lg shadow-lg">
        <h1 className="py-5 text-3xl font-semibold">Log In</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6"
        >
          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              autoComplete="off"
              type="email"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              {...register("email", { required: true })}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...register("password", { required: true })}
            />
          </label>

          <div className="flex items-center justify-around space-x-2">
            <button
              type="submit"
              className="w-full py-2 text-white bg-green-600 rounded-lg"
            >
              Log In
            </button>
          </div>
        </form>
        <h1>
          Don&apos;t have an account yet?{" "}
          <button
            className="py-2 text-blue-400"
            onClick={() => router.push("/register")}
          >
            Sign Up
          </button>
        </h1>
        {msg && <h1 className="py-2 text-red-500">{msg}</h1>}
      </div>
    </div>
  );
}

export default Login;
