import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import MealsCell from 'src/components/Meal/MealsCell'
import MealTypesCell from 'src/components/MealType/MealTypesCell'
import RecipesCell from 'src/components/Recipe/RecipesCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>Let's have a strong week of food.</h1>
      <h2>Today's Meals</h2>
      <MealsCell date={new Date()}/>
      <h2>Meal Types</h2>
      <MealTypesCell />
      <h2>Recipes</h2>
      <RecipesCell />
    </>
  )
}

export default HomePage
