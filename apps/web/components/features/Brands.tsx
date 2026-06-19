'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { homeData } from '@/context/homeData'

const { brands } = homeData

function Brands() {

const containerRef = useRef<HTMLDivElement>(null)

useGSAP(() => {

const track =
containerRef.current?.querySelector(".brands-track")

if(!track) return

gsap.to(track,{

xPercent:-50,

duration:20,

ease:"none",

repeat:-1

})

},{scope:containerRef})

return (

<div
ref={containerRef}
className='
relative
overflow-hidden
w-full
max-w-7xl
mx-auto
py-8
'
>

        <div
className='
md:flex
hidden
absolute
left-0
top-0
z-20
h-full
w-24
bg-gradient-to-r
from-dark-bg
via-dark-bg/80
to-transparent
'
/>

        <div
className='
md:flex
hidden
absolute
right-0
top-0
z-20
h-full
w-24
bg-gradient-to-l
from-dark-bg
via-dark-bg/80
to-transparent
'
/>

<div
className='
brands-track
flex
w-max
items-center
gap-18
opacity-50
'
>

        {brands.map((logo,index)=>(

<Image
key={index}
src={logo}
alt="brand"
width={140}
height={70}
className='
w-20
md:w-24
lg:w-30
h-auto
flex-shrink-0
'
/>

))}

        {brands.map((logo,index)=>(

<Image
key={`copy-${index}`}
src={logo}
alt="brand"
width={140}
height={70}
className='
w-20
md:w-24
lg:w-30
h-auto
flex-shrink-0
'
/>

))}

</div>

</div>

)

}

export default Brands