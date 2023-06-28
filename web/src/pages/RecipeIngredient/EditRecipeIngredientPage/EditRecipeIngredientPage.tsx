import EditRecipeIngredientCell from 'src/components/RecipeIngredient/EditRecipeIngredientCell'

type RecipeIngredientPageProps = {
  id: number
}

const EditRecipeIngredientPage = ({ id }: RecipeIngredientPageProps) => {
  return <EditRecipeIngredientCell id={id} />
}

export default EditRecipeIngredientPage
