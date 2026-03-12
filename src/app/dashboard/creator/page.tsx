"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle2,
  TrendingUp,
  Users,
  Lightbulb,
  DollarSign,
  Loader2
} from "lucide-react"
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/service/creator/dashboard";

type Idea = {
  id: string;
  name: string;
  status: string;
  stageLabel: string | null;
  isPublished: boolean;
  createdAt: string;
  fundingRequired: number;
  equityOffered: number;
  totalRaised: number;
  fundingProgress: number;
  investors: any[];
}

type DashboardStats = {
  totalIdeas: number;
  totalClicksLast14Days: number;
  totalFundRaised: number;
  totalRequired: number;
  totalEquity: number;
  activeInvestors: number;
  ideas: Idea[];
}

type Investor = {
  name: string
  username: string
  invested: string
  avatarUrl?: string
}

const topInvestors: Investor[] = [
  { name: "Sarah Ahmed", username: "sarah_invests", invested: "$45,000", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" },
  { name: "Rahim Khan", username: "rahim_k", invested: "$32,500", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" },
  { name: "Nadia Chowdhury", username: "nadiac_tech", invested: "$28,000", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80" },
]

export default function CreatorDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getDashboardStats();
        setData(stats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full max-w-7xl mx-auto text-center py-12 text-red-500">
        <p>Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Creator Dashboard</h1>
          <p className="text-sm text-muted-foreground">Hello Back, Jona!</p>
        </div>
        <Button asChild size="sm" className="w-full sm:w-auto">
          <Link href="/create-project">+ Create Project</Link>
        </Button>
      </div>

      {/* Stats Cards - Smaller version */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-fuchsia-600" />
                <span className="text-sm font-medium text-muted-foreground">Project Ideas</span>
              </div>
              <span className="text-2xl font-bold">{data.totalIdeas}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">+{data.totalClicksLast14Days} last 14 days</span>
              <div className="flex items-center gap-1 text-lime-600 dark:text-lime-500">
                <TrendingUp className="h-3 w-3" />
                <span className="font-medium">--%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-muted-foreground">Funds Raised</span>
              </div>
              <span className="text-2xl font-bold">
                ${data.totalFundRaised.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Required: <span className="text-foreground font-medium">
                ${data.totalRequired.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-violet-600" />
                <span className="text-sm font-medium text-muted-foreground">Total Equity</span>
              </div>
              <span className="text-2xl font-bold">{data.totalEquity}%</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Active Investors: <span className="text-foreground font-medium">
                {data.activeInvestors}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Funding Overview */}
        <Card className="lg:col-span-3 border shadow-sm">
          <CardHeader className="pb-3 pt-4 px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Funding Overview</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">See All</Button>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            {data.ideas.length === 0 ? (
              <div className="text-center py-6 text-sm text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                No project ideas found. Create one to get started!
              </div>
            ) : (
              data.ideas.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 bg-card/50">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant={project.status === "APPROVED" ? "default" : "secondary"}
                      className="text-xs px-2.5 py-0.5"
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {project.status}
                    </Badge>
                    {project.stageLabel && (
                      <Badge variant="outline" className="text-xs px-2.5 py-0.5">
                        {project.stageLabel}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs px-2.5 py-0.5">
                      {project.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="min-w-0">
                      <h3 className="font-medium text-base leading-tight truncate">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {project.createdAt !== '0001-01-01T00:00:00Z'
                          ? new Date(project.createdAt).toLocaleDateString()
                          : 'Just now'}
                      </p>
                    </div>
                    {project.investors && project.investors.length > 0 && (
                      <div className="flex items-center -space-x-2 shrink-0">
                        {project.investors.slice(0, 3).map((investor, i) => (
                          <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-muted" />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span>{project.fundingProgress}% funded</span>
                    </div>
                    <Progress value={project.fundingProgress} className="h-1.5" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${project.totalRaised.toLocaleString()} / ${project.fundingRequired.toLocaleString()}</span>
                      <span>{project.equityOffered}% equity</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Top Investors */}
        <Card className="lg:col-span-2 border shadow-sm">
          <CardHeader className="pb-3 pt-4 px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-4 w-4" />
                Top Investors
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-3">
            {topInvestors.map((investor) => (
              <div
                key={investor.username}
                className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={investor.avatarUrl} />
                    <AvatarFallback className="text-xs">
                      {investor.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{investor.name}</p>
                    <p className="text-xs text-muted-foreground">@{investor.username}</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-500">
                  {investor.invested}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}