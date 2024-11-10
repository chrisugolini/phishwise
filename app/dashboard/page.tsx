'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'

const modules = [
  { id: 1, title: "Introduction to Phishing", progress:  },
  { id: 2, title: "Common Phishing Techniques", progress:  },
  { id: 3, title: "Identifying Phishing Emails", progress:  },
  { id: 4, title: "Advanced Phishing Defense", progress:  },
]

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">PhishWise Modules Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>Module {module.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={module.progress} className="w-full" />
              <p className="mt-2 text-sm text-gray-600">{module.progress}% complete</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/module/${module.id}`}>
                  {module.progress === 100 ? "Review" : "Continue"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}