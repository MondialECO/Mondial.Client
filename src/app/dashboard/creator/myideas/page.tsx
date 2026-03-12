"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import IdeaCard from "@/components/founder/idea-card"
import Link from "next/link";
import { getDashboardMyIdeas } from "@/service/creator/dashboard";
import { format } from "date-fns";

export default function MyIdeasPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [ideas, setIdeas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const data = await getDashboardMyIdeas();
        setIdeas(data || []);
      } catch (error) {
        console.error("Failed to fetch ideas", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [])

  const mappedIdeas = ideas.map((apiIdea, index) => {
    let cardStatus: "approved" | "pending" | "rejected" = "pending";
    const apiStatus = apiIdea.status ? apiIdea.status.toUpperCase() : "DRAFT";
    if (apiStatus === "APPROVED") cardStatus = "approved";
    if (apiStatus === "REJECTED") cardStatus = "rejected";
    if (apiStatus === "DRAFT") cardStatus = "pending";

    const statusBadges = [];
    if (apiIdea.stageLabel) {
      statusBadges.push({ label: `Stage: ${apiIdea.stageLabel}`, color: "amber" });
    }
    statusBadges.push({
      label: apiIdea.isPublished ? "Published" : "Draft",
      color: apiIdea.isPublished ? "teal" : "default"
    });

    let createdDate = "Just now";
    const dateStr = apiIdea.creatdate || apiIdea.createdAt;
    if (dateStr && dateStr !== "0001-01-01T00:00:00Z") {
      try {
        createdDate = format(new Date(dateStr), 'MMM dd, yyyy');
      } catch (e) {
        createdDate = "Just now";
      }
    }

    let marketSizeText = apiIdea.marketSize || "";
    if (typeof document !== 'undefined') {
      const temp = document.createElement("div");
      temp.innerHTML = marketSizeText;
      marketSizeText = temp.textContent || temp.innerText || "";
    } else {
      marketSizeText = marketSizeText.replace(/<[^>]*>?/gm, '');
    }

    return {
      id: apiIdea.id || index,
      title: apiIdea.name || "Untitled Idea",
      status: cardStatus,
      statusBadges: statusBadges,
      views: apiIdea.views || 0,
      fundRaised: typeof apiIdea.totalRaised === 'number' ? `$${apiIdea.totalRaised.toLocaleString()}` : null,
      fundGoal: typeof apiIdea.fundingRequired === 'number' ? `$${apiIdea.fundingRequired.toLocaleString()}` : null,
      investors: apiIdea.investors ? apiIdea.investors.length : 0,
      equity: typeof apiIdea.equity === 'number' ? `${apiIdea.equity}%` : '0%',
      createdDate: createdDate,
      marketSize: marketSizeText,
      offeredEquity: typeof apiIdea.equityOffered === 'number' ? `${apiIdea.equityOffered}%` : '0%',
      pauseInfo: false,
    };
  });

  const filteredIdeas = mappedIdeas.filter(idea => {
    if (activeTab === "overview") return true;
    if (activeTab === "pause") return idea.pauseInfo === true;
    return idea.status === activeTab;
  });

  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">
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
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
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
              asChild
            >
              <Link href="/create-project">
                {/* <Plus size={18} /> */}
                + Create Idea
              </Link>
            </Button>
          </div>
        </div>

        {/* Ideas List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            <p className="text-slate-500 text-sm">Loading your ideas...</p>
          </div>
        ) : filteredIdeas.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 mx-auto max-w-2xl mt-8">
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="text-xl text-slate-400">💡</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No ideas found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              You haven't created any ideas yet, or none match the selected filter.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              asChild
            >
              <Link href="/create-project">
                Start a New Idea
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea as any} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
