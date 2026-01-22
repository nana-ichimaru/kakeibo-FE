import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './MonthYearPicker.module.css'

interface MonthYearPickerProps {
  data: {
    targetMonth: Date
  }
  handlers: {
    setTargetMonth: (date: Date) => void
  }
}

export const MonthYearPicker = ({ data, handlers }: MonthYearPickerProps) => {
  return (
    <>
      <DatePicker
        showMonthYearPicker
        selected={data.targetMonth}
        dateFormat={'yyyy / MM'}
        onChange={(selectedDate: Date | null) => {
          if (selectedDate == null) return
          handlers.setTargetMonth(selectedDate)
        }}
        className={styles['month-year-input']}
      />
    </>
  )
}
