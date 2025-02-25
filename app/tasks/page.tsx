"use client";
import { useState } from "react";
import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AppSidebar from "@/components/sidebar";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Input, Spinner } from "@heroui/react";
import { useAuth } from "@/hooks/useAuth";

export default function TasksPage() {
  // 🟢 Auth kontrolü en üstte yapılmalı
  const { isLoading } = useAuth();

  // 🟢 Tüm hooklar, render'ın başında çağrılmalı
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Yeni Dashboard Tasarımı",
      description: "Admin paneli için modern UI tasarımı oluştur.",
      status: "todo" as "todo" | "inprogress" | "done",
      assignedTo: "Mehmet",
      deadline: "2025-02-20",
    },
    {
      id: 2,
      title: "API Bağlantısını Yap",
      description: "Laravel backend ile frontend API bağlantısını kur.",
      status: "inprogress" as "todo" | "inprogress" | "done",
      assignedTo: "Ahmet",
      deadline: "2025-02-22",
    },
    {
      id: 3,
      title: "Veritabanı Yapısını Kur",
      description: "MSSQL üzerinde gerekli tabloları oluştur.",
      status: "done" as "todo" | "inprogress" | "done",
      assignedTo: "Elif",
      deadline: "2025-02-18",
    },
    {
      id: 4,
      title: "Yeni Dashboard Tasarımı",
      description: "Admin paneli için modern UI tasarımı oluştur.",
      status: "inprogress" as "todo" | "inprogress" | "done",
      assignedTo: "Emre",
      deadline: "2024-02-20",
    },
  ]);

  // 🟢 Auth kontrolü sonrası loading ekranı göster
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-anex-bg text-white">
        <Spinner color="primary" />
      </div>
    );
  }

  // 🟢 Drag & Drop işlemi
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks.find(
      (task) => task.id === parseInt(result.draggableId)
    );

    if (draggedTask) {
      draggedTask.status = result.destination.droppableId;
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="dark grid grid-cols-[250px_1fr] min-h-screen bg-anex-bg text-white">
      {/* Sidebar */}
      <aside className="text-white p-4">
        <AppSidebar />
      </aside>

      {/* Ana İçerik */}
      <main className="p-4">
        {/* Başlık ve Yeni Görev Ekle Butonu */}
        <div className="items-center justify-between mb-6 grid grid-cols-3 gap-4">
          <Input
            classNames={{ inputWrapper: "bg-anex-side" }}
            isClearable
            placeholder="Search by name..."
            className="flex-1 col-span-2"
          />
          <Button className="flex items-center gap-2 col-span-1">
            <Plus className="w-5 h-5" />
            Yeni Görev Ekle
          </Button>
        </div>

        {/* Drag & Drop Context */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-4">
            {["todo", "inprogress", "done"].map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-anex-side p-4 rounded-lg min-h-[300px]"
                  >
                    <h2 className="text-lg font-semibold mb-4">
                      {status === "todo"
                        ? "Yapılacak"
                        : status === "inprogress"
                        ? "Devam Ediyor"
                        : "Tamamlandı"}
                    </h2>

                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2"
                            >
                              <TaskCard {...task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </main>
    </div>
  );
}
