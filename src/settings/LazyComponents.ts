import { lazy } from 'react'

const LazyComponents = {
  HomeView: lazy(async () => await import('../pages/HomeView')),
  CharacterView: lazy(async () => await import('../pages/CharacterView'))
}

export default LazyComponents
