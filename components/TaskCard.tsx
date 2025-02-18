"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import TaskModal from "@/components/TaskModal";

interface TaskCardProps {
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  assignedTo: string;
  deadline: string;
}

const statusColors = {
  todo: "bg-red-500",
  inprogress: "bg-yellow-500",
  done: "bg-green-500",
};

export default function TaskCard({ title, description, status, assignedTo, deadline }: TaskCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card className="mb-4 shadow-md bg-gray-900">
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <h3 className="text-white font-medium">{title}</h3>
            <Badge className={`${statusColors[status]} text-white mt-2`}>
              {status === "todo" && "Yapılacak"}
              {status === "inprogress" && "Devam Ediyor"}
              {status === "done" && "Tamamlandı"}
            </Badge>
          </div>
          <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" onClick={() => setModalOpen(true)} />
        </CardContent>
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
