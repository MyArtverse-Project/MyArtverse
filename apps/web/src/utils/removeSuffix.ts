export const removeSuffixes = (formData: FormData, delimiter: string = "-«") => {
  const processedData = {} as Record<string, string>

  for (const [key, value] of Array.from(formData.entries())) {
    const [originalKey] = key.split(delimiter)

    processedData[originalKey] = value as string
  }

  return processedData
}
