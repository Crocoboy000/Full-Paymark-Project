import type {
  FAQItem,
  FinancialCardItem,
  FooterLinkSection,
  NavItem,
  PricingPlanItem,
  StreamlineCardItem,
  TestimonialItem,
} from "./types";

export const homeData = {
  navItems: [
    { label: "Home", link: "/", additional: false },
    { label: "About", link: "/about", additional: false },
    { label: "Pages", link: "/pages", additional: true },
    { label: "Features", link: "/features", additional: false },
    { label: "Career", link: "/career", additional: false },
  ] satisfies NavItem[],

  brands: [
    "/logos/attracts.svg",
    "/logos/exon.svg",
    "/logos/elio.svg",
    "/logos/relax.svg",
    "/logos/olab.svg",
  ],

  financialCards: [
    {
      title: "Plan For The Future",
      desc: "Make monthly contributions to your savings to prepare for significant expenses (like taxes) and leverage profits to support your growth.",
      href: "/",
      label: "Learn More",
      mainImage: "/family.png",
      accentImage: "/fund.svg",
    },
    {
      title: "Highlight The Key Elements",
      desc: "Set up a checking account for each spending category. Automate fund allocations to ensure smooth business operations.",
      href: "/",
      label: "Learn More",
      mainImage: "/highlightimg.png",
      accentImage: "/income.svg",
    },
    {
      title: "View Weekly Transaction Dynamics",
      desc: "Get a clear snapshot of how your transactions trend each week, helping you spot patterns, track growth, and make smarter financial decisions",
      href: "/",
      label: "Learn More",
      mainImage: "/finanimg.png",
      accentImage: "/streamline.svg",
    },
  ] satisfies FinancialCardItem[],

  cardsList: [
    {
      title: "Send & Receive Payments Seamlessly",
      desc: "Set auto-transfer rules and send free USD wires.",
      img: "/streamline.png",
    },
    {
      title: "Organize Your Payment",
      desc: "Immediately group your transactions to make it easy",
      img: "/counter.png",
    },
    {
      title: "Unlock Cards Earlier with Low Deposit Minimums",
      desc: "Unlock credit cards earlier with industry-low deposit minimums",
      img: "/cards.png",
    },
  ] satisfies StreamlineCardItem[],

  pricingPlans: [
    {
      title: "Starter",
      price: 2,
      desc: "Full-featured banking essentials with no strings attached.",
      featured: false,
      features: [
        "1.5% Cash Back Rewards",
        "Hundreds of millions protected by FDIC insurance",
        "Instant ACH transfers for just $1",
        "Domestic wire transfers available for $6",
        "Unlimited virtual card options",
        "International wire transfers at $25",
      ],
    },
    {
      title: "Professional",
      price: 5,
      desc: "Scale your business with advanced industry-specific capabilities.",
      featured: true,
      features: [
        "4% Cash Back Rewards",
        "Hundreds of millions protected by FDIC insurance",
        "Same-day ACH transfers for only $0,5",
        "Domestic wire transfers for a fee of $3",
        "Unlimited access to virtual cards",
        "International wire transfers for $20",
      ],
    },
  ] satisfies PricingPlanItem[],

  testimonials: [
    {
      author: "James",
      title: "Finally Found the Solution",
      image: "/James.png",
      review:
        "I used to dread checking my accounts, but AI budgeting tools gave me a clear picture of my spending within days. Now I actually look forward to managing my money.",
    },
    {
      author: "Emma",
      title: "Saved Hours Every Week",
      image: "/Emma.png",
      review:
        "Before this platform I spent hours organizing invoices and payments manually. Now everything feels automatic and much less stressful.",
    },
    {
      author: "Sophia",
      title: "Actually Easy To Use",
      image: "/Sophia.png",
      review:
        "Most finance tools felt complicated. This one finally made things simple enough that I started tracking everything consistently.",
    },
  ] satisfies TestimonialItem[],

  faqs: [
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
  ] satisfies FAQItem[],

  footerLinks: [
    {
      title: "Pages",
      links: ["Home", "About", "Features", "Pricing", "Integration"],
    },
    {
      title: "Inner Pages",
      links: ["Pricing Single", "Cookie Policy", "404"],
    },
    {
      title: "Other Pages",
      links: ["Early Access", "Terms & Condition"],
    },
    {
      title: "Utility Pages",
      links: ["Style Guide", "License", "Changelog"],
    },
  ] satisfies FooterLinkSection[],

  socials: ["Fb", "Ig", "X", "In"],
} as const;
