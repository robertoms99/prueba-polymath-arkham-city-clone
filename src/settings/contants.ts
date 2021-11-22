import React from 'react'
import LazyComponents from './LazyComponents'

const { HomeView, CharacterView } = LazyComponents

const APP_ROUTES = [
  { id: 1, path: '/', element: HomeView },
  { id: 2, path: '/character/:characterSlug', element: CharacterView }
]

const THUMBNAIL_CONTEXT = React.createContext<{
  characters: any[]
  thumbnail: any | null
  onChangeCharacters: Function
  onChangeThumbnail: Function
}>({ thumbnail: null, characters: [], onChangeCharacters: () => {}, onChangeThumbnail: () => {} })

export { APP_ROUTES, THUMBNAIL_CONTEXT }
