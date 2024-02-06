"use client"

import { useRef } from "react"
import useGSAPContext from "@/hooks/useGSAPContext"
import { ProseWrapper } from "@myfursona/biro-ui"

export default function LandingIntegration() {
  const animateGraphicRef = useRef<HTMLDivElement>(null)

  useGSAPContext((self) => {}, animateGraphicRef)

  return (
    <div className="flex justify-between items-center">
      <div ref={animateGraphicRef}></div>
      <article>
        <ProseWrapper>
          <h1>Import from other platforms</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum minima eveniet
            exercitationem, corporis voluptatum maxime totam tempore. Officia, voluptatibus.
          </p>
          <p>
            Architecto rerum, ratione, omnis inventore quis reprehenderit saepe iure temporibus
            nesciunt provident eum culpa facilis laudantium magni debitis alias?
          </p>
        </ProseWrapper>
      </article>
    </div>
  )
}
