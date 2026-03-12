"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUpRight, TrendingUp } from "lucide-react"

const investors = [
  {
    name: "Aaliyah Taylor",
    email: "aaliyah.taylor@gmail.com",
    concept: "Smart City Energy Grid",
    date: "22 January 2027",
    amount: "$90,000",
    equity: "4.00%",
    stage: "Seed",
  },
  {
    name: "Finley Thompson",
    email: "finley.thompson@gmail.com",
    concept: "Sustainable Agriculture Tech",
    date: "15 February 2027",
    amount: "$75,000",
    equity: "3.25%",
    stage: "Series A",
  },
  {
    name: "Harper Wilson",
    email: "harper.wilson@gmail.com",
    concept: "Wearable Health Monitoring",
    date: "01 January 2027",
    amount: "$110,000",
    equity: "5.00%",
    stage: "Angel",
  },
  {
    name: "Leo Wright",
    email: "leo.wright@gmail.com",
    concept: "Eco-Friendly Packaging Solutions",
    date: "12 February 2027",
    amount: "$120,000",
    equity: "5.25%",
    stage: "Series B",
  },
]

const equityDistributions = [
  {
    title: "Launch a Mobile Pet Grooming Service",
    totalEquity: 25,
    soldPercent: 12.5,
    soldAmount: "$62,500",
    availablePercent: 12.5,
    availableAmount: "$62,500",
  },
  {
    title: "Develop an AI-Powered Language Tutor",
    totalEquity: 24,
    soldPercent: 24,
    soldAmount: "$120,000",
    availablePercent: 0,
    availableAmount: "",
  },
]

export default function InvestmentDashboard() {
  return (
    <div className="space-y-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Dashboards</span>
        <span>/</span>
        <span className="text-foreground font-medium">Investors</span>
      </div>

      {/* 1. QUICK STATS */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Total Raised", value: "$970K", trend: "+8.2%" },
          { label: "Total Raised", value: "$970K", trend: "+3.1%" },
          { label: "Total Raised", value: "$970K", trend: "+5.4%" },
        ].map((item, i) => (
          <Card key={i} className="border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </span>
                <div className="flex items-center gap-1.5 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.trend}</span>
                </div>
              </div>
              <div className="text-4xl font-bold tracking-tight">
                {item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. INVESTOR INSIGHTS */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Investor Insights</CardTitle>
          <p className="text-sm text-muted-foreground">
            Explore investment prospects and manage your investments
          </p>
        </CardHeader>

        <CardContent className="p-0">

          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-muted/50">
                <tr>
                  {["Investor", "Concept", "Created", "Investment", "Equity", "Stage"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-sm font-medium text-muted-foreground"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y">
                {investors.map((row, i) => (
                  <tr key={i} className="hover:bg-muted/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://i.pravatar.cc/40?u=${row.name}`} />
                          <AvatarFallback>
                            {row.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{row.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {row.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {row.concept}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {row.date}
                    </td>
                    <td className="px-6 py-4 font-medium">{row.amount}</td>
                    <td className="px-6 py-4 text-sm">{row.equity}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-xs">
                        {row.stage}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden space-y-4 p-4">
            {investors.map((row, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-4 space-y-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://i.pravatar.cc/40?u=${row.name}`} />
                    <AvatarFallback>{row.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{row.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {row.email}
                    </div>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Concept:</span>{" "}
                  {row.concept}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Investment</div>
                    <div className="font-medium">{row.amount}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Equity</div>
                    <div>{row.equity}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Created</div>
                    <div>{row.date}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Stage</div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {row.stage}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>

      {/* 3. EQUITY DISTRIBUTION */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Equity Distribution by Idea</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your ideas in this space
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {equityDistributions.map((item, i) => {
            const soldWidth = item.totalEquity > 0 ? (item.soldPercent / item.totalEquity) * 100 : 0
            const isFull = item.soldPercent >= item.totalEquity

            return (
              <div
                key={i}
                className="space-y-3 rounded-lg border bg-card/50 p-6 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <ArrowUpRight className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-medium">{item.title}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Total Equity {item.totalEquity.toFixed(2)}%
                  </span>
                </div>

                <div className="relative h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-all ${isFull ? "bg-emerald-500" : "bg-primary"}`}
                    style={{ width: `${soldWidth}%` }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs text-muted-foreground">
                  <span>Sold {item.soldPercent.toFixed(2)}% {item.soldAmount && `(${item.soldAmount})`}</span>
                  {item.availablePercent > 0 && (
                    <span>Available {item.availablePercent.toFixed(2)}% {item.availableAmount && `(${item.availableAmount})`}</span>
                  )}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

    </div>
  )
}
