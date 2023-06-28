import MealTypeCell from 'src/components/MealType/MealTypeCell'

type MealTypePageProps = {
  id: number
}

const MealTypePage = ({ id }: MealTypePageProps) => {
  return <MealTypeCell id={id} />
}

export default MealTypePage
