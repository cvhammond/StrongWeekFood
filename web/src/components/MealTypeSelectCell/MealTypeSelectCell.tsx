
import { Label, SelectField, FieldError } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { QUERY as query } from "src/components/MealType/MealTypesCell"

export const QUERY = query
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  mealTypes,
}) => {
  return (
    <>
      <Label name="mealTypeId" className="rw-label" errorClassName="rw-label rw-label-error">
        Meal Type
      </Label>
      <SelectField
      name="mealTypeId"
      defaultValue={-1}
      className="rw-input"
      errorClassName="rw-input rw-input-error"
      validation={{
        valueAsNumber: true,
        required: true,
        validate: {
          matchesInitialValue: (value) => {
            return value !== -1
          },
        },
      }}>
      <option value={-1} disabled>Select a meal type</option>
      {mealTypes.map((mealType) => (
        <option key={mealType.id} value={mealType.id}>
          {mealType.name}
        </option>
      ))}
      </SelectField>
      <FieldError name="mealTypeId" className="rw-field-error" />
      </>
      )
}
