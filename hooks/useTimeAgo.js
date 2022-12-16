import { useEffect, useState } from "react"

const DATE_UNIT = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (time) => {
  const now = Date.now()
  const timestamp = new Date(time).getTime()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNIT) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}
export const useTimeAgo = (time) => {
  const [timeago, setTimeago] = useState(() => getDateDiffs(time))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(time)
      setTimeago(newTimeAgo)
    }, 5000)

    return () => clearInterval(interval)
  }, [time])
  const { value, unit } = getDateDiffs(time)
  const rtf = new Intl.RelativeTimeFormat("es", { style: "long" })
  return rtf.format(value, unit)
}
