import ThreadContainer from "./ThreadContainer"
import { MaterialIcons } from "@expo/vector-icons"
import { closeMediaViewer } from "@/store/MediaViewerStore"
import { useMediaViewerStore } from "@/hooks/useMediaViewerStore"
import { useState, useEffect, useRef } from "react"

export default function MediaViewer() {
  const { currentImageUrl, currentThread } = useMediaViewerStore()
  const threadMedia = currentThread?.mediaContent || []

  const [currentMedia, setCurrentMedia] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const index = threadMedia.findIndex((m) => m.src === currentImageUrl)
  if (index >= 0) {
    setCurrentMedia(index)
    const slide = carouselRef.current?.children[index] as HTMLElement
    slide?.scrollIntoView({ behavior: "auto", inline: "center" })
  }
}, [currentImageUrl, threadMedia])

  if (!currentImageUrl || !currentThread) return null

  function showPrev() {
    const newIndex = currentMedia > 0 ? currentMedia - 1 : threadMedia.length - 1
    setCurrentMedia(newIndex)
    scrollToIndex(newIndex)
  }

  function showNext() {
    const newIndex = currentMedia < threadMedia.length - 1 ? currentMedia + 1 : 0
    setCurrentMedia(newIndex)
    scrollToIndex(newIndex)
  }

  function scrollToIndex(index: number) {
    const slide = carouselRef.current?.children[index] as HTMLElement
    slide?.scrollIntoView({ behavior: "smooth", inline: "center" })
  }

  function onScroll() {
    if (!carouselRef.current) return
    const { scrollLeft, offsetWidth } = carouselRef.current
    const index = Math.round(scrollLeft / offsetWidth)
    setCurrentMedia(index)
  }

  return (
    <div className="media-viewer">
      <div className="carousel-container">
        <div
          className="carousel-track"
          ref={carouselRef}
          onScroll={onScroll}
        >
          {threadMedia.map((media, idx) => (
            <div className="carousel-slide" key={idx}>
              <img src={media.src} alt={media.alt || `media-${idx}`} tabIndex={0} />
            </div>
          ))}
        </div>

        <button id="beforeMediaButton" title="Before" onClick={showPrev}>
          <div className="shadow-abs">
            <MaterialIcons name="navigate-before" size={38} color="black" />
          </div>
          <MaterialIcons name="navigate-before" size={38} color="white" />
        </button>
        <button id="nextMediaButton" title="Next" onClick={showNext}>
          <div className="shadow-abs">
            <MaterialIcons name="navigate-next" size={38} color="black" />
          </div>
          <MaterialIcons name="navigate-next" size={38} color="white" />
        </button>
      </div>

      <div className="thread">
        <ThreadContainer {...currentThread} />
      </div>

      <button
        onClick={() => closeMediaViewer()}
        className="close-button"
        title="Close"
      >
        <MaterialIcons name="close" size={28} color="white" />
      </button>
    </div>
  )
}