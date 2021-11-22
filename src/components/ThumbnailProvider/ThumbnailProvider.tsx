import React, { useState } from 'react'
import { THUMBNAIL_CONTEXT } from '../../settings/contants'

const ThumbnailProvider: React.FC = ({ children }) => {
  const [thumbnail, onChangeThumbnail] = useState(null)

  return (
    <THUMBNAIL_CONTEXT.Provider value={{ thumbnail, onChangeThumbnail }}>
      {children}
    </THUMBNAIL_CONTEXT.Provider>
  )
}

export default ThumbnailProvider
