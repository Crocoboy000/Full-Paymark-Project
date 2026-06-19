import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Home",
  description:
    "Paymark is a modern financial management platform offering AI-powered insights, account tracking, seamless transfers, and smart budgeting tools to help you grow your money.",
  openGraph: {
    title: "Paymark - Modern Financial Management Platform",
    description:
      "Manage your finances with AI-powered insights, account tracking, and seamless transfers.",
  },
};

export default function Home() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://paymark.com";
  const faqs = [
    {
      question: "What is Paymark?",
      answer:
        "Paymark is a payment solution that provides cashback up to a certain limit. It is designed to help you earn cashback on your purchases. Please refer to the terms and conditions for more details.",
    },
    {
      question: "Is there a limit for cashback I can earn?",
      answer:
        "Yes, there is a limit to the cashback you can earn. Please refer to the terms and conditions for more details.",
    },
    {
      question: "Are there any account fees in Paymark?",
      answer:
        "No, there are no account fees in Paymark. You can earn cashback up to a certain limit.",
    },
    {
      question: "Why should I use Paymark?",
      answer:
        "Reach, leverages AI-optimized cold email campaigns to elevate your business. We provide tailored strategies that enhance outreach and increase your business's visibility.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Paymark",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            description:
              "Modern financial management platform with AI-powered insights, account tracking, and seamless transfers.",
            url: siteUrl,
            offers: [
              {
                "@type": "Offer",
                price: "2",
                priceCurrency: "USD",
                name: "Starter Plan",
                description:
                  "Full-featured banking essentials with 1.5% Cash Back Rewards",
              },
              {
                "@type": "Offer",
                price: "5",
                priceCurrency: "USD",
                name: "Professional Plan",
                description:
                  "Scale your business with 4% Cash Back Rewards and advanced capabilities",
              },
            ],
            review: [
              {
                "@type": "Review",
                author: { "@type": "Person", name: "James" },
                reviewBody:
                  "I used to dread checking my accounts, but AI budgeting tools gave me a clear picture of my spending within days.",
                reviewRating: { "@type": "Rating", ratingValue: "5" },
              },
              {
                "@type": "Review",
                author: { "@type": "Person", name: "Emma" },
                reviewBody:
                  "Before this platform I spent hours organizing invoices and payments manually. Now everything feels automatic.",
                reviewRating: { "@type": "Rating", ratingValue: "5" },
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "3",
              bestRating: "5",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
              },
            ],
          }),
        }}
      />
      <div className="flex flex-col flex-1 min-h-vh justify-start relative bg-dark-bg overflow-hidden">
       <Image src="/light.svg" alt="" className="absolute z-5 h-auto mix-blend-luminosity top-110 left-2/3 scale-1950 rounded-b-full" width={100} height={100}></Image> 
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
    </>
  );
}
