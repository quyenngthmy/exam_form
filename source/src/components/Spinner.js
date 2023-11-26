import React from "react";
function Loader(){
    return(
    <div className="fixed bg-black/20 inset-0 mx-auto w-full h-full z-50">
        <div className="flex justify-center items-center w-full h-full min-h-screen px-4">
            <div class="loader"></div>
        </div>
    </div>
    )
}
export default Loader;