import React from 'react'

const DotsLoader = () => {
    return (
        <div className='flex items-center gap-1.5'>
            <div className='animate-flashing w-2 h-2 bg-white rounded-full inline-block' />
            <div className='animate-flashing delay-100 w-2 h-2 bg-white rounded-full inline-block' />
            <div className='animate-flashing delay-200 w-2 h-2 bg-white rounded-full inline-block' />
        </div>
    )
};

export default DotsLoader
