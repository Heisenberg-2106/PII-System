"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";

interface LoadingScreenProps {
  progress: number;
}

const securityFacts = [
  "Over 80% of data breaches involve personally identifiable information (PII).",
  "Redacting sensitive information can reduce the risk of identity theft by up to 90%.",
  "Document verification systems can detect up to 99% of sensitive data in structured documents.",
  "Automated redaction is 5x faster than manual redaction processes.",
  "Financial information is the most commonly targeted data in document breaches.",
  "Using AI for document verification can reduce human error by up to 85%.",
  "Regular document security audits can reduce data breach risks by 60%.",
  "The average cost of a data breach involving sensitive documents is $3.9 million.",
  "Proper document handling protocols can prevent 70% of accidental data exposures.",
];

export function LoadingScreen({ progress }: LoadingScreenProps) {
  const [fact, setFact] = useState("");
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const randomFact =
      securityFacts[Math.floor(Math.random() * securityFacts.length)];
    setFact(randomFact);
  }, []);

  useEffect(() => {
    if (progress > 0) {
      const estimatedTotal = 5000;
      const elapsed = (progress / 100) * estimatedTotal;
      const remaining = Math.max(
        0,
        Math.ceil((estimatedTotal - elapsed) / 1000)
      );
      setTimeRemaining(remaining);
    }
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-24 w-24 animate-spin text-primary" />
        </div>
        <svg
          className="h-full w-full animate-pulse opacity-20"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-primary"
          />
        </svg>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Processing Your Document
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please wait while we analyze and redact sensitive information
        </p>
      </div>

      <div className="w-full max-w-md space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Progress</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        {timeRemaining !== null && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Estimated time remaining: {timeRemaining}{" "}
            {timeRemaining === 1 ? "second" : "seconds"}
          </p>
        )}
      </div>

      <div className="mt-8 max-w-lg rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
          Did You Know?
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{fact}</p>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
          <div className="h-2 w-2/3 animate-pulse rounded-full bg-blue-400"></div>
          <div className="mt-1 h-2 w-1/2 animate-pulse rounded-full bg-blue-300"></div>
          <div className="mt-1 h-2 w-3/4 animate-pulse rounded-full bg-blue-200"></div>
        </div>
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-green-50 p-2 dark:bg-green-900/20">
          <div className="h-8 w-8 animate-pulse rounded-full bg-green-200"></div>
          <div className="mt-1 h-2 w-3/4 animate-pulse rounded-full bg-green-300"></div>
        </div>
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-purple-50 p-2 dark:bg-purple-900/20">
          <div className="h-2 w-2/3 animate-pulse rounded-full bg-purple-300"></div>
          <div className="mt-1 h-2 w-1/2 animate-pulse rounded-full bg-purple-400"></div>
          <div className="mt-1 h-2 w-3/4 animate-pulse rounded-full bg-purple-200"></div>
        </div>
      </div>
    </div>
  );
}
