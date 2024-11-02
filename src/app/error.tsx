"use client";
import React, { useState, useEffect } from "react";
import { AlertTriangle, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const [retrying, setRetrying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    "Checking system status...",
    "Attempting to reconnect...",
    "Validating connection...",
    "Almost there...",
  ];

  // Time elapsed counter
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotating tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);
    return () => clearInterval(tipInterval);
  }, []);

  const handleRetry = () => {
    setRetrying(true);
    setProgress(0);
    setShowTip(true);

    // Simulate a retry attempt with progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          window.location.reload();
          return prev;
        }
        return prev + 2;
      });
    }, 50);

    // Cleanup
    setTimeout(() => {
      clearInterval(progressInterval);
      setRetrying(false);
      setShowTip(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            {/* Animated Error Icon */}
            <div
              className={`bg-red-50 p-3 rounded-full mb-6 transition-transform duration-500 ${
                retrying ? "animate-spin" : "hover:scale-110"
              }`}
            >
              {retrying ? (
                <RefreshCw className="size-8 text-blue-500" />
              ) : (
                <AlertTriangle className="size-8 text-red-500" />
              )}
            </div>

            {/* Error Message Section */}
            <div className="space-y-2 mb-8">
              <h1 className="text-2xl font-semibold text-slate-900">
                {retrying ? "Attempting to Recover" : "Something went wrong"}
              </h1>
              <p className="text-slate-500 max-w-sm">
                {retrying
                  ? tips[currentTip]
                  : "We encountered an unexpected error. Please try refreshing the page or return to the dashboard."}
              </p>
            </div>

            {/* Progress Bar (visible during retry) */}
            {retrying && (
              <div className="w-full mb-6">
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Error Code with Pulse Effect */}
            <div className="bg-slate-100 px-4 py-2 rounded-full mb-8 group hover:bg-slate-200 transition-colors">
              <code className="text-sm text-slate-600">
                Error Code: 500 • {timeElapsed}s elapsed
              </code>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <Button
                variant="outline"
                className="w-full relative overflow-hidden"
                onClick={handleRetry}
                disabled={retrying}
              >
                <RefreshCw
                  className={`size-4 mr-2 ${retrying ? "animate-spin" : ""}`}
                />
                {retrying ? "Retrying..." : "Retry"}
                {retrying && (
                  <span
                    className="absolute bottom-0 left-0 h-1 bg-blue-500"
                    style={{
                      width: `${progress}%`,
                      transition: "width 0.5s ease",
                    }}
                  />
                )}
              </Button>
              <Button
                className="w-full bg-slate-900 hover:bg-slate-800 transition-colors duration-300"
                asChild
              >
                <Link href="/" className="group">
                  <ArrowLeft className="size-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                  Dashboard
                </Link>
              </Button>
            </div>

            {/* Status Indicators */}
            <div className="flex gap-2 mt-6">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-blue-500"
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Support Link */}
      <div className="absolute bottom-8 text-center hover:scale-105 transition-transform duration-300">
        <p className="text-slate-500 text-sm flex items-center gap-2">
          <CheckCircle className="size-4 text-green-500 animate-pulse" />
          Support is online •{" "}
          <Link
            href="/support"
            className="text-slate-900 dark:text-slate-200 hover:underline flex items-center gap-1"
          >
            Get help now
            <span className="text-xs">→</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
