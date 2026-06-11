'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { PlusIcon, MinusIcon } from '@/components/ui/Icons'
import { homeData } from '@/context/homeData'

const { faqs } = homeData

export default function FAQ() {

  const containerRef = useRef<HTMLDivElement>(null)

  const [openIndex, setOpenIndex] =
    useState<number | null>(null)

  const rowRefs =
    useRef<Array<HTMLDivElement | null>>([])

  const contentRefs =
    useRef<Array<HTMLDivElement | null>>([])

  const plusRefs =
    useRef<Array<HTMLElement | null>>([])

  const minusRefs =
    useRef<Array<HTMLElement | null>>([])

  const tlRefs =
    useRef<Array<gsap.core.Timeline | null>>([])


  useGSAP(() => {

    gsap.from(
      rowRefs.current,
      {

        opacity: 0,

        y: 50,

        stagger: .12,

        duration: .9,

        ease: "power3.out"

      }
    )


    faqs.forEach((_, i) => {

      const row = rowRefs.current[i]
      const content = contentRefs.current[i]
      const plus = plusRefs.current[i]
      const minus = minusRefs.current[i]

      if (
        !row ||
        !content ||
        !plus ||
        !minus
      ) return

      gsap.set(content, {

        height: 0,

        opacity: 0,

        overflow: "hidden",

        y: -10

      })

      gsap.set(minus, {

        opacity: 0,

        scale: .4,

        rotate: -90

      })

      const tl =
        gsap.timeline({

          paused: true,

          defaults: {

            ease: "power4.out"

          }

        })

      tl

        .to(
          row,
          {
            duration: .45
          },
          0
        )

        .to(
          plus,
          {

            opacity: 0,

            scale: .4,

            rotate: 120,

            duration: .22,

            ease: "back.in(2)"

          },
          0
        )

        .to(
          minus,
          {

            opacity: 1,

            scale: 1,

            rotate: 0,

            duration: .45,

            ease: "back.out(2)"

          },
          0
        )

        .to(
          content,
          {

            height: () => content.scrollHeight,

            opacity: 1,

            y: 0,

            duration: .55,

            ease: "power3.out"

          },
          0
        )

      tlRefs.current[i] = tl


      const enter = () => {

        gsap.to(
          row,
          {


            scale: 1.05,

            duration: .25,

            ease: "power2.out"

          }
        )

      }

      const leave = () => {

        gsap.to(
          row,
          {
            scale: 1,

            duration: .25

          }
        )

      }

      row.addEventListener(
        'mouseenter',
        enter
      )

      row.addEventListener(
        'mouseleave',
        leave
      )

    })

  }, { scope: containerRef })


  useGSAP(() => {

    tlRefs.current.forEach(
      (tl, i) => {

        if (!tl) return

        if (i === openIndex)
          tl.play()

        else
          tl.reverse()

      }
    )

  }, [openIndex])


  const handleClick =
    (i: number) => {

      setOpenIndex(
        prev =>
          prev === i
            ? null
            : i
      )

    }


  return (

    <div

      ref={containerRef}

      className='
max-w-7xl
mx-auto
text-light

px-6
md:px-10

py-20

flex
flex-col

gap-25

overflow-hidden
'

    >

      <h1 className='
text-h3
md:text-h2
font-medium
text-center
'>

        Frequently Asked Questions

      </h1>


      <div className='
flex
flex-col

lg:flex-row

gap-12

items-start
'>

        <Image

          src='/FAQ.svg'

          alt='FAQ'

          width={500}

          height={300}

          className='
hidden
lg:flex
lg:max-w-[480px]
h-auto
'

        />


        <div className='
w-full
flex
flex-col
gap-5
'>

          {faqs.map(
            (faq, i) => (

              <div key={i}>
                <div

                  key={i}

                  ref={el => {
                    rowRefs.current[i] = el as HTMLDivElement 
                  }}
                  

                  onClick={() =>
                    handleClick(i)
                  }

                  className='

w-full

flex

justify-around

items-start

gap-6

px-8

py-5

rounded-3xl




cursor-pointer

backdrop-blur-sm

transition-colors

duration-300
'

                >

                  <div className='flex-1'>

                    <h2 className='
text-h5
md:text-h4
'>

                      {faq.question}

                    </h2>


                    <div

                      ref={el =>
                      {
                        contentRefs.current[i] = el as HTMLDivElement 
                      }
                      }

                      className='
mt-4

text-[12px]

md:text-caption

leading-relaxed

text-light/70
'

                    >

                      <div className='pb-2'>

                        {faq.answer}

                      </div>

                    </div>

                  </div>



                  <div className='
relative

size-10

rounded-full

border

border-white/10

flex

items-center

justify-center

shrink-0
'>

                    <span

                      ref={el =>{
                        plusRefs.current[i] = el as HTMLSpanElement 
                      }
                      }

                      className='absolute'

                    >

                      <PlusIcon className='w-5 h-5' />

                    </span>


                    <span

                      ref={el => {
                        minusRefs.current[i] = el as HTMLSpanElement 
                      }}

                      className='absolute'

                    >

                      <MinusIcon className='w-5 h-5' />

                    </span>

                  </div>

                </div>

                {
                  i !== faqs.length - 1 && (
                    <div className='bg-light/10 h-[1.2px] w-full mx-auto' />
                  )
                }
              </div>
            ))}

        </div>

      </div>

    </div>

  )

}