import type { FindRecipeIngredients } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import RecipeIngredients from 'src/components/RecipeIngredient/RecipeIngredients'

export const QUERY = gql`
  query FindRecipeIngredients {
    recipeIngredients {
      id
      recipeId
      ingredientId
      amount
      ingredient {
        name
        unit
      }
      recipe {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No recipeIngredients yet. '}
      <Link to={routes.newRecipeIngredient()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  recipeIngredients,
}: CellSuccessProps<FindRecipeIngredients>) => {
  return <RecipeIngredients recipeIngredients={recipeIngredients} />
}
