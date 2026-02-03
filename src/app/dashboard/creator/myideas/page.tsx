"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import IdeaCard from "@/components/founder/idea-card"
import Link from "next/link";

export default function MyIdeasPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const ideas = [
    {
      id: 1,
      title: "Make a coffeeshop without large amount of cup",
      status: "approved",
      statusBadges: [
        { label: "Mondial", icon: true },
        { label: "Type: MVP", color: "amber" },
        { label: "Idea Online", color: "teal" },
      ],
      views: 1200,
      fundRaised: "$40000",
      fundGoal: "$60000",
      investors: 3,
      equity: "12%",
      createdDate: "April 24, 2026",
      marketSize: "35M by 2028",
      offeredEquity: "20%",
      pauseInfo: true,
    },
    {
      id: 2,
      title: "Make a coffeeshop without large amount of cup",
      status: "pending",
      statusBadges: [{ label: "Type: MVP", color: "amber" }],
      views: 1200,
      fundRaised: "$40000",
      fundGoal: "$60000",
      investors: 3,
      equity: "12%",
      createdDate: "April 24, 2026",
      marketSize: "35M by 2028",
      offeredEquity: "20%",
      pauseInfo: false,
    },
    {
      id: 3,
      title: "Make a coffeeshop without large amount of cup",
      status: "rejected",
      statusBadges: [
        { label: "Mondial", icon: true },
        { label: "Type: MVP", color: "amber" },
      ],
      views: 1200,
      fundRaised: null,
      fundGoal: null,
      investors: 3,
      equity: "12%",
      createdDate: "April 24, 2026",
      marketSize: "35M by 2028",
      offeredEquity: "20%",
      pauseInfo: false,
    },
  ]

  return (
    <main className="min-h-screen w-full bg-sidebar text-sidebar-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            My Ideas
          </h1>

          {/* Tabs + Action */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "overview", label: "Overview" },
                { id: "approved", label: "Approved" },
                { id: "pending", label: "Pending" },
                { id: "pause", label: "Pause" },
                { id: "rejected", label: "Rejected" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "bg-white text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Create Button */}
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white gap-2"
            >
              <Link href="/create-project">
                {/* <Plus size={18} /> */}
                + Create Idea
              </Link>
            </Button>
          </div>
        </div>

        {/* Ideas List */}
        <div className="space-y-5">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </main>
  )
}
