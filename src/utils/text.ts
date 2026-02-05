export function truncate(text: string, limit = 100) {
  return text.length > limit
    ? text.slice(0, limit) + '…'
    : text
}