import { useEffect, useRef, useState } from 'react'

const useImageFallback = ({ image, fallback }: { image: string; fallback: string }) => {
  const imgRef = useRef<null | HTMLImageElement>(null)
  const [renderedImage, setRenderedImage] = useState(fallback)

  useEffect(() => {
    let imgElement: HTMLImageElement | null = imgRef.current ?? document.createElement('img')
    imgRef.current = imgElement
    imgRef.current.src = image
    imgRef.current.onload = () => setRenderedImage(image)
    return () => {
      if (imgRef.current !== null) {
        imgRef.current.onload = null
      }
      imgElement = null
    }
  }, [image])

  return { renderedImage }
}

export default useImageFallback
