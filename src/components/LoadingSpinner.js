import React from "react";

const LoadingSpinner = ({color}) => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className={`animate-spin rounded-full h-6 w-6 border-t-4 border-${color}`}></div>
        </div>
    );
};

export default LoadingSpinner;