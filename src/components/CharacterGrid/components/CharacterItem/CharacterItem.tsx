import React, { useCallback, useContext, useState } from 'react'
import cn from 'classnames'
import { THUMBNAIL_CONTEXT } from '../../../../settings/contants'
import ICharacterItem from './CharacterItem.interface'
import style from './CharacterItem.module.scss'
import { useImageFallback } from '../../../../hooks'
import hiddenImage from '../../../../assets/images/hidden.png'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const [isOld] = useState(() => {
    const { localStorage } = window
    const selectedThumbnailsString = localStorage.getItem('thumbnails_selected')
    if (selectedThumbnailsString !== null) {
      const selectedThumbnails = JSON.parse(selectedThumbnailsString) as string[]
      return selectedThumbnails.includes(character.id)
    }
    return false
  })
  const { renderedImage } = useImageFallback({
    image: character.isHidden === true ? hiddenImage : character?.image?.url,
    fallback: ''
  })

  const handleHover = useCallback(() => {
    onChangeThumbnail(character)
  }, [character])

  const handleClick = useCallback(() => {
    saveSelectedThumbnails(character.id)
    navigate(`/character/${character.id as string}`)
  }, [character])

  return (
    <figure
      className={style.root}
      onMouseOver={handleHover}
      onClick={character.isHidden === true ? undefined : handleClick}
    >
      <div
        className={cn(
          style.wrapper,
          isOld ? '' : style.new,
          character.isHidden === true ? style.hidden : ''
        )}
      >
        <img src={renderedImage} className={style.thumbnail} alt="?" />
      </div>
    </figure>
  )
}

export default CharacterItem
