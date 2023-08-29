"use client"

import { logIn } from "@/redux/features/authSlice";
import { CheckCardInput } from "@/utils/Validation";
import useUpdate from "@/utils/useUpdate";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

const InputCard = ({ setInputCard }) => {

    const user = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const { values, handleChange } = useUpdate({
        seller: "",
        buyer: "",
        sellingDate: "",
        dueDate: "",
        dueDay: "",
        weight: "",
        outPercentage: "",
        outWeight: "",
        netWeight: "",
        price: "",
        lessPercentage: 0,
        totalAmount: "",
        brokerage: "",
        brokerageAmt: "",
        pendingAmount: "",
        paidDate: "",
        paidAmount: "",
        paymentRemarks: [],
        fullpaymentDone: false,
        brokerpaymentDone: false,
    });

    const SaveEdit = async () => {
        const validationResponse = CheckCardInput(values);
        console.log(user);
        if (user && Object.keys(user).length>0 && validationResponse === "Success") {

            const updatedCard = {
                ...values,
                pendingAmount: values.totalAmount,
            };

            setIsLoading(true);
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/addcard`, {
                    user_id: user._id,
                    values: updatedCard
                });

                if (response?.status === 200 && response?.data?.message) {
                    alert(response?.data?.message);
                    dispatch(logIn({ ...user, cards: [updatedCard, ...user.cards] }));
                    setInputCard(false);
                } else {
                    alert(response?.data?.error);
                }
            } catch (error) {
                alert("Error Accured Contact Developer");
            } finally {
                setIsLoading(false);
            }
        }
        else if(!user){
            alert("Login first");
        }
    }

    useEffect(() => {
        if (values.sellingDate.length > 0 && values.dueDate.length > 0) {
            const startDate = new Date(values.sellingDate);
            const endDate = new Date(values.dueDate);

            const differenceInMillis = endDate - startDate;
            const dd = differenceInMillis / (1000 * 60 * 60 * 24);
            handleChange({ target: { name: "dueDay", value: dd } });
        }
    }, [values.sellingDate, values.dueDate]);

    useEffect(() => {
        if (values.weight > 0 && values.outPercentage > 0) {
            const ow = (values.weight * values.outPercentage) / 100;
            const nw = values.weight - ow;
            handleChange([{ name: "netWeight", value: parseFloat(nw.toFixed(7)) }, { name: "outWeight", value: parseFloat(ow.toFixed(7)) }]);
        } else {
            handleChange([{ name: "netWeight", value: "" }, { name: "outWeight", value: "" }])
        }
    }, [values.weight, values.outPercentage])

    useEffect(() => {
        if (values.netWeight > 0 && values.price > 0 && values.lessPercentage > 0) {
            const ta = (values.netWeight * values.price) - (values.netWeight * values.lessPercentage);
            handleChange([{ name: "totalAmount", value: parseFloat(ta.toFixed(2)) }]);
        } else {
            handleChange([{ name: "totalAmount", value: "" }]);
        }
    }, [values.price, values.lessPercentage, values.netWeight])

    useEffect(() => {
        if (values.totalAmount > 0 && values.brokerage > 0) {
            const ba = (values.totalAmount * values.brokerage) / 100;
            handleChange([{ name: "brokerageAmt", value: parseFloat(ba.toFixed(2)) }]);
        } else {
            handleChange([{ name: "brokerageAmt", value: "" }]);
        }
    }, [values.totalAmount, values.brokerage])

    return (
        <div>
            <div className="rounded-lg bg-popup shadow-2xl py-5 px-4">
                <div className="sm:m-2 flex mb-8 justify-between items-center">
                    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-blue sm:tracking-wider">Input Card</h2>
                    <div className="cursor-pointer" onClick={() => setInputCard(false)}>
                        <FaTimes className="w-4 h-4 md:w-5 md:h-5 opacity-60" />
                    </div>
                </div>
                <div className="sm:mb-2 sm:mx-2 mb-3 sm:mt-8 flex justify-between">
                    <div className="flex flex-col justify-between gap-y-2 w-full">
                        <div className="flex gap-x-1 sm:gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Seller:</h1>
                            <input
                                className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-full lg:w-1/2 rounded-md focus:outline-none"
                                type="text"
                                name="seller"
                                value={values.seller}
                                onChange={handleChange}
                                placeholder="Seller Name"
                            />
                        </div>
                        <div className="flex gap-x-1 sm:gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Buyer:</h1>
                            <input
                                className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-full lg:w-1/2 rounded-md focus:outline-none"
                                type="text"
                                name="buyer"
                                value={values.buyer}
                                onChange={handleChange}
                                placeholder="Buyer Name"
                            />
                        </div>
                    </div>

                </div>

                <div className="sm:m-2 mb-3 flex justify-between border-t-2 border-brown pt-3 gap-x-3 md:gap-x-5 lg:gap-x-10">
                    <div className="flex flex-col lg:flex-row w-1/3 md:gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base ">Selling Date:</h1>
                        <input
                            className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-full rounded-md focus:outline-none"
                            type="date"
                            name="sellingDate"
                            value={values.sellingDate}
                            max={values.dueDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row w-1/3 md:gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base ">Due Date:</h1>
                        <input
                            className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-full rounded-md focus:outline-none"
                            type="date"
                            name="dueDate"
                            value={values.dueDate}
                            min={values.sellingDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row w-1/3 md:gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base ">Due Day:</h1>
                        <input
                            className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-full rounded-md focus:outline-none"
                            type="number"
                            name="dueDay"
                            value={values.dueDay}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                </div>

                <div className="sm:m-2 mb-3 flex justify-between border-t-2 border-brown pt-3 gap-x-1 md:gap-x-5 lg:gap-x-10">
                    <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base">Weight:</h1>
                        <div className="flex gap-x-1 md:gap-x-2 items-center justify-center w-full">
                            <input
                                className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                type="number"
                                name="weight"
                                value={values.weight}
                                onChange={handleChange}
                                placeholder="Weight"
                            />
                            <h1 className="text-gray-600 text-xs sm:text-base">kg</h1>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base ">Out(%):</h1>
                        <div className="flex gap-x-1 md:gap-x-2 items-center justify-center w-full">
                            <input
                                className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                type="number"
                                name="outPercentage"
                                value={values.outPercentage}
                                onChange={handleChange}
                                placeholder="Out(%)"
                            />
                            <h1 className="text-gray-600 text-xs sm:text-base">%</h1>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 text-center items-center">
                        <h1 className="text-gray-600 text-xs sm:text-base ">Out Weight:</h1>
                        <div className="flex gap-x-1 md:gap-x-2 items-center justify-center w-full">
                            <input
                                className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                type="number"
                                name="outWeight"
                                value={values.outWeight}
                                onChange={handleChange}
                                disabled
                            />
                            <h1 className="text-gray-600 text-xs sm:text-base">kg</h1>
                        </div>
                    </div>
                </div>

                <div className="sm:m-2 border-t-2 border-brown pt-3 flex flex-col gap-y-2">
                    <div className="flex flex-row gap-x-1 md:gap-x-5 lg:gap-x-10 mb-1">
                        <div className="flex flex-col lg:flex-row w-1/3 text-center gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Net Weight:</h1>
                            <div className="flex gap-x-1 w-full md:gap-x-2 items-center justify-center">
                                <input
                                    className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="netWeight"
                                    value={values.netWeight}
                                    onChange={handleChange}
                                    disabled
                                />
                                <h1 className="text-gray-600 text-xs sm:text-base">kg</h1>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/3 text-center gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Price:</h1>
                            <div className="flex gap-x-1 w-full md:gap-x-2 items-center justify-center">
                                <input
                                    className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    max={100}
                                    min={0}
                                    placeholder="Price"
                                />
                                <h1 className="text-gray-600 text-xs sm:text-base">₹</h1>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Less(%):</h1>
                            <div className="flex gap-x-1 w-full md:gap-x-2 items-center justify-center">
                                <input
                                    className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="lessPercentage"
                                    value={values.lessPercentage}
                                    onChange={handleChange}
                                    placeholder="Less(%)"
                                />
                                <h1 className="text-gray-600 text-xs sm:text-base">%</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-1 md:gap-x-5 lg:gap-x-10 mb-1">
                        <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs hidden sm:block sm:text-base">Total Amount:</h1>
                            <h1 className="text-gray-600 text-xs block sm:hidden sm:text-base">Total Amt:</h1>
                            <div className="flex gap-x-1 w-full md:gap-x-2 items-center justify-center">
                                <input
                                    className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="totalAmount"
                                    value={values.totalAmount}
                                    onChange={handleChange}
                                    disabled
                                />
                                <h1 className="text-gray-600 text-xs sm:text-base">₹</h1>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs sm:text-base">Brokerage:</h1>
                            <div className="flex gap-x-1 w-full md:gap-x-2 items-center justify-center">
                                <input
                                    className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="brokerage"
                                    value={values.brokerage}
                                    onChange={handleChange}

                                />
                                <h1 className="text-gray-600 text-xs sm:text-base">%</h1>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row w-1/3 gap-x-2 items-center">
                            <h1 className="text-gray-600 text-xs hidden sm:block sm:text-base">Brokerage Amt:</h1>
                            <h1 className="text-gray-600 text-xs block sm:hidden">Brok Amt:</h1>
                            <div className="flex gap-x-1 w-full md:gap-x-2 items-center justify-center">
                                <input
                                    className="text-xs sm:text-base px-2 py-1 md:px-3 md:py-1 w-4/6 sm:w-full rounded-md focus:outline-none"
                                    type="number"
                                    name="brokerageAmt"
                                    value={values.brokerageAmt}
                                    onChange={handleChange}
                                    disabled
                                />
                                <h1 className="text-gray-600 text-xs sm:text-base">₹</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-2 mt-6 sm:mt-4 flex gap-x-3 sm:gap-x-6 cursor-pointer sm:w-1/2">
                    <div className="px-1 py-1 md:py-2 sm:px-2 rounded-lg text-common text-base sm:text-xl tracking-wider text-center bg-blue w-full" onClick={SaveEdit}>
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            "Save"
                        )}
                    </div>
                    <div className="px-1 py-1 md:py-2 sm:px-2 rounded-lg text-common text-base sm:text-xl tracking-wider text-center bg-blue w-full" onClick={() => setInputCard(false)}>Cancel</div>
                </div>
            </div>
        </div>
    );
};

export default InputCard;