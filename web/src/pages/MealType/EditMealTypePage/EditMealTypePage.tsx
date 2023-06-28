import EditMealTypeCell from 'src/components/MealType/EditMealTypeCell'

type MealTypePageProps = {
  id: number
}

const EditMealTypePage = ({ id }: MealTypePageProps) => {
  return <EditMealTypeCell id={id} />
}

export default EditMealTypePage
