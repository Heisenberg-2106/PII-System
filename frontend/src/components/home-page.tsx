import Link from "next/link";
import { ArrowRight, FileText, Image, Shield, FileCheck } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FAQs } from "./faqs";

export default function HomePage() {
  return (
    <div>
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-primary" />
            <span>PrivSense</span>
          </Link>
          <nav className="ml-auto flex gap-8">
            <Button
              variant="ghost"
              size="sm"
              className="px-4 py-2 rounded-lg transition-all duration-300 bg-transparent hover:text-white"
              asChild
            >
              <Link href="/process">Process Documents</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-4 py-2 rounded-lg transition-all duration-300 bg-transparent hover:text-white"
              asChild
            >
              <Link href="/faqs">FAQs</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-4 py-2 rounded-lg transition-all duration-300 bg-transparent hover:text-white"
              asChild
            >
              <Link href="/features">Usage & Features</Link>
            </Button>
          </nav>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center space-y-4 text-center mt-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Protect Your Identity Data with AI
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Detect, mask, and secure personally identifiable information in your
            documents with our advanced AI system.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/">
              Process Document <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/settings">Configure Settings</Link>
          </Button>
        </div>
      </div>
      <section className="w-full py-12 md:py-24 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Text Analysis</CardTitle>
                <CardDescription>
                  Advanced NLP models detect PII in text documents with high
                  accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our system uses pre-trained models like DeBERTa-PII to
                  identify sensitive information such as names, addresses, PAN
                  numbers, and dates of birth in your documents.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/features/text-analysis">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Image className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Image Processing</CardTitle>
                <CardDescription>
                  Computer vision detects and extracts PII from identity
                  documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Using YOLOv8 and advanced OCR technology, we can accurately
                  detect PAN cards, Aadhaar cards, and various other identity
                  documents, efficiently extracting and securing sensitive
                  information.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/features/image-processing">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <FileCheck className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  Ensure compliance with privacy regulations and secure your
                  data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our system helps you comply with regulations like DPDP 2023
                  with AES-256 encryption, automated redaction, and secure
                  processing of sensitive information.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/features/compliance">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <FAQs />
    </div>
  );
}
