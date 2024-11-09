'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Mail, Lock } from 'lucide-react'

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    { icon: <ShieldCheck className="h-6 w-6" />, title: "Advanced Protection", description: "Learn to identify and prevent phishing attempts" },
    { icon: <Mail className="h-6 w-6" />, title: "Email Security", description: "Master the art of securing your email communications" },
    { icon: <Lock className="h-6 w-6" />, title: "Password Safety", description: "Discover techniques for creating and managing secure passwords" },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.h1 
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to PhishWise
      </motion.h1>
      <motion.p 
        className="text-xl mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Master phishing defense with interactive training
      </motion.p>
      <motion.div 
        className="space-x-4 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Login</Link>
        </Button>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          >
            <Card 
              className="h-full transition-all duration-300 ease-in-out transform hover:scale-105"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <motion.div
                  animate={{
                    scale: hoveredFeature === index ? 1.2 : 1,
                    rotate: hoveredFeature === index ? 360 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-primary mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}