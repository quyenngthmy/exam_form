import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import callApi from "../api";
import LoginSuccess from "./LoginSuccess";
import LoginFail from "./LoginFail";
import ForgotPassword from "./ForgotPassword";
function FormLogin(){
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

    const initialValues = {username: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [notiSuccess, setNotiSuccess] = useState(false);
    const [notiFail, setNotiFail] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);

    const onSubmit = async () => {
        // call APi get data
        let getData = await callApi(`/users`,"GET")
        console.log(getData);
        // filter user
        let getDataUser = getData.data.filter(user => user.username == formValues.username)
        if(getDataUser.length > 0 && formValues.password != "") {
            setNotiSuccess(true);
            setNotiFail(false);
        } else {
            setNotiFail(true);
            setNotiSuccess(false);
        }
       
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleClick = () => {
        setForgotPassword(!forgotPassword);
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-6" action="#">
            <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                </label>
                <div className="input-effect">
                    <input className="input-effect-el bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        {...register("username", {
                            required: true,
                        })}
                        value={formValues.username}
                        onChange={handleChange}
                    />
                    <span className="focus-bg"></span>
                </div>
                {errors.username?.type === "required" && (
                    <p className="errorMsg">Username is required.</p>
                )}
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                </label>
                <div className="input-effect">
                    <input className="input-effect-el bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                        })}
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <span className="focus-bg"></span>
                </div>
                {errors.password?.type === "required" && (
                    <p className="errorMsg">Password is required.</p>
                )}
            </div>
            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-start">
                    <button className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                    </button>
                    <label htmlFor="remember" className="text-sm text-gray-500 dark:text-gray-300 cursor-pointer">Remember me</label>
                </div>
                <button type="button" onClick={handleClick} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</button>
            </div>
            <button onClick={onSubmit}
            type="submit" 
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in
            </button>
            {notiFail && <LoginFail/>}
            {notiSuccess && <LoginSuccess/>}
            {forgotPassword &&
            <div className="fixed bg-black/10 inset-0 mx-auto w-full h-full z-50">
                <div className="flex justify-center items-center w-full h-full">
                    <div className="flex flex-col items-center gap-5 w-1/2 bg-white rounded-xl p-6 md:p-8 md:pb-12 max-w-[435px]">
                        <button type="button" onClick={handleClick} className="flex w-full justify-end text-3xl font-medium text-neutral-900 ">
                            X
                        </button>
                        <ForgotPassword/>
                    </div>
                </div>
            </div>
            }
        </form>
    )
}
export default FormLogin;