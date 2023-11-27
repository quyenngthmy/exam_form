import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import callApi from "../api";
import LoginSuccess from "./LoginSuccess";
import LoginFail from "./LoginFail";
import ForgotPassword from "./ForgotPassword";
import illustration from '../img/illustration.png';

function FormLogin(){
    const REGEX_PASSWORD = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/;
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue
      } = useForm();
    const initialValues = {username: "", password: "", remember: false};
    const [formValues, setFormValues] = useState(initialValues);
    const [notiSuccess, setNotiSuccess] = useState(false);
    const [notiFail, setNotiFail] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [getData, setGetData] = useState({});
    const [hidePassword, setHidePassword] = useState(true);

    const onSubmit = () => {
        const values = getValues();
        setFormValues(values);
        if(formValues.remember) {
            localStorage.setItem("rememberUser", JSON.stringify(formValues));
        }
        localStorage.setItem("currentUser", JSON.stringify(formValues));
        // filter user
        let getDataUser = getData.data.filter(user => user.username.toLowerCase() == formValues.username.toLowerCase())
        if(getDataUser.length > 0 && formValues.password.length >= 6 && REGEX_PASSWORD.test(formValues.password)) {
            setNotiSuccess(true);
            setNotiFail(false);
        } else {
            setNotiFail(true);
            setNotiSuccess(false);
        }
    };

    // call APi get data
    const callAPI = async () => {
        let APIGetData = await callApi(`/users`,"GET");
        setGetData(APIGetData)
    }

    // show modal forgot password
    const handleForgotPw = () => {
        setForgotPassword(!forgotPassword);
    };
    
    // hide and show password
    const handleHidePassword = () => {
        const pwEl = document.querySelector("#password");
        if(hidePassword) {
            pwEl.type = "text"
        } else {
            pwEl.type = "password"
        }
        setHidePassword(!hidePassword);
    }

    useEffect(() => {
        callAPI();
        const getReUser = localStorage.getItem("rememberUser");
        if(getReUser) {
            const parseUser = JSON.parse(getReUser);
            setValue('username', parseUser.username)
            setValue('password', parseUser.password)
            setValue('remember', parseUser.remember)
        }
    }, []);

    return(
        <div className="mx-auto w-full xl:max-w-7xl">
            <div className="grid grid-cols-1 px-6 py-8 h-screen lg:grid-cols-2">
                <div className="hidden w-full lg:flex">
                    <div className="relative w-full pt-[50%]">
                        <img className="absolute top-0 left-0 w-full h-full object-contain" src={illustration} alt=""/>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-6" action="#">
                                <div className={errors.username &&  "error" }>
                                    <label htmlFor="username" className="label-input">
                                        Username
                                    </label>
                                    <input className="input-el"
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        {...register("username", {
                                            required: true,
                                        })}
                                    />
                                    {errors.username?.type === "required" && (
                                        <p className="errorMsg">Username is required.</p>
                                    )}
                                </div>
                                <div className={errors.password &&  "error" }>
                                    <label htmlFor="password" className="label-input">
                                        Password
                                    </label>
                                    <div className="relative flex items-center" >
                                        <input className="input-el"
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            {...register("password", {
                                                required: true,
                                                validate: {
                                                    checkLength: (value) => value.length >= 6,
                                                    matchPattern: (value) =>
                                                    REGEX_PASSWORD.test(
                                                        value
                                                    )
                                                }
                                            })}
                                        />
                                        <button type="button" onClick={handleHidePassword} className="flex absolute right-3">
                                            {hidePassword && <i className="fa-regular fa-eye-slash"></i>}
                                            {!hidePassword && <i className="fa-regular fa-eye"></i>}
                                        </button>
                                    </div>
                                    {errors.password?.type === "required" && (
                                        <p className="errorMsg">Password is required.</p>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-3 items-start">
                                        <button className="flex items-center h-5">
                                            <input id="remember"
                                            aria-describedby="remember" 
                                            type="checkbox" 
                                            className="cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            {...register("remember")}
                                            />
                                        </button>
                                        <label htmlFor="remember" className="text-sm text-gray-500 dark:text-gray-300 cursor-pointer">Remember me</label>
                                    </div>
                                    <button type="button" onClick={handleForgotPw} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</button>
                                </div>
                                <button onClick={onSubmit}
                                type="submit" 
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Sign in
                                </button>
                                {notiFail && <LoginFail/>}
                                {notiSuccess && <LoginSuccess formValues={formValues}/>}
                                {forgotPassword &&
                                <div className="fixed bg-black/10 inset-0 mx-auto w-full h-full z-50">
                                    <div className="flex justify-center items-center w-full h-full px-4">
                                        <div className="flex flex-col items-center gap-5 w-full bg-white rounded-xl p-6 md:p-8 md:pb-12 md:w-1/2 max-w-full lg:max-w-xl">
                                            <button type="button" onClick={handleForgotPw} className="flex w-full justify-end text-3xl font-medium text-neutral-900 ">
                                                X
                                            </button>
                                            <ForgotPassword/>
                                        </div>
                                    </div>
                                </div>
                                }
                            </form>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <a href="./register.html" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormLogin;