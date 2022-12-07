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

  const data = { years, months, days, hours, minutes, seconds }

  // console.info(
  //   `Han pasado ${years} años, ${months} meses,  ${days} dias, ${hours} horas, ${minutes} minutos y ${seconds} segundos..!`
  // )

  switch (data) {
    case data.minutes > 0:
      return `Publicado hace ${minutes} segudos y ${seconds} segudos`
    default:
      return `Publicado hace ${seconds} segudos`
  }
}
