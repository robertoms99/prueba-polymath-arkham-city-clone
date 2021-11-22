import { useMemo, useState } from 'react'
import { getRandomInt } from '../../../../lib/util'

const useCharacters = () => {
  const [thumbnail, onChangeThumbnail] = useState(null)
  const [characters, onChangeCharacters] = useState<any[]>([])

  const getDiferentRandomInt = useMemo(() => {
    const generatedNumbers: number[] = []
    const decoratedRandom = (min: number, max: number): number => {
      const randomInt = getRandomInt(min, max)
      if (generatedNumbers.includes(randomInt)) return decoratedRandom(min, max)
      generatedNumbers.push(randomInt)
      return randomInt
    }
    return decoratedRandom
  }, [characters])

  const orderedCharacters = useMemo(() => {
    const arr = Array.from(characters, (e) => ({ ...e }))
    if (characters.length === 0) return characters
    const hiddenCharacters = Math.floor(32 * 0.7)
    for (let index = 0; index < hiddenCharacters; index++) {
      const randomInt = getDiferentRandomInt(0, 32)
      arr[randomInt].isHidden = true
    }
    return arr
  }, [characters])

  return {
    thumbnail,
    characters: orderedCharacters,
    onChangeThumbnail,
    onChangeCharacters
  }
}

export default useCharacters
