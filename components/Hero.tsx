import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Hero(){

    const categories = [
        { id: "all", name: "All Tools" },
        { id: "games", name: "Games & Learning" },
        { id: "utilities", name: "Utilities" },
        { id: "language", name: "Language Tools" },
        { id: "finance", name: "Finance Tools" },
        { id: "cultural", name: "Cultural Tools" },
    ]

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Interactive Tools for Ethiopians</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A collection of working tools, games, and utilities designed specifically for the Ethiopian community. Use
            them directly in your browser - no downloads required!
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for tools..."
              className="pl-12 pr-4 py-3 text-lg rounded-lg border-2 border-gray-200 focus:border-green-500"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className="rounded-lg"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>
    )
}