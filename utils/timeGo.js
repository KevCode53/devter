const today = new Date()
const msec_segs = 1000
const msec_mins = msec_segs * 60
const msec_hours = msec_mins * 60
const msec_days = msec_hours * 24
const msec_months = msec_days * 30.416666666666668
const msec_years = msec_months * 12

export const getTimeGo = (date) => {
  const created = new Date(date)
  let interval = today - created

  const years = Math.floor(interval / msec_years)

  interval = interval - years * msec_years
  const months = Math.floor(interval / msec_months)

  interval = interval - months * msec_months
  const days = Math.floor(interval / msec_days)

  interval = interval - days * msec_days
  const hours = Math.floor(interval / msec_hours)

  interval = interval - hours * msec_hours
  const minutes = Math.floor(interval / msec_mins)

  interval = interval - minutes * msec_mins
  const seconds = Math.floor(interval / msec_segs)

  if (seconds > 1 && minutes < 1) {
    return `Hace ${seconds}segs.`
  } else if (minutes >= 1 && hours < 1) {
    if (minutes === 1) {
      return `Hace ${minutes} minuto y ${seconds} segs.`
    }
    return `Hace ${minutes} minutos y ${seconds} segs.`
  } else if (hours >= 1 && days < 1) {
    return `${hours}h`
  } else if (months >= 1 && years < 1) {
    return created.toLocaleString("default", {
      month: "short",
      day: "numeric",
    })
  } else if (years > 1) {
    return created.toLocaleString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (minutes < 1 && hours < 1 && seconds > 0) {
    return `Hace ${seconds}segs.`
  } else if (hours < 1 && minutes > 0) {
    return `Hace ${minutes}`
  } else if (days < 1 && minutes > 0) {
    return `${hours}h`
  } else if (months < 1 && years < 1 && days > 20) {
    return `${hours}h`
  } else if (years < 1) {
    return created.toLocaleString("default", {
      month: "short",
      day: "numeric",
    })
  } else {
    return created.toLocaleString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}
