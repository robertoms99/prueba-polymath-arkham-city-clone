import React from 'react'
import { THUMBNAIL_CONTEXT } from '../../settings/contants'
import { useCharacters } from './hooks'

const ThumbnailProvider: React.FC = ({ children }) => {
  const { thumbnail, characters, onChangeCharacters, onChangeThumbnail } = useCharacters()

  return (
    <THUMBNAIL_CONTEXT.Provider
      value={{ thumbnail, characters, onChangeCharacters, onChangeThumbnail }}
    >
      {children}
    </THUMBNAIL_CONTEXT.Provider>
  )
}

export default ThumbnailProvider
