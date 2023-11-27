import React from "react";
function CurrentUser(){
    const parseUser = JSON.parse(localStorage.currentUser)
    return(
        <div class="mx-auto w-full xl:max-w-7xl">
            <div class="flex flex-col items-center justify-center p-4 min-h-screen lg:p-8">
                <div class="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 lg:max-w-3xl">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="flex justify-between w-full">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                User Information
                            </h1>
                            <button>
                                <a href="./" className="flex items-center gap-2">
                                    Log out
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                </a>
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>You just logged in with username: <span className="font-medium">{parseUser.username}</span></p>
                            <div className="text-base text-gray-500 dark:text-gray-400">
                                Create another account <span> <a href="./register.html" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CurrentUser;