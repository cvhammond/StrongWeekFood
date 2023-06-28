import RecipeIngredientCell from 'src/components/RecipeIngredient/RecipeIngredientCell'

type RecipeIngredientPageProps = {
  id: number
}

const RecipeIngredientPage = ({ id }: RecipeIngredientPageProps) => {
  return <RecipeIngredientCell id={id} />
}

export default RecipeIngredientPage
