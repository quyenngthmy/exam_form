import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import RegisterSuccess from "./RegisterSuccess";
import Spinner from "./Spinner";
import callApi from "../api";

function FormRegister(){
    const REGEX_PASSWORD = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/;
    const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const REGEX_PHONE = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const REGEX_TEXT = /^[a-zA-ZĐđÀ-ỹ\s]{1,30}$/;
    const REGEX_TEXT_NUMBER = /^[a-zA-Z0-9ĐđÀ-ỹ\s]+$/u;
   
    const initialValues = {
        username: "", 
        firstname: "", 
        lastname: "", 
        email: "", 
        password: "", 
        phone: "", 
        address: {suite: "",
        street: "",
        city: ""}
    };
    const [formValues, setFormValues] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        watch, 
        reset,
        getValues,
        getFieldState
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            username: "", 
            firstname: "", 
            lastname: "", 
            email: "", 
            password: "", 
            phone: "", 
            address: {suite: "",
            street: "",
            city: ""}
            }
    });

    // dùng để check confirm password
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = async () => {
        const values = getValues();
        setFormValues(values)
        // api post thông tin user vừa đăng kí
        let APIPostData = await callApi(`/users`,"POST",
       {
           "name": values.firstname + " " + values.lastname,
           "username": values.username,
           "email": values.email,
           "phone": values.phone,
           "address": {
                suite: values.address.suite,
                street: values.address.street,
                city: values.address.city,
           }
       })

       .then((res) => {
           setLoading(true);
           setTimeout(() => {
               setLoading(false);;
               setSuccess(true);
           }, 1000);
           reset();
       })
       .catch((err) => {
           console.log(err);
           
       });
    };

   // when formState is not subscrbeid, you can supply formState as argument
   getFieldState(formValues, touchedFields);

   return(
        <div className="mx-auto w-full xl:max-w-7xl">
            <div className="flex flex-col items-center justify-center p-4 min-h-screen lg:p-8">
                <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 lg:max-w-3xl">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-6" action="#">
                            <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
                                <div className={errors.firstname &&  "error" }>
                                    <label htmlFor="firstname" className="label-input label-input-required">
                                        First Name
                                    </label>
                                        <input className="input-el"
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            placeholder="First Name"
                                            {...register("firstname", {
                                                required: "First Name is required.",
                                                pattern: {
                                                    value: REGEX_TEXT,
                                                    message: "First Name is not valid."
                                                },
                                            })}
                                        />
                                    {errors.firstname && <p className="errorMsg">{errors.firstname.message}</p>}
                                </div>
                                <div className={errors.lastname &&  "error" }>
                                    <label htmlFor="lastname" className="label-input label-input-required">
                                        Last Name
                                    </label>
                                    <input className="input-el"
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
                                    {errors.lastname && <p className="errorMsg">{errors.lastname.message}</p>}
                                </div>
                                <div className="lg:col-span-2">
                                    <div className={errors.username &&  "error" }>
                                        <label htmlFor="username" className="label-input label-input-required">
                                            Username
                                        </label>
                                        <input className="input-el"
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder="Username"
                                            {...register("username", {
                                                required: "Username is required.",
                                                pattern: {
                                                    value: REGEX_TEXT_NUMBER,
                                                    message: "Username is not valid."
                                                }
                                            })}
                                        />
                                        {errors.username && <p className="errorMsg">{errors.username.message}</p>}
                                    </div>
                                </div>
                                <div className={errors.password &&  "error" }>
                                    <label htmlFor="password" className="label-input label-input-required">
                                        Password
                                    </label>
                                    <input className="input-el"
                                        id="password"
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
                                <div className={errors.confirm_password &&  "error" }>
                                    <label htmlFor="confirm_password" className="label-input label-input-required">
                                        Confirm Password
                                    </label>
                                    <input className="input-el"
                                        id="confirm_password"
                                        type="password"
                                        name="confirm_password"
                                        placeholder="Confirm Password"
                                        {...register("confirm_password", {
                                            required: true,
                                            validate: value =>
                                            value === password.current
                                        })}
                                    />
                                    {errors.confirm_password && 
                                        <p className="errorMsg">The passwords do not match</p>
                                    }
                                </div>
                                <div className="lg:col-span-2">
                                    <div className={errors.email &&  "error" }>
                                        <label htmlFor="email" className="label-input label-input-required">
                                            Email
                                        </label>
                                        <input className="input-el"
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
                                        {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                                    </div>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className={errors.phone &&  "error" }>
                                        <label htmlFor="phone" className="label-input label-input-required">
                                            Telephone number
                                        </label>
                                        <input className="input-el"
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
                                        {errors.phone && <p className="errorMsg">{errors.phone.message}</p>}
                                    </div>
                                </div>
                                <div className="lg:col-span-2">
                                    <label className="label-input">
                                        Address
                                    </label>
                                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                                        <div className={errors.address?.suite && "error" }>
                                            <input className="input-el"
                                                type="text"
                                                name="suite"
                                                id="suite"
                                                placeholder="Suite"
                                                {...register("address.suite", {
                                                    pattern: {
                                                        value: REGEX_TEXT_NUMBER,
                                                        message: "Suite is not valid."
                                                    }
                                                })}
                                            />
                                            {errors.address?.suite && <p className="errorMsg">{errors.address?.suite.message}</p>}
                                        </div>
                                        <div className={errors.address?.street && "error" }>
                                            <input className="input-el"
                                                type="text"
                                                name="street"
                                                id="street"
                                                placeholder="Street"
                                                {...register("address.street", {
                                                    pattern: {
                                                        value: REGEX_TEXT_NUMBER,
                                                        message: "Street is not valid."
                                                    }
                                                })}
                                            />
                                            {errors.address?.street && <p className="errorMsg">{errors.address?.street.message}</p>}
                                        </div>
                                        <div className={errors.address?.city && "error" }>
                                            <input className="input-el"
                                                type="text"
                                                name="city"
                                                id="city"
                                                placeholder="City"
                                                {...register("address.city", {
                                                    pattern: {
                                                        value: REGEX_TEXT_NUMBER,
                                                        message: "City is not valid."
                                                    }
                                                })}
                                            />
                                            {errors.address?.city && <p className="errorMsg">{errors.address?.city.message}</p>}
                                        </div>
                                    </div>
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
                                        required: "By signing up, please agree to our Terms and Conditions.",
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
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?  <a href="./" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormRegister;