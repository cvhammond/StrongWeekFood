import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ShoppingListByDateCell from 'src/components/ShoppingListByDateCell'
import { getSundaySpread } from '../Meal/MealsPage/MealsPage'

const ShoppingListPage = () => {

  const { lastSunday, sevenDaysFromLastSunday } = getSundaySpread()

  return (
    <>
      <ShoppingListByDateCell
        startDate={lastSunday}
        endDate={sevenDaysFromLastSunday}
        numberOfPeople={2} />
    </>
  )
}

export default ShoppingListPage
