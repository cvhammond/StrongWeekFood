import EditShoppingListItemCell from 'src/components/ShoppingListItem/EditShoppingListItemCell'

type ShoppingListItemPageProps = {
  id: number
}

const EditShoppingListItemPage = ({ id }: ShoppingListItemPageProps) => {
  return <EditShoppingListItemCell id={id} />
}

export default EditShoppingListItemPage
