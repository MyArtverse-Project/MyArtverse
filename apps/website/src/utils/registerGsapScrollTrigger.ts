"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

export function registerGsapScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger)
}
