"use client";
import { LoadingScreen } from "@/src/components/loading-screen";
import { VerificationSystem } from "../src/components/verification-system";
import HomePage from "@/src/components/home-page";
import Navbar from "@/src/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Document Verification System
        </h1>
        <VerificationSystem />
      </div>
    </main>
  );
}
