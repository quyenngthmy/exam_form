import React, { useState } from "react";
function CurrentUser(){
    if(localStorage.currentUser != "") {
        var parseUser = JSON.parse(localStorage.currentUser)
    } 

    const handleLogout = () => {
        localStorage.setItem("currentUser", "");
    }

    return(
        <div className="mx-auto w-full xl:max-w-7xl">
            <div className="flex flex-col items-center justify-center p-4 min-h-screen lg:p-8">
                <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 lg:max-w-3xl">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="flex justify-between w-full">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                User Information
                            </h1>
                            {localStorage.currentUser != "" &&
                                <button onClick={handleLogout}>
                                    <a href="./" className="flex items-center gap-2">
                                        Log out
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                    </a>
                                </button>
                            }
                        </div>
                        <div className="flex w-full">
                            {localStorage.currentUser != "" 
                            ?
                                <div className="flex w-full">
                                    { parseUser.map((user, key) => {
                                        return (
                                            <div key={key} className="flex flex-col gap-3 text-base w-full">
                                                {user.name && 
                                                    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 xl:grid-cols-5">
                                                        <p>
                                                            Fullname:
                                                        </p>
                                                        <p className="break-all col-span-2 md:col-span-3 xl:col-span-4">
                                                            {user.name}
                                                        </p>
                                                    </div>
                                                }
                                                {user.username &&
                                                    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 xl:grid-cols-5">
                                                        <p>
                                                            Username:
                                                        </p>
                                                        <p className="break-all col-span-2 md:col-span-3 xl:col-span-4">
                                                            {user.username}
                                                        </p>
                                                    </div>
                                                }
                                                {user.email &&
                                                    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 xl:grid-cols-5">
                                                        <p>
                                                            Email:
                                                        </p>
                                                        <p className="break-all col-span-2 md:col-span-3 xl:col-span-4">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                }
                                                {user.phone && 
                                                    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 xl:grid-cols-5">
                                                        <p>
                                                            Phone:
                                                        </p>
                                                        <p className="break-all col-span-2 md:col-span-3 xl:col-span-4">
                                                            {user.phone}
                                                        </p>
                                                    </div>
                                                }
                                                {user.address &&
                                                    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 xl:grid-cols-5">
                                                        <p>
                                                            Address:
                                                        </p>
                                                        <p className="break-all col-span-2 md:col-span-3 xl:col-span-4">
                                                            {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}
                                                        </p>
                                                    </div>
                                                }
                                                {user.website &&
                                                    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 xl:grid-cols-5">
                                                        <p>
                                                            Website:
                                                        </p>
                                                        <p className="break-all col-span-2 md:col-span-3 xl:col-span-4">
                                                            {user.website}
                                                        </p>
                                                    </div>
                                                }
                                                {user.company &&
                                                    <div className="grid grid-cols-3 gap-3 md:grid-cols-4 xl:grid-cols-5">
                                                        <p>
                                                            Company:
                                                        </p>
                                                        <p className="break-all col-span-2 md:col-span-3 xl:col-span-4">
                                                            {user.company.name}
                                                        </p>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            :
                                <div>
                                    You must <a href="./" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </div>
                            }
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CurrentUser;