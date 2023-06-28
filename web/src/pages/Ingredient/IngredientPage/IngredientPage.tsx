import IngredientCell from 'src/components/Ingredient/IngredientCell'

type IngredientPageProps = {
  id: number
}

const IngredientPage = ({ id }: IngredientPageProps) => {
  return <IngredientCell id={id} />
}

export default IngredientPage
