import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/home/Hero";
import Brands from "@/components/features/Brands";
import Financial from "@/components/sections/home/Financial";
import Blow from "@/components/sections/home/Blow";
import Streamline from "@/components/sections/home/Streamline";
import Princing from "@/components/sections/home/Princing";
import Testimonials from "@/components/sections/home/Testimonials";
import FAQ from "@/components/sections/home/FAQ";
import Offer from "@/components/sections/home/Offer";
import Footer from "@/components/layout/Footer";




export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-vh justify-start relative bg-dark-bg overflow-hidden">
       <Image src="/light.svg" alt="Background" className="absolute z-5 h-auto mix-blend-luminosity top-110 left-2/3 scale-1950 rounded-b-full" width={100} height={100}></Image> 
       <div className=" bg-gradient-to-br from-transparent from-20% filter blur-[200px] to-primary absolute top-0 w-150 opacity-70 right-1/6 rounded-full h-100 z-0"></div>
        <div className=" bg-gradient-to-br from-transparent from-20% filter blur-[300px] to-secondary absolute top-0 w-150 opacity-70 left-1 lg:left-1/4 rounded-full h-100 z-2"></div>
        <div className=" bg-gradient-to-t from-dark-bg from-80% to-transparent absolute inset-0 z-8"></div>
      <Navbar />
        <main className="flex flex-col justify-start w-full z-10 max-w-7xl mx-auto relative items-center">
          <Hero />
          <Brands />
          <Financial />
          <div className="min-w-screen relative max-w-7xl bg-dark">
            <div className='bg-[url("/noiseimg.svg")] bg-center bg-cover z-12 absolute inset-0 opacity-50' />
{/* <div className="absolute left-0 top-0 w-60 sm:w-72 md:w-80 lg:w-96">
  <div className="relative w-full h-64 overflow-hidden"> 
    <Image
      src="/leftVec.svg"
      alt="blow"
      fill
      className="absolute inset-0 object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-l from-dark from-20% to-transparent z-8" />
    <Image src="/Lflash1.svg" alt="blow" width={500} height={300} className='z-4 absolute -left-2 -top-12 w-20 sm:w-70 md:w-80 lg:w-80' />
    <Image src="/Lflash2.svg" alt="blow" width={500} height={300} className='z-4 absolute -left-2 top-8 w-20 sm:w-70 md:w-80 lg:w-80' />
    <Image src="/Lflash3.svg" alt="blow" width={500} height={300} className='z-4 absolute left-4 top-41 w-20 sm:w-70 md:w-80 lg:w-80' />
  </div>
</div> */}

                
                <Image src="/leftV.svg" alt="blow" width={500} height={300} className='z-12 absolute left-0 top-0 w-60 sm:w-70 md:w-80 lg:w-90' />
                <Image src="/rightVec.svg" alt="blow" width={500} height={300} className='z-12 absolute right-0 bottom-0 w-60 sm:w-70 md:w-80 lg:w-90' />
          <Blow />
          </div>
          <Streamline />
          <div className="w-screen relative">
                  <div className="
      absolute
      -bottom-15
      left-1/2
      -translate-x-1/2
      w-screen
      h-50
      filter
      blur-[120px]
      opacity-40
      rounded-full
      bg-primary
      pointer-events-none
      "/>
          <Princing />
          </div>
          <div className="w-screen flex items-center z-8 flex-col bg-dark relative">
          <Testimonials />
          <FAQ />
          </div>
          <div className="w-screen relative">
            <div className=" bg-gradient-to-br from-transparent from-20% filter blur-[450px] to-gray2 absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full  rounded-full h-100 z-0"></div>
            <div className=" bg-gradient-to-br from-transparent from-20% filter blur-[450px] to-secondary absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full rounded-full h-100 z-0"></div>
            <div className="bg-gradient-to-b from-dark from-20% to-transparent absolute inset-0 z-8" />
            <Offer />
          </div>
        </main>
        <footer className="w-screen z-20 bg-dark relative">
        <Footer />
        </footer>
    </div> 
  );
}
