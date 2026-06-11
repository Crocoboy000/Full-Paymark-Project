import Image from "next/image";
import AuthNavbar from "@/components/features/auth/AuthNavbar";
import Providers from "./providers";



type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  
  
  return (
    <div
      className="
      relative h-full
        overflow-hidden
        bg-dark
        flex-1 flex-col
        text-light
      "
    >
      {/* Ambient glow */}
       <Image src="/light.svg" alt="Background" className="absolute z-5 h-auto mix-blend-luminosity top-110 left-2/3 scale-1950 rounded-b-full" width={100} height={100}></Image> 
       <div className=" bg-gradient-to-br from-transparent from-20% filter blur-[200px] to-primary absolute top-0 w-150 opacity-70 right-1/6 rounded-full h-100 z-0"></div>
        <div className=" bg-gradient-to-br from-transparent from-20% filter blur-[300px] to-secondary absolute top-0 w-150 opacity-70 left-1 lg:left-1/4 rounded-full h-100 z-2"></div>
        <div className=" bg-gradient-to-t from-dark from-20% to-transparent absolute inset-0 z-8"></div>


      {/* Page Container */}
      <div
        className="
        relative z-10
        mx-auto
        flex min-h-screen
        max-w-7xl
        flex-col
        px-4
        "
      >
         {/* <div
    className="
      pointer-events-none
      bg-primary
      absolute
      top-0
      left-1/2
      -translate-x-1/2
      transform 
      border-light
      size-50
      z-20
    "
  />  */}
        <AuthNavbar />


        <main
          className="
          mx-auto
        flex w-full
        flex-1
        flex-col items-center md:gap-8
        md:flex-row lg:justify-between
        h-vh
          "
        >
      <Providers >
          {children}
      </Providers>
        </main>
      </div>
    </div>
  );
}