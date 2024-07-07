'use client'
import React, { useState } from 'react'
import SuccessModal from './Components/SuccessModal'
import ErrModal from './Components/ErrModal'
import { User } from 'react-feather'

export default function Forgot() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [resetError, setResetError] = useState("")

    const handleForgot = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch("api/forgot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                setShowModal(true)
                setResetError('')
            } else {
                setResetError(data.error)
            }
            setLoading(false)
        } catch (error) {
            setResetError(error.error)
        }
    }

    const toggleShowModal = () => {
        setShowModal(prev => !prev)
    }

    return (
        <div className='bg-black h-screen flex justify-center items-center'>
            {showModal ? <SuccessModal email={email} close={toggleShowModal} /> : null}
            <div class="rounded-lg h-min py-10 bg-card text-card-foreground shadow-sm mx-auto max-w-sm" data-v0-t="card">
                <div class="flex flex-col p-6 space-y-1">
                    <h3 class="whitespace-nowrap tracking-tight text-2xl font-bold">Forgot password</h3>
                    <p class="text-sm text-muted-foreground">Enter your email below to reset your password</p>
                </div>
                <div class="p-6">
                    <form class="space-y-4" onSubmit={handleForgot}>
                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="email"
                            >
                                Email
                            </label>
                            <div className='w-full flex relative'>
                                <User className='absolute mt-2 ml-3' />
                                <input
                                    type="email"
                                    class="flex h-10 w-full rounded-md bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="email"
                                    placeholder="m@example.com"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required="true"
                                />
                            </div>
                            {resetError && <div className='text-red-500 text-xs mt-2'>{resetError}</div>}
                        </div>
                        <button
                            class="inline-flex items-center justify-center mt-4 font-bold whitespace-nowrap rounded-md text-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-primary-foreground hover:bg-primary/90 h-10 px-4 py-4 w-full"
                            type="submit"
                        >{!loading ?
                            "Reset Password"
                            :
                            "Sending..."
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
