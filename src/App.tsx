import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThumbnailProvider } from './components'
import { APP_ROUTES } from './settings/contants'

function App() {
  return (
    <Suspense fallback={<h1>loading</h1>}>
      <ThumbnailProvider>
        <BrowserRouter>
          <Routes>
            {APP_ROUTES.map(({ id: key, element: Component, path }) => (
              <Route path={path} key={key} element={<Component />} />
            ))}
          </Routes>
        </BrowserRouter>
      </ThumbnailProvider>
    </Suspense>
  )
}

export default App
