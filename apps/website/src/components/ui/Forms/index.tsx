import FormWithProgress from "./FormWithProgress"
import FormWrapper from "./FormWrapper"
import InputField from "./InputField"
import SubmitButton from "./SubmitButton"

export { InputField, FormWithProgress }
export default Object.assign(FormWrapper, { Input: InputField, SubmitButton })
