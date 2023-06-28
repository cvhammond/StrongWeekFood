import EditIngredientCell from 'src/components/Ingredient/EditIngredientCell'

type IngredientPageProps = {
  id: number
}

const EditIngredientPage = ({ id }: IngredientPageProps) => {
  return <EditIngredientCell id={id} />
}

export default EditIngredientPage
