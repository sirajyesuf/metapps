"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Lap {
  id: number
  time: number
  lapTime: number
}

export default function ModernStopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [laps, setLaps] = useState<Lap[]>([])
  const [startTime, setStartTime] = useState(0)
  const [pausedTime, setPausedTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const ms = Math.floor((milliseconds % 1000) / 10)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`
  }

  const start = () => {
    if (!isRunning) {
      const now = Date.now()
      setStartTime(now - pausedTime)
      setIsRunning(true)
      setIsPaused(false)

      intervalRef.current = setInterval(() => {
        setTime(Date.now() - (now - pausedTime))
      }, 10)
    }
  }

  const pause = () => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current)
      setIsRunning(false)
      setIsPaused(true)
      setPausedTime(time)
    }
  }

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTime(0)
    setIsRunning(false)
    setIsPaused(false)
    setLaps([])
    setStartTime(0)
    setPausedTime(0)
  }

  const addLap = () => {
    if (isRunning && time > 0) {
      const lapTime = laps.length > 0 ? time - laps[laps.length - 1].time : time
      const newLap: Lap = {
        id: laps.length + 1,
        time: time,
        lapTime: lapTime,
      }
      setLaps([...laps, newLap])
    }
  }

  const getBestLap = () => {
    if (laps.length === 0) return null
    return laps.reduce((best, current) => (current.lapTime < best.lapTime ? current : best))
  }

  const getWorstLap = () => {
    if (laps.length === 0) return null
    return laps.reduce((worst, current) => (current.lapTime > worst.lapTime ? current : worst))
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return // Don't handle shortcuts when typing in input fields
      }

      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault()
          if (isRunning) {
            pause()
          } else if (isPaused) {
            start()
          } else {
            start()
          }
          break
        case 'l':
          if (isRunning || isPaused) {
            addLap()
          }
          break
        case 'r':
          if (isRunning || isPaused) {
            reset()
          }
          break
        case 'c':
          if (laps.length > 0) {
            setLaps([])
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isRunning, isPaused, laps.length])

  const bestLap = getBestLap()
  const worstLap = getWorstLap()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
            Modern Stopwatch
          </h1>
          <p className="text-blue-100 text-center mt-1 text-sm sm:text-base">
            Professional timing with lap tracking and precision measurement
          </p>
        </div>
        <div className="p-4 sm:p-6 space-y-8">
          {/* Main Timer Display */}
          <div className="text-center">
            <div className="text-7xl md:text-8xl font-mono font-bold text-gray-900 mb-8 tracking-tight">
              {formatTime(time)}
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center space-x-4 mb-8">
              {!isRunning && !isPaused && (
                <Button
                  onClick={start}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                >
                  Start
                </Button>
              )}

              {isRunning && (
                <>
                  <Button
                    onClick={pause}
                    size="lg"
                    variant="outline"
                    className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg bg-transparent"
                  >
                    Pause
                  </Button>
                  <Button
                    onClick={addLap}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                  >
                    Lap
                  </Button>
                </>
              )}

              {isPaused && (
                <>
                  <Button
                    onClick={start}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                  >
                    Resume
                  </Button>
                  <Button
                    onClick={addLap}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                  >
                    Lap
                  </Button>
                </>
              )}

              {(isRunning || isPaused) && (
                <Button
                  onClick={reset}
                  size="lg"
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50 px-8 py-4 text-lg bg-transparent"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Statistics */}
          {laps.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <h4 className="text-sm font-medium text-blue-900 mb-1">Total Laps</h4>
                <p className="text-2xl font-bold text-blue-700">{laps.length}</p>
              </div>

              {bestLap && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <h4 className="text-sm font-medium text-green-900 mb-1">Best Lap</h4>
                  <p className="text-lg font-bold text-green-700">{formatTime(bestLap.lapTime)}</p>
                  <p className="text-xs text-green-600">Lap #{bestLap.id}</p>
                </div>
              )}

              {worstLap && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <h4 className="text-sm font-medium text-red-900 mb-1">Slowest Lap</h4>
                  <p className="text-lg font-bold text-red-700">{formatTime(worstLap.lapTime)}</p>
                  <p className="text-xs text-red-600">Lap #{worstLap.id}</p>
                </div>
              )}
            </div>
          )}

          {/* Lap Times */}
          {laps.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Lap Times</h3>
                <Badge variant="secondary">{laps.length} laps</Badge>
              </div>

              <div className="max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  {laps
                    .slice()
                    .reverse()
                    .map((lap, index) => {
                      const actualIndex = laps.length - index
                      const isBest = bestLap && lap.id === bestLap.id
                      const isWorst = worstLap && lap.id === worstLap.id && laps.length > 1

                      return (
                        <div
                          key={lap.id}
                          className={`flex justify-between items-center p-3 rounded-lg border ${
                            isBest
                              ? "bg-green-50 border-green-200"
                              : isWorst
                                ? "bg-red-50 border-red-200"
                                : "bg-white border-gray-200"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span
                              className={`text-sm font-medium ${
                                isBest ? "text-green-700" : isWorst ? "text-red-700" : "text-gray-600"
                              }`}
                            >
                              Lap {actualIndex}
                            </span>
                            {isBest && <Badge className="bg-green-500 text-xs">Best</Badge>}
                            {isWorst && (
                              <Badge variant="destructive" className="text-xs">
                                Slowest
                              </Badge>
                            )}
                          </div>

                          <div className="text-right">
                            <div
                              className={`font-mono font-semibold ${
                                isBest ? "text-green-700" : isWorst ? "text-red-700" : "text-gray-900"
                              }`}
                            >
                              {formatTime(lap.lapTime)}
                            </div>
                            <div className="text-xs text-gray-500">Total: {formatTime(lap.time)}</div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>

              {laps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    onClick={() => setLaps([])}
                    variant="outline"
                    size="sm"
                    className="w-full text-gray-600 hover:text-gray-800"
                  >
                    Clear All Laps
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 