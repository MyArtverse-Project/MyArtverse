export const removeSuffixes = (formData: FormData) => {
  const processedData = {} as Record<string, string>
  Array.from(formData.entries()).forEach(([key, value]) => {
    const originalKey = key.split("-«")[0]
    processedData[originalKey] = value as string
  })
  return processedData
}