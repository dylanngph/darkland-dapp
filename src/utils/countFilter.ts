const countFilter = (compareObject, paramFilterHero) => {
  if (!Object.keys(compareObject).length || !Object.keys(paramFilterHero).length) return null
  let count = 0

  Object.entries(compareObject).forEach(([key, value]) => {
    const hash = paramFilterHero[key] ?? undefined

    if (hash) {
      if (hash.length || (!Array.isArray(hash) && hash !== value)) {
        count++
      }
    }
  })

  return count
}

export default countFilter
