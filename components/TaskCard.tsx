"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import TaskModal from "@/components/TaskModal";

interface TaskCardProps {
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  assignedTo: string;
  deadline: string;
  showDate?: boolean;
}

// 📌 Duruma göre renkler (Sol altta yuvarlak alan için)
const statusColors = {
  todo: "bg-red-500",
  inprogress: "bg-yellow-500",
  done: "bg-green-500",
};

export default function TaskCard({ title, description, status, assignedTo, deadline, showDate }: TaskCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card className="relative mb-4 shadow-md bg-anex-accent p-4 overflow-hidden">
        <CardContent className="flex justify-between items-center">
          <div>
            <h3 className="text-white font-medium">{title}</h3>
          </div>

          {/* More Options Icon */}
          <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" onClick={() => setModalOpen(true)} />
        </CardContent>

        {/* 📌 Kartın Sağ Alt Köşesinde Tarih Gösterme */}
        {showDate && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {new Date(deadline).toLocaleDateString("tr-TR")}
          </div>
        )}

        {/* 📌 Kartın Sol Alt Köşesinde Renk Alanı (Senin Eklediğin) */}
        <div className={`absolute bottom-0 left-0 w-6 h-6 ${statusColors[status]} rounded-r-lg`}></div>

        {/* Modal */}
        <TaskModal 
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)}
          title={title}
          description={description}
          status={status}
          assignedTo={assignedTo}
          deadline={deadline}
        />
      </Card>
    </>
  );
}
