// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof InteractiveShoppingList> = (args) => {
//   return <InteractiveShoppingList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import InteractiveShoppingList from './InteractiveShoppingList'

export const generated = () => {
  return <InteractiveShoppingList />
}

export default {
  title: 'Components/InteractiveShoppingList',
  component: InteractiveShoppingList,
} as ComponentMeta<typeof InteractiveShoppingList>
