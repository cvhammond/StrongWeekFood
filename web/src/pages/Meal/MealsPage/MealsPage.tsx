import { DateField, Form, Label, Submit, FieldError } from '@redwoodjs/forms'
import MealsCell from 'src/components/Meal/MealsCell'

const MealsPage = () => {

  let lastSunday = new Date()
  lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay() + 1)
  let sevenDaysFromLastSunday = new Date(lastSunday)
  sevenDaysFromLastSunday.setDate(sevenDaysFromLastSunday.getDate() + 6)
  const [days, setDays] = React.useState(datesBetween(lastSunday.toDateString(), sevenDaysFromLastSunday.toDateString()))

  const onSubmit = (data: any) => {
    let startDate = new Date(data['start-date']).toDateString()
    let endDate = new Date(data['end-date']).toDateString()
    let dates = datesBetween(startDate, endDate)
    console.log(dates)
    setDays(dates)
  }

  return (
    <>
      <div className="rw-form-wrapper">
        <Form onSubmit={onSubmit}>
          <Label name="start-date" className="rw-label">
            Start Date
          </Label>
          <DateField
            name="start-date"
            className="rw-input"
          />
          <FieldError name="start-date" className="rw-field-error" />
          <Label name="end-date" className="rw-label">
            End Date
          </Label>
          <DateField name="end-date" className="rw-input" />
          <FieldError name="end-date" className="rw-field-error" />
          <div className="rw-button-group">
            <Submit className="rw-button rw-button-blue">
              Submit
            </Submit>
          </div>
        </Form>
      </div>
      {days.map((day) => {
        { console.log(day) }
        return (<>
          <h2>{day.toDateString()}</h2>
          <MealsCell date={day} />
        </>
        )
      })}
    </>
  )
}

export default MealsPage

function datesBetween(startDate: string, endDate: string) {
  let dates = []
  let currentDate = new Date(startDate)
  let stopDate = new Date(endDate)
  while (currentDate <= stopDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
}
