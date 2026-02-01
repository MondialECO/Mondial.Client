import Topbar from "@/components/layout/Topbar";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function CreateProjectPage({
    children,
}: {  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="flex flex-1 flex-col">
          {/* Topbar only takes CONTENT width */}   
            <Topbar />
            {/* Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div>
                    
                    <h1>Create Project Page</h1>
                </div>
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}