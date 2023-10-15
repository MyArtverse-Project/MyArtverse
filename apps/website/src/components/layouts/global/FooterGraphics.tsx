export default function FooterGradient() {
  return (
    <svg
      aria-hidden
      className="absolute inset-x-0 -top-6 bottom-[unset] -z-[1]"
      viewBox="0 0 1289 317"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="rg1"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(233.5 56) rotate(90) scale(138 448.5)"
        >
          <stop stopColor="#4FDCE5" />
          <stop offset="1" stopColor="#4FDCE5" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="rg2"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(658.5 56) rotate(90) scale(138 526.5)"
        >
          <stop stopColor="#8441F0" />
          <stop offset="1" stopColor="#B54FE5" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="rg3"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1155.5 89) rotate(90) scale(189 526.5)"
        >
          <stop stopColor="#E22FFF" />
          <stop offset="1" stopColor="#D04FE5" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g>
        <rect
          opacity="0.12"
          x="-215"
          y="-82"
          width="897"
          height="276"
          fill="url(#rg1)"
        />
        <rect
          opacity="0.12"
          x="132"
          y="-82"
          width="1053"
          height="276"
          fill="url(#rg2)"
        />
        <rect
          opacity="0.12"
          x="629"
          y="-100"
          width="1053"
          height="378"
          fill="url(#rg3)"
        />
      </g>
    </svg>
  )
}
