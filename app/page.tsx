import Image from "next/image";
import { Button, ButtonGroup } from "@heroui/button";
import AppSidebar from "@/components/sidebar";
import Chart from "@/components/data-chart";
import MonthChart from "@/components/month-chart";
import DareaChart from "@/components/area-chart";
import PieChart from "@/components/pie-chart";

  

export default function Home() {
  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-anex-bg text-white">
      <aside className="text-white p-4">
        <AppSidebar  />
   
      </aside>
      <main className="p-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4" >
          <MonthChart />
          <DareaChart />
          <PieChart />
        </div>
        
       
      </main>
    </div>
  );
}
