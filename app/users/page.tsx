import Image from "next/image";
import { Button, ButtonGroup } from "@heroui/button";
import AppSidebar from "@/components/sidebar";
import DataTable from "@/components/data-table";


  

export default function Home() {
  return (
    <div className="dark grid grid-cols-[250px_1fr] min-h-screen bg-anex-bg text-white">
      <aside className="text-white p-4">
        <AppSidebar  />
   
      </aside>
      <main className="">
      <div className="mb-8 bg-anex-bg" >
        <DataTable />
        </div>
        
       
      </main>
    </div>
  );
}
