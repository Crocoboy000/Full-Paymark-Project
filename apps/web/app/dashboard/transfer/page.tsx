"use client";

import TransferForm from "@/components/features/transaction/TransferForm";

export default function TransferPage() {
  return (
    <main className="mx-auto flex w-full min-h-screen max-w-3xl items-center justify-center overflow-hidden px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,137,117,.15),transparent_60%)]" />
      <div className="bg-gradient-to-br from-transparent from-20% filter blur-[200px] to-primary absolute top-0 w-150 opacity-70 right-1/6 rounded-full h-100 z-0" />
      <div className="bg-gradient-to-br from-transparent from-20% filter blur-[300px] to-secondary absolute top-0 w-150 opacity-70 left-1 lg:left-1/4 rounded-full h-100 z-2" />
      <div className="bg-gradient-to-t from-dark from-20% to-transparent absolute inset-0 z-8" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,137,117,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,137,117,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <section className="relative z-10 flex h-full w-full flex-col justify-center overflow-hidden rounded-2xl bg-transparent p-6">
        <TransferForm />
      </section>
    </main>
  );
}
