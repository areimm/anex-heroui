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
}

// 📌 Duruma göre renkler (Sol alt köşeye yaslı oval alan)
const statusColors = {
  todo: "bg-red-500",
  inprogress: "bg-yellow-500",
  done: "bg-green-500",
};

export default function TaskCard({ title, description, status, assignedTo, deadline }: TaskCardProps) {
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

        {/* 📌 Sol Alt Köşeye Yaslı Oval Renk Alanı (YAZISIZ) */}
        <div className={`absolute bottom-0 left-0 w-6 h-6 ${statusColors[status]} rounded-r-lg`}></div>
      </Card>

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
    </>
  );
}
