import EditMealCell from 'src/components/Meal/EditMealCell'

type MealPageProps = {
  id: number
}

const EditMealPage = ({ id }: MealPageProps) => {
  return <EditMealCell id={id} />
}

export default EditMealPage
