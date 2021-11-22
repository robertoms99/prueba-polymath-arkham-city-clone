import React, { useContext, useEffect } from 'react'
import { CharacterGrid, CharacterImage, Loader, PlaygroundMenu } from '../../components'
import style from './HomeView.module.scss'
import cn from 'classnames'
import { THUMBNAIL_CONTEXT } from '../../settings/contants'
import hiddenImage from '../../assets/images/hidden.png'
import { getCharacters } from '../../services/characters.service'

const HomeView = () => {
  const { thumbnail, characters, onChangeCharacters } = useContext(THUMBNAIL_CONTEXT)

  useEffect(() => {
    if (characters.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setTimeout(async () => {
        onChangeCharacters(await getCharacters(32))
      }, 1000)
    }
  }, [])

  return (
    <main className={style.home}>
      <h1 className={cn(['heading', 'heading--primary'], style.heading)}>
        PICK YOUR FAVORITE HEROE
      </h1>
      <div className={cn(style.content, characters.length === 0 ? style.loading : '')}>
        {characters.length === 0 ? (
          <Loader />
        ) : (
          <>
            <CharacterGrid characters={characters} className={style.grid} />
            <CharacterImage
              source={thumbnail?.isHidden !== true ? thumbnail?.image?.url : hiddenImage}
              className={style.image}
            />
          </>
        )}
      </div>
      <PlaygroundMenu />
    </main>
  )
}

export default HomeView
