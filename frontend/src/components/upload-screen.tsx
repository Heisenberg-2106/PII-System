"use client";

import type React from "react";

import { useState, useRef } from "react";
import { FileUp, Upload, AlertCircle, FileText, Image, X } from "lucide-react";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";

interface UploadScreenProps {
  onFileSubmit: (file: File) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function UploadScreen({ onFileSubmit }: UploadScreenProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      setError(
        `File size exceeds the maximum limit of 10MB. Your file is ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB.`
      );
      return false;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setError(
        "Invalid file type. Please upload a PDF, JPG, PNG, TIFF, DOC, or DOCX file."
      );
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileSubmit(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (!selectedFile) return null;

    if (selectedFile.type.includes("image")) {
      return <Image className="h-8 w-8 text-blue-500" />;
    } else {
      return <FileText className="h-8 w-8 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Upload Document
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Upload your document for secure verification and sensitive information
          redaction
        </p>
      </div>

      <div
        className={`relative flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,.tiff,.doc,.docx"
        />

        {!selectedFile ? (
          <>
            <FileUp className="mb-4 h-12 w-12 text-gray-400 dark:text-gray-500" />
            <p className="mb-2 text-center text-lg font-medium text-gray-700 dark:text-gray-300">
              Drag and drop your file here
            </p>
            <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
              or
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Browse Files
            </Button>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Supported formats: PDF, JPG, PNG, TIFF, DOC, DOCX (Max 10MB)
            </p>
          </>
        ) : (
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full max-w-md items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
              <div className="flex items-center space-x-3">
                {getFileIcon()}
                <div className="overflow-hidden">
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={handleRemoveFile}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Click "Submit" to begin processing your document
            </p>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!selectedFile}
        >
          Submit Document
        </Button>

        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h3 className="mb-2 font-medium text-blue-800 dark:text-blue-200">
            Privacy Notice
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Your documents are processed securely. All uploads are encrypted and
            automatically deleted after processing. We do not store or share
            your sensitive information with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}
