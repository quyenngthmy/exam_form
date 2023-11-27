import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import RegisterSuccess from "./RegisterSuccess";
import Spinner from "./Spinner";

function FormRegister(){
    const REGEX_PASSWORD = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/;
    const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const REGEX_PHONE = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const REGEX_TEXT = /^[a-zA-ZĐđÀ-ỹ\s]{2,30}$/;
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch, 
        reset,
        getValues
    } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const initialValues = {username: "", firstname: "", lastname: "", email: "", password: "", phone: "", address: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const onSubmit = () => {
        const values = getValues();
        setFormValues(values)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);;
            setSuccess(true);
        }, 1000);
        reset();
    };
  
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-6" action="#">
            <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
                <div>
                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500">
                        First Name
                    </label>
                    <div className="input-effect">
                        <input className="input-effect-el bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="First Name"
                            {...register("firstname", {
                                required: "First Name is required.",
                                pattern: {
                                    value: REGEX_TEXT,
                                    message: "First Name is not valid."
                                }
                            })}
                        />
                        <span className="focus-bg"></span>
                    </div>
                    {errors.firstname && <p className="errorMsg">{errors.firstname.message}</p>}
                </div>
                <div>
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500">
                        Last Name
                    </label>
                    <div className="input-effect">
                        <input className="input-effect-el bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="Last Name"
                            {...register("lastname", {
                                required: "Last Name is required.",
                                pattern: {
                                    value: REGEX_TEXT,
                                    message: "Last Name is not valid."
                                }
                            })}
                        />
                        <span className="focus-bg"></span>
                    </div>
                    {errors.lastname && <p className="errorMsg">{errors.lastname.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500">
                        Email
                    </label>
                    <div className="input-effect">
                        <input className="input-effect-el bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: REGEX_EMAIL,
                                    message: "Email is not valid."
                                }
                            })}
                        />
                        <span className="focus-bg"></span>
                    </div>
                    {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500">
                        Username
                    </label>
                    <div className="input-effect">
                        <input className="input-effect-el bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            {...register("username", {
                                required: "Username is required.",
                                pattern: {
                                    value: REGEX_TEXT,
                                    message: "Username is not valid."
                                }
                            })}
                        />
                        <span className="focus-bg"></span>
                    </div>
                    {errors.username && <p className="errorMsg">{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500">
                        Password
                    </label>
                    <div className="input-effect">
                        <input className="input-effect-el bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password"
                            name="password"
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
                        <span className="focus-bg"></span>
                    </div>
                    <ul className="text-slate-400 text-sm space-y-3 list-inside list-disc pt-2">
                        <li>
                            Password should be at-least 6 characters.
                        </li>
                        <li>
                            Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.
                        </li>
                    </ul>
                    {errors.password?.type === "required" && (
                        <p className="errorMsg">Password is required.</p>
                    )}
                    {errors.password?.type === "checkLength" && (
                        <p className="errorMsg">
                            Password should be at-least 6 characters.
                        </p>
                    )}
                    {errors.password?.type === "matchPattern" && (
                        <p className="errorMsg">
                            Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500">
                        Confirm Password
                    </label>
                    <div className="input-effect">
                        <input className="input-effect-el bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            {...register("confirm_password", {
                                required: true,
                                validate: value =>
                                value === password.current
                            })}
                        />
                        <span className="focus-bg"></span>
                    </div>
                    {errors.confirm_password && 
                        <p className="errorMsg">The passwords do not match</p>
                    }
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500">
                        Telephone number
                    </label>
                    <div className="input-effect">
                        <input className="input-effect-el bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="Telephone number"
                            {...register("phone", {
                                required: "Telephone number is required.",
                                pattern: {
                                    value: REGEX_PHONE,
                                    message: "Telephone number is not valid."
                                }
                            })}
                        />
                        <span className="focus-bg"></span>
                    </div>
                    {errors.phone && <p className="errorMsg">{errors.phone.message}</p>}
                </div>
                <div>
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Address
                    </label>
                    <div className="input-effect">
                        <input className="input-effect-el bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Address"
                            {...register("address", {
                                pattern: {
                                    value: /^[a-zA-Z0-9ĐđÀ-ỹ\s]+$/u,
                                    message: "Address is not valid."
                                }
                            })}
                        />
                        <span className="focus-bg"></span>
                    </div>
                    {errors.address && <p className="errorMsg">{errors.address.message}</p>}
                </div>
            </div>
            <div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                    <input id="terms" 
                    aria-describedby="terms" 
                    type="checkbox" 
                    className="cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                    {...register("terms", {
                        required: "By signing up, please agree to our Terms and Conditions.</",
                    })}
                    />
                    </div>
                    <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="cursor-pointer font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                    </div>
                </div>
                {errors.terms && <p className="errorMsg">{errors.terms.message}</p>}
            </div>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
            {success && <RegisterSuccess value={formValues}/>}
            {loading && <Spinner/>}
        </form>
    )
}
export default FormRegister;