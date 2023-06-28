import MealCell from 'src/components/Meal/MealCell'

type MealPageProps = {
  id: number
}

const MealPage = ({ id }: MealPageProps) => {
  return <MealCell id={id} />
}

export default MealPage
