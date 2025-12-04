import React from 'react'

export const Box = ({ bgcolor, textcolor }) => {
    return (
        <div
            style={{
                backgroundColor: bgcolor,
                color: textcolor

            }}
            className='flex flex-col max-w-7xl mx-auto w-full items-center justify-center h-[400px] text-center gap-5  rounded-2xl shadow-lg transition-shadow duration-500
            hover:shadow-2xl'>
            <h1 className='text-6xl font-semibold'>Sample Text</h1>
            <span className='text-lg  max-w-[800px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tempora labore corrupti natus ea sint voluptatem pariatur modi enim facilis.</span>
        </div>
    )
}
