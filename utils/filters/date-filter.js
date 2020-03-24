export const dateFilter = (value) => {
  return formatDate(value)
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

function formatDate (inputDate) {
  const date = new Date(inputDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return day + '. ' + months[month] + ' ' + year
}
