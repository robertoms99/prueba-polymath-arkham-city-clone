import React, { useCallback, useContext, useState } from 'react'
import cn from 'classnames'
import { THUMBNAIL_CONTEXT } from '../../../../settings/contants'
import ICharacterItem from './CharacterItem.interface'
import style from './CharacterItem.module.scss'
import { useImageFallback } from '../../../../hooks'

const saveSelectedThumbnails = (id: string) => {
  const { localStorage } = window
  const selectedThumbnailsString = localStorage.getItem('thumbnails_selected')
  const selectedThumbnails =
    selectedThumbnailsString !== null ? (JSON.parse(selectedThumbnailsString) as string[]) : []
  selectedThumbnails.push(id)
  localStorage.setItem('thumbnails_selected', JSON.stringify(selectedThumbnails))
}

const CharacterItem: React.FC<ICharacterItem> = ({ character }) => {
  const { onChangeThumbnail } = useContext(THUMBNAIL_CONTEXT)
  const [isOld, setIsOld] = useState(() => {
    const { localStorage } = window
    const selectedThumbnailsString = localStorage.getItem('thumbnails_selected')
    if (selectedThumbnailsString !== null) {
      const selectedThumbnails = JSON.parse(selectedThumbnailsString) as string[]
      return selectedThumbnails.includes(character.id)
    }
    return false
  })
  const { renderedImage } = useImageFallback({ image: character.image.url, fallback: '' })

  const handleHover = useCallback(() => {
    onChangeThumbnail(character.isHidden === true ? null : character)
  }, [character])

  const handleClick = useCallback(() => {
    setIsOld(true)
    saveSelectedThumbnails(character.id)
  }, [character])

  return (
    <figure
      className={style.root}
      onMouseOver={handleHover}
      onClick={character.isHidden === true ? undefined : handleClick}
    >
      <div className={cn(style.wrapper, character.isHidden === true || isOld ? '' : style.new)}>
        {character.isHidden !== true && (
          <img src={renderedImage} className={style.thumbnail} alt="?" />
        )}
      </div>
    </figure>
  )
}

export default CharacterItem
