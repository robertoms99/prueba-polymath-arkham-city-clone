import cn from 'classnames'
import React, { useContext } from 'react'
import { THUMBNAIL_CONTEXT } from '../../settings/contants'
import ICharacterGrid from './CharacterGrid.interface'
import style from './CharacterGrid.module.scss'
import { CharacterItem } from './components'

const CharacterGrid: React.FC<ICharacterGrid> = ({ characters }) => {
  const { thumbnail } = useContext(THUMBNAIL_CONTEXT)

  return (
    <article className={style.root}>
      <h3 className={cn(style.characterName)}>
        {thumbnail !== null ? thumbnail.name : 'Character'}
      </h3>
      <article className={cn(style.characterGrid)}>
        {characters.map((character) => (
          <CharacterItem character={character} key={character.id} />
        ))}
      </article>
    </article>
  )
}

export default CharacterGrid
