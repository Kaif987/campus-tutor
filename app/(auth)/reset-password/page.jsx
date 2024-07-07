"use client"
import React, { useEffect, useState } from 'react'
import { Lock } from 'react-feather'
import { useRouter, useSearchParams } from 'next/navigation'
import SuccessModal from './Components/SuccessModal'
import ErrModal from './Components/ErrModal'

export default function page() {
    const searchParams = useSearchParams()
    const [id, setId] = useState(searchParams.get("id"))
    const [token, setToken] = useState(searchParams.get("token"))
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [errorModalMessage, setErrorModalMessage] = useState("")

    const router = useRouter()

    const close = () => {
        setShowModal(false)
        router.push("/login")
    }

    const closeErrorModal = () => {
        setErrorModalMessage("")
    }

    const handleReset = (e) => {
        e.preventDefault()
        if (!password || !confirmPassword) {
            if (!password) {
                setPasswordError("Please Enter Your Password")
            }
            if (!confirmPassword) {
                setConfirmPasswordError("Please Enter Your Password")
            }
            return;
        };

        if (password !== confirmPassword) {
            setConfirmPasswordError("Confirm Password should be same as Password")
            return;
        }

        const resetPassword = async () => {
            setPasswordError("")
            setConfirmPasswordError("")
            const response = await fetch("api/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, password, token })
            })

            const data = await response.json();
            if (response.ok) {
                setShowModal(true)
            } else {
                setErrorModalMessage(data.error)
            }
        }

        resetPassword()
    }

    return (
        <div className='bg-black h-screen flex justify-center items-center'>
            {showModal && <SuccessModal close={close} />}
            {errorModalMessage && <ErrModal close={closeErrorModal} error={errorModalMessage} />}
            <div class="rounded-lg h-min py-10 bg-card text-card-foreground shadow-sm mx-auto max-w-sm" data-v0-t="card">
                <div class="flex flex-col p-6 space-y-1">
                    <h3 class="whitespace-nowrap tracking-tight text-2xl font-bold">Reset Password</h3>
                    <p class="text-sm text-muted-foreground">Enter your new password below</p>
                </div>
                <div class="p-6">
                    <form class="space-y-4" onSubmit={handleReset} >
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="password"
                            >
                                Password
                            </label>
                            <div className='w-full flex relative'>
                                <Lock className="absolute mt-2 ml-2 text-white" />
                                <input
                                    type="password"
                                    class="flex h-10 w-full rounded-md bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="password"
                                    placeholder=""
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                            {passwordError && <div className='text-red-500 text-xs mt-2'>{passwordError}</div>}
                        </div>
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="confirm-password"
                            >
                                Confirm Password
                            </label>
                            <div className='w-full flex relative'>
                                <Lock className="absolute mt-2 ml-2 text-white" />
                                <input
                                    type="password"
                                    class="flex h-10 w-full rounded-md bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="confirm-password"
                                    placeholder=""
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                />
                            </div>
                            {confirmPasswordError && <div className='text-red-500 text-xs mt-2'>{confirmPasswordError}</div>}
                        </div>
                        <button
                            class="inline-flex items-center justify-center mt-4 font-bold whitespace-nowrap rounded-md text-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-primary-foreground hover:bg-primary/90 h-10 px-4 py-4 w-full"
                            type="submit"
                        >{!loading ?
                            "Update Password"
                            :
                            "Updating..."
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
