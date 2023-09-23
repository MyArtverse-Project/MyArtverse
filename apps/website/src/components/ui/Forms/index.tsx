import FormWithProgress from "./FormWithProgress"
import InputField from "./InputField"
import FormWrapper from "./FormWrapper"
import SubmitButton from "./SubmitButton"

export { InputField, FormWithProgress }
export default Object.assign(FormWrapper, { Input: InputField, SubmitButton })
