import { quickActions } from "@/context/dashboardData";


export function QuickActions() {
  return (
    <aside
      className="
        rounded-3xl
        border border-white/[0.05]
        bg-[linear-gradient(135deg,#0E0E0E,#141414)]
        p-5
      "
    >
      <header className="mb-5">
        <h3 className="text-body font-medium text-white">
          Quick Actions
        </h3>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              className="
                flex items-center gap-3
                rounded-2xl
                border border-white/[0.04]
                bg-white/[0.02]
                p-4
                transition
                hover:border-[var(--primary)]
              "
            >
              <Icon
                size={16}
                className="text-[var(--primary)]"
              />

              <span className="text-caption text-white">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        className="
          mt-5 w-full
          text-caption
          text-[var(--secondary)]
        "
      >
        View All Actions
      </button>
    </aside>
  );
}