"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-3">
                  {/* Simple Logo */}
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MA</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">metapps</h1>
                  </div>
                </div>
    
                                      <nav className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                          Home
                        </Link>
                        <Link href="/admin" className="text-gray-700 hover:text-gray-900 font-medium">
                          Admin
                        </Link>
                      </nav>
    
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
    
            {/* Mobile menu */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-white border-t">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link
                    href="/"
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded"
                  >
                    Home
                  </Link>
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded"
                  >
                    Admin
                  </Link>
                </div>
              </div>
            )}
        </header>
    )
}