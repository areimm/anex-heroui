"use client";
import { Home, Inbox, Settings, User } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Users",
    url: "/users",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },

  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export default function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar className="border-r-4 border-gray-700 w-64">
        <SidebarContent className="text-white bg-anex-bg">
          {/* Logo Section */}

          {/* Menu Section */}
          <SidebarGroup>
            <SidebarGroupContent className="rounded-lg bg-anex-side pb-2">
              <div className="flex justify-center items-center p-4 border-b border-gray-400">
                <Image
                  src="/anex.png"
                  alt="Logo"
                  width={100}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              
              {/* <SidebarGroupLabel className="text-white">
                Application
              </SidebarGroupLabel> */}

              <SidebarMenu className="mt-1">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
