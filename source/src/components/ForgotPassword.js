import React, { useState } from "react";

function ForgotPassword(){
    const [submitPassword, setSubmitPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    
    const handleSubmitPassword = (e) => {
        if(email == "") {
            setMessage("Please type your email.");
            setSubmitPassword(false);
        } else {
            if(!REGEX_EMAIL.test(email)) {
                setMessage("Email is not valid.");
                setSubmitPassword(false);
            }
            else {
                setMessage("");
                setTimeout(() => {
                    setSubmitPassword(true);
                }, 300);
            }
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return(
        <>
        <div className="flex flex-col gap-3 w-full">
            <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                Please enter your email address to reset for your account.
            </p>
            <input className="input-el"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
            />
           <p className="errorMsg">{message}</p>
        </div>
        <div className="flex justify-end">
            <button type="button" onClick={handleSubmitPassword} className="w-fit text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Submit
            </button>
        </div>
        {submitPassword && 
            <p className="text-base text-gray-900 dark:text-white">
                We have reset your password for you. Please check your email
            </p>
        }
        </>
    )
}
export default ForgotPassword;