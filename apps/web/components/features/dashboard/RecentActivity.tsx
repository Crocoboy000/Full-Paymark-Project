import { activities } from "@/context/dashboardData";




export function RecentActivity() {
  return (
    <aside
      className="
        flex-1
        rounded-3xl
        border border-white/[0.05]
        bg-[linear-gradient(135deg,#0E0E0E,#141414)]
        p-5
      "
    >
      <header className="mb-5">
        <h3 className="text-body font-medium text-white">
          Recent Activity
        </h3>
      </header>

      <ul className="space-y-5">
        {activities.map((activity) => (
          <li
            key={activity.title}
            className="flex justify-between gap-3"
          >
            <div>
              <p className="text-caption text-white">
                {activity.title}
              </p>

              <p className="text-[12px] text-[var(--gray3)]">
                {activity.date}
              </p>
            </div>

            <span
              className={
                activity.positive
                  ? "text-emerald-400"
                  : "text-[var(--secondary)]"
              }
            >
              {activity.amount}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}