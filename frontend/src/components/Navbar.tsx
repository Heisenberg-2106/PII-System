import { Shield } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
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
  );
}
