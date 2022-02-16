export const mapHeroData = (heroList: any, heroConfig: any) => {
  if (!heroConfig?.length || !heroList?.length) return []
  const result = heroList.map((hero) => {
    const item = heroConfig.find((config) => config.heroID === hero.heroId)
    const newHero = {
      ...hero,
      name: item?.name || '',
      quote: item?.quote || '',
      story: item?.story || '',
      title: item?.title || ''
    }
    return newHero
  })
  return result
}
