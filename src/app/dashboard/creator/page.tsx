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
  DollarSign 
} from "lucide-react"
import Link from "next/link";


type Project = {
  status: "Approved" | "Pending"
  type: string
  title: string
  date: string
  fundedPercent: number
  raised: number
  target: number
  equity: number
  avatars: number
}

type Investor = {
  name: string
  username: string
  invested: string
  avatarUrl?: string
}

const stats = {
  projectIdeas: 3,
  viewsToday: 14,
  growth: 4.1,
  fundsRaised: 40000,
  fundsRequired: 100000,
  totalEquity: 40,
  totalInvestors: 5,
}

const projects: Project[] = [
  {
    status: "Approved",
    type: "Web",
    title: "Eco-Friendly Packaging Solutions",
    date: "15 May, 2026",
    fundedPercent: 80,
    raised: 48000,
    target: 60000,
    equity: 30,
    avatars: 3,
  },
  {
    status: "Pending",
    type: "Mobile",
    title: "AI-Driven Healthcare Diagnostics",
    date: "22 June, 2026",
    fundedPercent: 60,
    raised: 36000,
    target: 60000,
    equity: 20,
    avatars: 3,
  },
]

const topInvestors: Investor[] = [
  { name: "Sarah Ahmed", username: "sarah_invests", invested: "$45,000", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" },
  { name: "Rahim Khan", username: "rahim_k", invested: "$32,500", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" },
  { name: "Nadia Chowdhury", username: "nadiac_tech", invested: "$28,000", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80" },
]

export default function CreatorDashboard() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Creator Dashboard</h1>
          <p className="text-sm text-muted-foreground">Hello Back, Jona!</p>
        </div>
        <Button asChild size="sm">
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
              <span className="text-2xl font-bold">{stats.projectIdeas}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">+{stats.viewsToday} today</span>
              <div className="flex items-center gap-1 text-lime-600 dark:text-lime-500">
                <TrendingUp className="h-3 w-3" />
                <span className="font-medium">{stats.growth}%</span>
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
                ${stats.fundsRaised.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Required: <span className="text-foreground font-medium">
                ${stats.fundsRequired.toLocaleString()}
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
              <span className="text-2xl font-bold">{stats.totalEquity}%</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Investors: <span className="text-foreground font-medium">
                {stats.totalInvestors}
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
            {projects.map((project) => (
              <div key={project.title} className="border rounded-lg p-4 bg-card/50">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge 
                    variant={project.status === "Approved" ? "default" : "secondary"}
                    className="text-xs px-2.5 py-0.5"
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    {project.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2.5 py-0.5">
                    {project.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2.5 py-0.5">
                    Online
                  </Badge>
                </div>

                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-base leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {project.date}
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    {[...Array(project.avatars)].map((_, i) => (
                      <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-muted" />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{project.fundedPercent}% funded</span>
                  </div>
                  <Progress value={project.fundedPercent} className="h-1.5" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>${project.raised.toLocaleString()} / ${project.target.toLocaleString()}</span>
                    <span>{project.equity}% equity</span>
                  </div>
                </div>
              </div>
            ))}
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
                      {investor.name.split(" ").map(n => n[0]).join("").slice(0,2)}
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