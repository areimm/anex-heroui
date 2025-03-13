"use client";

import AppSidebar from "@/components/sidebar";
import Chart from "@/components/data-chart";
import MonthChart from "@/components/month-chart";
import DareaChart from "@/components/area-chart";
import PieChart from "@/components/pie-chart";
import Negative from "@/components/negative-chart";
import { Spinner } from "@heroui/react";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { isLoading } = useAuth();

  if (isLoading) {
    // Yönlendirme sırasında yükleme ekranı göster
    return (
      <div className="min-h-screen flex items-center justify-center bg-anex-bg text-white">
             <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className="dark grid grid-cols-[250px_1fr] min-h-screen bg-anex-bg text-white">
        <AppSidebar />
      <main className="px-3 pb-3 flex flex-col">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-3 mt-2">
          <MonthChart />
          <DareaChart />
          <PieChart />
          <Negative />
        </div>
        <div className="flex flex-1">
          <Chart />
        </div>
      </main>
    </div>
  );
}
