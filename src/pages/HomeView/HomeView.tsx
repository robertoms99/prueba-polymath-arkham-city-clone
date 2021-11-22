import React, { useContext, useEffect, useMemo, useState } from 'react'
import { CharacterGrid, CharacterImage, PlaygroundMenu } from '../../components'
import { getCharacters } from '../../services/characters.service'
import style from './HomeView.module.scss'
import cn from 'classnames'
import { THUMBNAIL_CONTEXT } from '../../settings/contants'

const getRandomInt = function (min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const HomeView = () => {
  const [characters, setCharacters] = useState<any[]>([])
  const { thumbnail } = useContext(THUMBNAIL_CONTEXT)

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

  useEffect(() => {
    ;(async () => {
      setCharacters(await getCharacters(32))
    })().catch(console.error)
  }, [])

  return (
    <main className={style.home}>
      <h1 className={cn(['heading', 'heading--primary'], style.heading)}>
        PICK YOUR FAVORITE HEROE
      </h1>
      <div className={style.content}>
        <CharacterGrid characters={orderedCharacters} className={style.grid} />
        <CharacterImage source={thumbnail?.image?.url} className={style.image} />
      </div>
      <PlaygroundMenu />
    </main>
  )
}

export default HomeView
