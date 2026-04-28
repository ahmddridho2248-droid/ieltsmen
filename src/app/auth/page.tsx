"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-40 w-40 rounded-full border-2 border-white/30 animate-float" />
          <div className="absolute bottom-32 right-20 h-60 w-60 rounded-full border-2 border-white/20 animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/3 h-32 w-32 rounded-full border-2 border-white/25 animate-float" style={{ animationDelay: "4s" }} />
        </div>
        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Globe className="h-7 w-7" />
            </div>
            <span className="text-2xl font-bold">IELTSPrep</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">Your path to IELTS success starts here.</h2>
          <p className="text-white/80 text-lg">Practice all four modules, get AI feedback, and track your progress to your target band score.</p>
          <div className="mt-10 flex gap-4">
            {["Listening", "Reading", "Writing", "Speaking"].map((m) => (
              <div key={m} className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium">{m}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">IELTSPrep</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{isLogin ? "Welcome back" : "Create account"}</h1>
            <p className="text-muted-foreground">
              {isLogin ? "Sign in to continue your preparation." : "Start your IELTS journey today."}
            </p>
          </div>

          <Card className="border-0 shadow-xl shadow-electric/5">
            <CardContent className="p-6 space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="John Doe" className="pl-10 h-11 rounded-xl" />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-10 h-11 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10 h-11 rounded-xl" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {isLogin && (
                <div className="flex justify-end">
                  <button className="text-sm text-electric hover:underline">Forgot password?</button>
                </div>
              )}
              <Link href="/dashboard">
                <Button className="w-full h-11 rounded-xl gradient-primary text-white border-0 shadow-lg shadow-electric/25 hover:shadow-electric/40 transition-all font-medium mt-2">
                  {isLogin ? "Sign In" : "Create Account"}<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or continue with</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-11 rounded-xl">Google</Button>
                <Button variant="outline" className="h-11 rounded-xl">GitHub</Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-electric font-medium hover:underline">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
