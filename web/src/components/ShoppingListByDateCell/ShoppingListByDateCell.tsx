import InteractiveShoppingList from 'src/components/InteractiveShoppingList'

export const QUERY = gql`
  query FindShoppingListByDateQuery(
  $startDate: DateTime!,
  $endDate: DateTime!
  $numberOfPeople: Int!
  ) {
    shoppingListByDate: shoppingListByDate(
    startDate: $startDate,
    endDate: $endDate
    numberOfPeople: $numberOfPeople
    ) {
      id
      startDate
      endDate
      numberOfPeople
      shoppingListItems {
        id
        amount
        complete
        ingredient {
          name
          unit
          pantryItem
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  shoppingListByDate,
}) => {
  return (
    <>
      <InteractiveShoppingList shoppingList={shoppingListByDate} />
    </>
  )
}
