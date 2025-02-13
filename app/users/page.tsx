import Image from "next/image";
import { Button, ButtonGroup } from "@heroui/button";
import AppSidebar from "@/components/sidebar";
import DataTable from "@/components/data-table";


  

export default function Home() {
  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-anex-bg text-white">
      <aside className="text-white p-4">
        <AppSidebar  />
   
      </aside>
      <main className="p-8">
      <div className="mb-8 mt-4" >
        <DataTable />
        </div>
        
       
      </main>
    </div>
  );
}
