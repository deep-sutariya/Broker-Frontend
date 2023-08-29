import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-brown"></div>
        </div>
    );
};

export default LoadingSpinner;