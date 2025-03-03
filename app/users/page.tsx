"use client";
import AppSidebar from "@/components/sidebar";
import DataTable from "@/components/data-table";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@heroui/react";


export default function Home() {
  const { isLoading } = useAuth();

  if (isLoading) {
    // Yönlendirme sırasında yükleme ekranı göster
    return (
      <div className=" min-h-screen flex items-center justify-center bg-anex-bg text-white">
             <Spinner color="primary" />

      </div>
    );
  }
  return (
    <div className="dark  grid grid-cols-[250px_1fr] min-h-screen bg-anex-bg text-white">
        <AppSidebar  />
   
      <main className="">
      <div className="mb-8 bg-anex-bg" >
        <DataTable />
        </div>
        
       
      </main>
    </div>
  );
}
