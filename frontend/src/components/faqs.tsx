"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is PrivacyVault?",
    answer:
      "PrivacyVault is a document verification system that detects and redacts sensitive personal information, ensuring privacy and security.",
  },
  {
    question: "What types of information does it detect?",
    answer:
      "It detects PII, financial details, medical data, addresses, and identification numbers with high accuracy.",
  },
  {
    question: "How long does the verification process take?",
    answer:
      "The processing time depends on the document size, but it usually takes a few seconds.",
  },
  {
    question: "Is my uploaded document stored permanently?",
    answer:
      "No, we do not store your documents permanently. They are only used for processing and deleted afterward.",
  },
];

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto w-full rounded-xl bg-[#EFF6FF] p-6 shadow-lg dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold text-[#1E40AF] dark:text-white">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between text-left text-lg font-medium text-gray-900 dark:text-white"
            >
              {faq.question}
              <span className="text-gray-500 dark:text-gray-400">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
