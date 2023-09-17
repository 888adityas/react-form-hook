"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FormEvent } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { signUpSchema, TSignUpSchema } from "@/lib/types"





const ReactHookForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
    });

    const submitHandler = async (data: TSignUpSchema) => {

        const response = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const responseData = await response.json();
        if (!response.ok) {
            alert("Submitting form error!")
            return
        }
        if (responseData.errors) {
            const errors = responseData.errors;
            if (errors.email) {
                setError("email", {
                    type: "server",
                    message: errors.email,
                });
            }else if (errors.password) {
                setError("password", {
                    type: "server",
                    message: errors.password,
                });
            }else if (errors.confirmPassword) {
                setError("confirmPassword", {
                    type: "server",
                    message: errors.confirmPassword,
                });
            }else{
                alert("something went wrong")
            }
        }
        
        reset();
    }






return (
    <div className="flex justify-center mt-7">
        <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Email
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        {
                        ...register("email")
                        }
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="email" />
                    {errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>}
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                        Password
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        {
                        ...register("password")
                        }
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" />
                    {errors.password && <p className="text-red-500">{`${errors.password.message}`}</p>}
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="confirm-password">
                        Confirm Password
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        {
                        ...register("confirmPassword")
                        }
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="confirm-password" type="password" />
                    {errors.confirmPassword && <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>}
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
                <label className="md:w-2/3 block text-gray-500 font-bold">
                    <input className="mr-2 leading-tight" type="checkbox" />
                    <span className="text-sm">
                        Send me your newsletter!
                    </span>
                </label>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button disabled={isSubmitting}
                        className="shadow bg-purple-500  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:bg-gray-500">
                        Sign Up
                    </button>
                </div>
            </div>
        </form>

    </div>
)
};



export default ReactHookForm;