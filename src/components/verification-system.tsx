"use client"

import { useState } from "react"
import { UploadScreen } from "./upload-screen"
import { LoadingScreen } from "./loading-screen"
import { ResultsScreen } from "./results-screen"

export type VerificationStatus = "upload" | "processing" | "results" | "error"
export type SensitiveInfoType = "pii" | "financial" | "medical" | "address" | "id"

export interface DetectedInfo {
  type: SensitiveInfoType
  confidence: number
  count: number
}

export interface VerificationResult {
  originalDocumentUrl: string
  redactedDocumentUrl: string
  detectedInfo: DetectedInfo[]
  processingTime: number
}

export function VerificationSystem() {
  const [status, setStatus] = useState<VerificationStatus>("upload")
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<VerificationResult | null>(null)

  // Simulate document processing
  const processDocument = async (file: File) => {
    setStatus("processing")
    setProgress(0)

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress > 95 ? 95 : newProgress
      })
    }, 800)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 5000))

      // Mock result data
      const mockResult: VerificationResult = {
        originalDocumentUrl: URL.createObjectURL(file),
        redactedDocumentUrl: URL.createObjectURL(file), // In a real app, this would be the redacted version
        detectedInfo: [
          { type: "pii", confidence: 0.95, count: 3 },
          { type: "financial", confidence: 0.87, count: 2 },
          { type: "address", confidence: 0.92, count: 1 },
        ],
        processingTime: 4.2,
      }

      setResult(mockResult)
      setProgress(100)

      // Small delay before showing results
      setTimeout(() => {
        setStatus("results")
      }, 500)
    } catch (err) {
      setError("An error occurred while processing your document. Please try again.")
      setStatus("error")
    } finally {
      clearInterval(progressInterval)
    }
  }

  const handleFileSubmit = (selectedFile: File) => {
    setFile(selectedFile)
    processDocument(selectedFile)
  }

  const handleReset = () => {
    setStatus("upload")
    setFile(null)
    setError(null)
    setProgress(0)
    setResult(null)
  }

  return (
    <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      {status === "upload" && <UploadScreen onFileSubmit={handleFileSubmit} />}

      {status === "processing" && <LoadingScreen progress={progress} />}

      {status === "results" && result && <ResultsScreen result={result} onReset={handleReset} />}

      {status === "error" && (
        <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
          <p className="text-red-800 dark:text-red-200">{error}</p>
          <button
            onClick={handleReset}
            className="mt-4 rounded-md bg-red-100 px-4 py-2 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

