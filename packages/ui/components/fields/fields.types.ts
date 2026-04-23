type FieldRequiredIntent = "implicit" | "explicit"

export interface MAVFields {
  /**
   * Adds the label of the field, won't be shown otherwise and will be hidden with the `empty:hidden` class
   */
  inputName: string
  /**
   * This will hide the label specified in `inputName` but still be
   * accessible by screen readers
   */
  noLabel: boolean
  /**
   * Restricts a certain character limit in a field
   */
  charLimit: number
  /**
   * Specifies the priorty of the required field indicator
   *
   * For optimal UX, if the form has high importance such as logins and credit card
   * info, set the option as "implicit" to make the fields required but without explicitly displaying
   * the field is required (displayed as red star)
   *
   * Otherwise, use "expiclit" for most use cases.
   */
  _tmpIsRequired: FieldRequiredIntent
  /**
   * Displays an error below the field and marks it as red unless resolved
   */
  error?: string
}
