
import { accounts } from "@/context/dashboardData";











export function AccountsCard() {
  return (
    <section
      className="
        rounded-3xl
        col-span-12
        md:col-span-6
        xl:col-span-2
        border border-white/[0.05]
        bg-[linear-gradient(135deg,#0E0E0E,#141414)]
        p-5
      "
    >
      <header className="mb-5 flex justify-between">
        <h3 className="text-body text-white">
          Your Accounts
        </h3>

        <button className="text-caption text-[var(--secondary)]">
          View All
        </button>
      </header>

      <ul className="space-y-3">
        {accounts.map((account) => (
          <li
            key={account.name}
            className="
              flex justify-between
              rounded-2xl
              border border-white/[0.04]
              bg-white/[0.02]
              p-4
            "
          >
            <span className="text-[12px] text-white">
              {account.name}
            </span>

            <span className="text-[12px] text-white">
              {account.balance}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}