import ModernStopwatch from '@/tools/stopwatch'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function StopwatchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <ModernStopwatch />
        </div>
      </main>
      <Footer />
    </div>
  )
} 