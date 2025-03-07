import Head from "next/head";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* Set Page Title */}
      <Head>
        <title>DocScan - Document Scanning & Matching</title>
        <meta name="description" content="Upload documents, find matches, and analyze similarities with our advanced scanning system." />
      </Head>

      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-primary">
          <Link className="flex items-center justify-center" href="/">
            <span className="text-lg font-bold text-white">DocScan</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium text-white hover:underline" href="/login">
              Login
            </Link>
            <Link className="text-sm font-medium text-white hover:underline" href="/register">
              Register
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/20 to-background">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Document Scanning & Matching System
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                    Upload documents, find matches, and analyze similarities with our advanced scanning system.
                  </p>
                </div>
                <div className="space-x-4">
                  <Link href="/register">
                    <Button className="bg-primary">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6 bg-background">
          <p className="text-xs text-gray-500">© 2025 DocScan. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
