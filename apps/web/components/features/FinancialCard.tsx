import Image from 'next/image'
import UniqueButton from '@/components/ui/Button'

interface FinancialCardProps {
  title: string
  desc: string
  href: string
  label: string
  mainImage: string
  accentImage: string
}

export default function FinancialCard({
  title,
  desc,
  href,
  label,
  mainImage,
  accentImage,
}: FinancialCardProps) {
  return (
      <div className='bg-[url("/finanCard.svg")] card pointer-events-auto bg-cover bg-center h-55 sm:h-60 md:h-65 lg:h-70 xl:h-75 flex justify-between items-center py-2 px-2 max-w-[90%]  md:w-[85%] lg:max-w-[75%] shadow-xs shadow-light/20 rounded-2xl'>
        {/* Text + Button */}
        <div className='flex flex-col gap-6 md:gap-8 lg:gap-9 p-3 md:p-4 lg:p-5 max-w-[50%] md:max-w-[45%]'>
          <div className='flex flex-col gap-1 justify-start'>
            <h3 className='text-[14px] financial-title sm:text-caption md:text-h5 lg:text-h4 font-normal w-35 sm:w-40 md:w-54 lg:w-60'>
              {title}
            </h3>
            <p className='text-[9px] financial-desc md:text-[12px] lg:text-[14px] font-light text-light/50'>
              {desc}
            </p>
          </div>
          <UniqueButton
            className='w-20 md:w-22 lg:w-25 financial-btn font-medium h-7 md:h-8 shadow-inner shadow-dark/80 text-[10px] md:text-[11px] lg:text-[12px]'
            label={label}
            href={href}
          />
        </div>

        {/* Images */}
        <div className='relative h-full'>
          <Image
            src={mainImage}
            alt='financial card main'
            width={500}
            height={500}
            className='financial-card-main-img  h-full w-full object-contain'
          />
          <Image
            src={accentImage}
            alt='financial card accent'
            width={500}
            height={500}
            className='financial-card-accent-img  w-14 md:w-16 lg:w-20 absolute -left-4 md:-left-5 bottom-3 md:bottom-4 lg:bottom-5'
          />
        </div>

      </div>
  )
}