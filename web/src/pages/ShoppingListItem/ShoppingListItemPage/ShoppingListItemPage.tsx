import ShoppingListItemCell from 'src/components/ShoppingListItem/ShoppingListItemCell'

type ShoppingListItemPageProps = {
  id: number
}

const ShoppingListItemPage = ({ id }: ShoppingListItemPageProps) => {
  return <ShoppingListItemCell id={id} />
}

export default ShoppingListItemPage
