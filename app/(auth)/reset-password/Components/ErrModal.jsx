import React from 'react'

export default function ErrModal({ close, error }) {
    return (
        <div className='fixed left-0 top-0 w-full h-full  bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center bg-card px-2 py-2 text-white'>
            <div>
                <div className="p-6">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">An Error Occured</h2>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
                <div>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-card-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        onClick={close}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div >
    )
}
