import React from 'react'
import UniqueButton from '@/components/ui/Button';
import { homeData } from '@/context/homeData';








const { pricingPlans } = homeData;

function Pricing() {
  return (
    <div className="
    text-light
    max-w-7xl
    mx-auto
    relative
    flex
    flex-col
    items-center
    gap-16
    px-8
    py-24
    overflow-hidden
    ">

      {/* Background Blur */}

      {/* Heading */}

      <div className="flex flex-col gap-4 items-center">

        <h2 className="
        text-h3
        md:text-h2
        lg:text-h2
        text-center
        ">
          Pricing that Match with you
        </h2>

        <p className="
        text-[12px]
        md:text-body
        text-gray1
        text-center
        w-90
        ">
          Access robust banking services for free,
          with advanced financial workflows
          starting at just $35/month.
        </p>

      </div>


      {/* Cards */}

      <div className="
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-8
      w-full
      ">

        {pricingPlans.map((plan,index)=> (

          <div
          key={index}

          className={`
          relative
          rounded-[36px]
          border
          overflow-hidden
          sm:w-[75%]
          md:w-[60%]
          lg:w-full
           mx-auto
          p-8

          ${plan.featured
            ? `
            border-primary/20
            bg-[url("/planbg.svg")]
            bg-cover
            bg-center

            `
            :
            `
            border-white/5
            bg-dark-bg
            `
          }
          `}
          >

            {/* Featured Glow */}

            {plan.featured && (

              <>
                <div className="
                absolute
                bottom-[-70px]
                left-1/2
                -translate-x-1/2
                w-[280px]
                h-[120px]
                bg-primary
                blur-[80px]
                opacity-70
                rounded-full
                "/>

                <div className="
                absolute
                top-0
                right-0
                w-[300px]
                h-[300px]
                rounded-full
                bg-secondary/10
                blur-[120px]
                "/>

                {/* floating squares */}

                <div className="
                absolute
                right-20
                top-28
                size-10
                bg-white/5
                "/>

                <div className="
                absolute
                right-8
                top-36
                size-8
                bg-white/5
                "/>

              </>
            )}

            <div className="relative z-10">

              <h3 className="
              text-h4
              md:text-h3
              ">
                {plan.title}
              </h3>

              <p className="
              text-caption
              text-gray1
              mt-3
              max-w-[320px]
              ">
                {plan.desc}
              </p>

              {/* Price */}

              <div className="
              flex
              items-end
              mt-10
              ">

                <span className="
                text-[72px]
                leading-none
                font-medium
                ">
                  ${plan.price}
                </span>

                <span className="
                text-gray1
                mb-3
                ">
                  /month
                </span>

              </div>


              <div className="
              h-px
              bg-white/5
              my-8
              "/>


              <h4 className="
              text-h5
              mb-6
              ">
                What You Get
              </h4>


              <div className="
              flex
              flex-col
              gap-4
              ">

                {plan.features.map((feature,i)=> (

                  <div
                  key={i}
                  className="
                  flex
                  items-center
                  gap-3
                  text-gray2
                  "
                  >

                    <div className="
                    size-5
                    rounded-full
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-[10px]
                    ">
                      ✓
                    </div>

                    {feature}

                  </div>

                ))}

              </div>




                <UniqueButton className="
                mt-10
                w-full
                rounded-full
                border
                border-white/10
                py-4
                hover:bg-white/5
                transition
                "
                label={plan.featured ? "Get Started Today!" : "Get Basic"}
                href="/"
                >
                </UniqueButton>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Pricing