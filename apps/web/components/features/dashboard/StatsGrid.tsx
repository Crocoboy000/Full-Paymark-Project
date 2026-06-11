import { statsCards } from "@/context/dashboardData";
import StatCard from "@/components/ui/StatCard";

export default function StatsGrid() {
  return (
    <section
      className="
        grid gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {statsCards.map((card) => (
        <StatCard
          key={card.title}
          {...card}
        />
      ))}
    </section>
  );
}