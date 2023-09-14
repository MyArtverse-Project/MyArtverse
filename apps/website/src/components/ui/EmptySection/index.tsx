// https://react-typescript-cheatsheet.netlify.app/docs/advanced/misc_concerns/#namespaced-components
import EmptySection from "./EmptySection"
import EmptySectionHeading from "./EmptySectionHeading"

export default Object.assign(EmptySection, { Heading: EmptySectionHeading })
