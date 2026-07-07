
import { homeData } from "@/context/homeData";
import Image from "next/image";
import { cn } from '@/lib/utils';

const { cardsList } = homeData;

function Streamline() {
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
      w-full
      md:px-5
      px-1
      md:py-16
      py-12
    ">

      {/* Heading */}

      <div className="flex flex-col items-center gap-3">

        <h2 className="
          text-center
          text-h5
          sm:text-h4
          md:text-h3
          lg:text-h2
          leading-h3
        ">
          Streamline Financial Zero Hassle
        </h2>

        <p className="
          text-caption
          md:text-body
          text-center
          max-w-[650px]
          text-light/60
        ">
          We respond quickly, tackle what matters most,
          and are dedicated to your success.
        </p>

      </div>


      {/* Grid */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        w-full
        h-full
      ">

        {cardsList.map((card, index) => (

          <div
            key={index}
            className={`
              relative
              rounded-xl
              md:rounded-3xl
              overflow-hidden
              border
              border-white/5
              max-w-[80%]
              sm:max-w-[55%]
              md:min-w-full
              mx-auto

              ${
                index === 2
                  ? " md:col-span-2"
                  : ""
              }
            `}
          >

            <div className={cn("relative w-full", index === 2 ? "aspect-8/2" : " aspect-4/2")}>
              <Image
                src={card.img}
                alt={card.title}
                fill
                quality={100}
                className="object-cover"
              />
            </div>

            <div className="
              p-6
              flex
              flex-col
              gap-2
              text-center
            ">

              <h3 className="
                text-h5
                md:text-h4
                leading-h4
              ">
                {card.title}
              </h3>

              <p className="
                text-[12px]
                md:text-body
                text-light/60
              ">
                {card.desc}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Streamline;