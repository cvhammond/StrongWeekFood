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
      <nav className="rw-button-group">
        <Link
          to={routes.newMeal()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Meal
        </Link>
        <Link to={routes.meals()} className="rw-button rw-button-green">
          This Week's Plan
        </Link>
        <Link to={routes.weekShoppingList()} className="rw-button rw-button-green">
          This Week's Shopping List
        </Link>
      </nav>
      <h2>Today's Meals</h2>
      <MealsCell date={new Date()} />
      <h2>Recipes</h2>
      <nav className="rw-button-group">
        <Link to={routes.newRecipe()} className="rw-button rw-button-blue">
          <div className="rw-button-icon">+</div> New Recipe
        </Link>
      </nav>
      <RecipesCell />
    </>
  )
}

export default HomePage
