import React from 'react'
import LazyComponents from './LazyComponents'

const { HomeView, CharacterView } = LazyComponents

const APP_ROUTES = [
  { id: 1, path: '/', element: HomeView },
  { id: 2, path: '/character/:characterSlug', element: CharacterView }
]

const THUMBNAIL_CONTEXT = React.createContext<{
  thumbnail: any | null
  onChangeThumbnail: Function
}>({ thumbnail: null, onChangeThumbnail: () => {} })

export { APP_ROUTES, THUMBNAIL_CONTEXT }
