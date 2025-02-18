"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Home, Users, MailCheck } from "lucide-react";

import { SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Listbox, ListboxItem } from "@heroui/react";
import { Divider } from "@heroui/react";

// Menü öğeleri
const items = [
  { title: "Home", url: "/", icon: Home, key: "home" },
  { title: "Users", url: "/users", icon: Users, key: "users" },
  { title: "Tasks", url: "/tasks", icon: MailCheck, key: "tasks" },
];

export default function AppSidebar() {
  const pathname = usePathname();

  // 📌 İlk state'i pathname'e göre belirle (Home yerine direkt o anki sayfa)
  const getCurrentKey = () => {
    const currentItem = items.find((item) => item.url === pathname);
    return currentItem ? currentItem.key : "home";
  };

  const [selectedKeys, setSelectedKeys] = useState(new Set([getCurrentKey()]));

  useEffect(() => {
    setSelectedKeys(new Set([getCurrentKey()]));
  }, [pathname]);

  return (
    <SidebarProvider>
      <Sidebar className="w-64 md:w-20 lg:w-64 transition-all duration-300 border-none overflow-hidden">
        <SidebarContent className="text-white bg-anex-bg shadow-none">
          {/* Menü Bölümü */}
          <SidebarGroup>
            <SidebarGroupContent className="rounded-lg bg-anex-side pb-2">
              {/* Logo Bölümü */}
              <div className="flex justify-center items-center mt-3 mb-3">
                <Image
                  src="/anex.png"
                  alt="Logo"
                  width={100}
                  height={40}
                  className="h-10 w-auto md:hidden lg:block"
                />
              </div>

              <Divider className="" />
              <Listbox
                disallowEmptySelection
                aria-label="Sidebar menu"
                selectionMode="single"
                variant="flat"
                onSelectionChange={(keys) =>
                  setSelectedKeys(new Set(Array.from(keys) as string[]))
                }
                classNames={{
                  base: "w-full",
                }}
              >
                {items.map((item) => (
                  <ListboxItem
                    key={item.key}
                    className={`flex justify-center md:justify-start px-4 py-2 mb-2 rounded-lg transition ${
                      selectedKeys.has(item.key)
                        ? "bg-gray-700 text-white font-semibold"
                        : "bg-transparent"
                    }`}
                  >
                    <a href={item.url} className="flex items-center gap-2 w-full">
                      <item.icon className="w-5 h-5" />
                      <span className="hidden md:hidden lg:inline">{item.title}</span>
                    </a>
                  </ListboxItem>
                ))}
              </Listbox>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
