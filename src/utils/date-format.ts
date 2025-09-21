import dayjs from 'dayjs'

export const formatDate = ({
  date,
  format = 'YYYY.MM.DD HH:mm:ss',
}: {
  date?: Date
  format?: string
}) => {
  if (!date) return ''
  return dayjs(date).format(format)
}
