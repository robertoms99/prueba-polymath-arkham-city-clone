import React from 'react'
import ICharacterImage from './CharacterImage.interface'
import style from './CharacterImage.module.scss'

const CharacterImage: React.FC<ICharacterImage> = ({ source = '' }) => {
  return (
    <figure className={style.root}>
      <img src={source} />
    </figure>
  )
}

export default CharacterImage
