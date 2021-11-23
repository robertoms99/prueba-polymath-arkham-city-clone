import React from 'react'
import cn from 'classnames'
import ICharacterImage from './CharacterImage.interface'
import style from './CharacterImage.module.scss'

const CharacterImage: React.FC<ICharacterImage> = ({ source = '', className }) => {
  return (
    <figure className={cn(className, style.root)}>
      <img src={source} />
    </figure>
  )
}

export default CharacterImage
