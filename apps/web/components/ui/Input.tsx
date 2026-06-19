import { div } from 'motion/react-client'
import React from 'react'

function Input({ icon, placeholder, type, className, id, name, value, onChange, onKeyDown }: { icon?: React.ReactNode, placeholder: string, type: string, className?: string, id?: string, name: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void }) {
    return (
        <div className='flex justify-start gap-2 items-center min-w-50 relative border-[0.2] border-gray1/20 px-2 py-2 rounded-4xl '>
            <span>
            {icon}
            </span>
            <input
                type={type}
                name={name}
                className={`border-none placeholder:text-light/20 placeholder:text-medium focus:border-none hover:border-none focus:outline-none focus:ring-none hover:outline-none hover:ring-none active:border-none active:outline-none active:ring-none
               ${className}`}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

export default Input