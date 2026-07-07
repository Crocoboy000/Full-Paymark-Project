import React from 'react'
import UniqueButton from '@/components/ui/Button';
import  Image  from 'next/image';

function Blow() {
  return (
    <div id="features" className='text-light bg-dark max-w-7xl mx-auto relative flex flex-col justify-center items-center w-full h-200 max-h-200 md:h-screen'>
        <div className=" bg-gradient-to-r from-transparent from-20% filter blur-[90px] to-[#FFAA58] absolute top-1/3 w-50 rounded-full h-50 z-0"></div>
        <div className=" bg-gradient-to-l from-transparent from-20% filter blur-[90px] to-[#FF584E] absolute top-1/3 w-50   rounded-full h-50 z-0"></div>
        <div className=" bg-gradient-to-b from-dark from-10% via-transparent via-80% to-dark absolute inset-0 z-8"></div>
        <h2 className='text-h5 font-medium text-center z-30 w-80 sm:w-100 sm:text-h4 md:w-140 md:text-[38px] lg:text-h3 lg:w-120'>Who Says a Banking Platform Can&apos;t Blow Your Mind?</h2>
        <p className='text-[10px] text-light/60 text-center z-30 w-80 lg:text-caption lg:w-150'>We care a lot. And you’ll feel it in everything we do. With Rho, feel seen & taken care of across every step of the startup journey (not just your finances).</p>
        <UniqueButton className='mt-8 z-12' label="Send Code" href="/#features" />

        <Image src="/Glowfeature.svg" alt="blow" width={500} height={300} className='z-12 absolute top-12 right-6 w-50 sm:w-50 md:w-60 lg:w-75' />
        <Image src="/info.svg" alt="blow" width={500} height={300} className='z-12 absolute bottom-1/12 left-8 w-70 sm:w-70 md:w-80 lg:bottom-3 lg:w-105' />
        <Image src="/transinfo.svg" alt="blow" width={500} height={300} className='z-12 absolute top-6 left-6 w-45 bottom-1/6 sm:w-50 md:w-60 lg:w-89' />
        <Image src="/transaction.svg" alt="blow" width={500} height={300} className='z-12 absolute bottom-25 right-32 w-80 hidden lg:flex' />
    </div>
  )
}

export default Blow
