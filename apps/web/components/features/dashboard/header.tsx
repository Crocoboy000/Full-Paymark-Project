import React from 'react'
import { SearchIcon, BellIcon } from './../../ui/Icons';
import Input from './../../ui/Input';


function Header() {
  return (
    <header className='flex text-light px-5 flex-col gap-10 justify-between'>
        <nav className='flex items-center w-full justify-end gap-7'>
            <Input icon={<SearchIcon className='size-6 opacity-25 text-light' />} name='search' placeholder='Search Anything' type='text' className='' />
            <BellIcon className='size-9 opacity-15 shrink-0 text-light' />
            <div className='flex gap-1.5'>
                <img src="/James.png" alt="User Avatar" className='size-12 shrink-0 rounded-full' />
                <div className='flex-col hidden md:flex'>
                <h3 className='text-caption md:text-body font-normal tracking-tight'>Nick Halson</h3>
                <p className='text-[12px] md:text-caption font-normal text-light/50'>Premium member</p>
                </div>
            </div>
        </nav>
        <div className='flex flex-col'>
            <h1 className='text-h5 md:text-h4 lg:text-h3 font-medium tracking-tight'>
                Good Morning, Nick Halson
            </h1>
            <p className='text-[10px] md:text-caption font-normal text-light/50'>
                Check all the growth that your financial health has experienced
            </p>
        </div>
    </header>
  )
}

export default Header