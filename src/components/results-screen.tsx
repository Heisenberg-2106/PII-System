"use client"

import type React from "react"

import { useState } from "react"
import { Download, Upload, Shield, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import type { VerificationResult, SensitiveInfoType } from "./verification-system"

interface ResultsScreenProps {
  result: VerificationResult
  onReset: () => void
}

const sensitiveInfoLabels: Record<SensitiveInfoType, { label: string; color: string; icon: React.ReactNode }> = {
  pii: {
    label: "Personal Information",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  financial: {
    label: "Financial Data",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  medical: {
    label: "Medical Information",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  address: {
    label: "Address Information",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    icon: <Info className="h-4 w-4" />,
  },
  id: {
    label: "ID Numbers",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
}

export function ResultsScreen({ result, onReset }: ResultsScreenProps) {
  const [activeTab, setActiveTab] = useState("comparison")

  const totalDetectedItems = result.detectedInfo.reduce((sum, item) => sum + item.count, 0)

  const handleDownload = () => {
    // In a real app, this would download the redacted document
    const link = document.createElement("a")
    link.href = result.redactedDocumentUrl
    link.download = "redacted-document.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Document Processed Successfully</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We found and redacted {totalDetectedItems} instances of sensitive information
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Processing time: {result.processingTime.toFixed(1)} seconds
        </p>
      </div>

      <Tabs defaultValue="comparison" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4 dark:border-gray-700">
              <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Original Document</h3>
              <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                <img
                  src={result.originalDocumentUrl || "/placeholder.svg"}
                  alt="Original document preview"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="rounded-lg border p-4 dark:border-gray-700">
              <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Redacted Document</h3>
              <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                <div className="relative h-full w-full">
                  <img
                    src={result.redactedDocumentUrl || "/placeholder.svg"}
                    alt="Redacted document preview"
                    className="h-full w-full object-contain"
                  />
                  {/* Simulated redaction boxes */}
                  <div className="absolute left-[20%] top-[30%] h-6 w-[60%] bg-black"></div>
                  <div className="absolute left-[15%] top-[40%] h-6 w-[40%] bg-black"></div>
                  <div className="absolute left-[25%] top-[50%] h-6 w-[50%] bg-black"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Redacted Document
            </Button>
            <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Another Document
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="findings" className="mt-4 space-y-4">
          <div className="rounded-lg border p-4 dark:border-gray-700">
            <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Detected Sensitive Information</h3>

            <div className="space-y-4">
              {result.detectedInfo.map((info, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={sensitiveInfoLabels[info.type].color}>
                        <span className="flex items-center gap-1">
                          {sensitiveInfoLabels[info.type].icon}
                          {sensitiveInfoLabels[info.type].label}
                        </span>
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {info.count} {info.count === 1 ? "instance" : "instances"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confidence: {(info.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <Progress value={info.confidence * 100} className="h-2" />
                  </div>

                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    {info.type === "pii" && (
                      <p>Personal identifiable information such as names, social security numbers, or birth dates.</p>
                    )}
                    {info.type === "financial" && (
                      <p>Financial data such as credit card numbers, bank account details, or financial statements.</p>
                    )}
                    {info.type === "medical" && (
                      <p>Medical information such as health records, diagnoses, or treatment details.</p>
                    )}
                    {info.type === "address" && (
                      <p>Address information such as home addresses, email addresses, or phone numbers.</p>
                    )}
                    {info.type === "id" && (
                      <p>Identification numbers such as driver's license, passport, or other government IDs.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Redacted Document
            </Button>
            <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Another Document
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="mt-4 space-y-4">
          <div className="rounded-lg border p-4 dark:border-gray-700">
            <h3 className="mb-4 font-medium text-gray-900 dark:text-white">Processing Summary</h3>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Security Score</h4>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Document Safety</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">85%</span>
                    </div>
                    <Progress value={85} className="mt-1 h-2" />
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    <h4 className="font-medium text-gray-900 dark:text-white">Document Statistics</h4>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Total Pages</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Total Redactions</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{totalDetectedItems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Processing Time</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {result.processingTime.toFixed(1)}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <h4 className="mb-2 font-medium text-blue-800 dark:text-blue-200">Recommendations</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm text-blue-700 dark:text-blue-300">
                  <li>
                    Consider reviewing the redacted document to ensure all sensitive information has been properly
                    removed.
                  </li>
                  <li>For documents with financial data, consider additional encryption before sharing.</li>
                  <li>
                    Regularly audit your document security practices to maintain compliance with data protection
                    regulations.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Redacted Document
            </Button>
            <Button variant="outline" onClick={onReset} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Another Document
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

