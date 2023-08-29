"use client"
import { EmailValidator, IsNullValidator, PasswordValidator } from "@/utils/Validation"
import useForm from "@/utils/useForm"
import { useState } from "react"

import axios from 'axios';
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
require('dotenv').config();

const page = () => {
    const router = useRouter();

    const { values, handleChange } = useForm({
        fullname: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const [ErrorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullname, email, password, cpassword } = values;

        if (EmailValidator(email)) {
            if (PasswordValidator(password, cpassword)) {
                setIsLoading(true);
                try {
                    const data = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
                        name: fullname,
                        email: email,
                        password: password
                    });
                    if (data?.data?.message) {
                        setErrorMessage("");
                        alert(data?.data?.message);
                        router.push("/login");
                    }
                    else {
                        setErrorMessage(data?.data?.error);
                    }
                } catch (e) {
                    setErrorMessage("Server Error");
                } finally {
                    setIsLoading(false);
                }
            }
            else {
                setErrorMessage("Current password should match with password!")
            }
        }
        else {
            setErrorMessage("Enter valid email!");
            document.getElementById("email").focus = true;
        }
    }
    return (
        <div className="flex justify-center items-center rounded-xl h-[70vh]">
            <div className="bg-common p-7 md:p-10 rounded-md shadow-md w-[85%] sm:w-[77%] md:w-[65%] lg:w-[60%] bg-gradient-to-br from-brown to-common">
                <h2 className="text-xl sm:text-3xl font-bold mb-8 font-heading">Signup</h2>
                <form className="flex flex-col gap-y-6 form-input" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-y-4 gap-x-10 w-full">
                        <div className="flex flex-col gap-y-4 md:w-1/2">
                            <div className="gap-y-2">
                                <label htmlFor="fullname" className="font-medium text-base md:text-lg text-gray-700">Full Name</label>
                                <input type="text" id="fullname" placeholder="Enter Name" autoComplete="on" name="fullname" value={values.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brown" />
                            </div>
                            <div className="gap-y-2">
                                <label htmlFor="email" className="font-medium text-base md:text-lg text-gray-700">Email</label>
                                <input id="email" name="email" placeholder="abc@gmail.com" value={values.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brown" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-4 md:w-1/2">
                            <div className="gap-y-2">
                                <label htmlFor="password" className="font-medium text-base md:text-lg text-gray-700">Password</label>
                                <input type="password" id="password" placeholder="Create Password" name="password" value={values.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brown" />
                            </div>
                            <div className="gap-y-2">
                                <label htmlFor="cpassword" className="font-medium text-base md:text-lg text-gray-700">Confirm Password</label>
                                <input type="password" id="cpassword" placeholder="Re-enter Password" name="cpassword" value={values.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-brown" />
                            </div>
                        </div>

                    </div>
                    <div>
                        <p className=" text-red-700 text-sm sm:text-base font-heading block font-semibold mb-2">{ErrorMessage}</p>
                        <button type="submit" className="px-4 text-lg font-heading py-2 w-full transition ease-in-out duration-300 border border-1 border-brown hover:bg-brown">
                            {isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                "Signup"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page