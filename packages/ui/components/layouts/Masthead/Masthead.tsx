"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { mergeNamespaceComponents } from "@mav/shared/utils"
import { Tabs } from "../../Tabs"
import { MastheadAvatar } from "./Avatar"
import { MastheadBanner } from "./Banner"
import { MastheadDetails } from "./Details"
import { MastheadLayer } from "./Layer"
import { MastheadRoot } from "./Root"
import { MastheadTabs } from "./Tabs"
import { MastheadWrapper } from "./Wrapper"

/**
 * Used for displaying first-hand info such as profile, characters, events, etc. It's
 * strongly recommended to be wrapped as a unifed component since it's marked with a
 * `"use client"` directive.
 *
 * It contains namespaced components for ease and readability; and should follow a
 * specific order of components to achieve the expected look. Inside the root component,
 * its sub-components: {@link Masthead.Details} and {@link Masthead.Tabs} are required, while
 * {@link Masthead.Banner} is optional or shown via state condition that will be fetched
 * through the API.
 *
 * @example
 *
 * ```tsx
 * <Masthead>
 *  <Masthead.Banner>
 *    <img src="./profile-banner.webp" alt={providedBannerAlt || ""} />
 *  </Masthead.Banner>
 *  <Masthead.Wrapper>
 *    <Masthead.Avatar>
 *      <img src="./profile-banner.webp" alt={providedAvatarAlt || ""} />
 *    </Masthead.Avatar>
 *    <Masthead.Details>
 *      <Masthead.Layer>{name}</Masthead.Layer>
 *      <Masthead.Layer>{followerCount} - {followingCount}</Masthead.Layer>
 *      <Masthead.Layer>{profileBio}</Masthead.Layer>
 *    </Masthead.Details>
 *  </Masthead.Wrapper>
 *  <Masthead.Tabs items={tabItems} />
 * </Masthead>
 * ```
 */
const Masthead = Object.assign(MastheadRoot, {
  Avatar: MastheadAvatar,
  Banner: MastheadBanner,
  /**
   * A flex `<div>` wrapper for encapsulating {@link Masthead.Details} and
   * {@link Masthead.Avatar} to be displayed correctly in the UI
   *
   * @example
   *
   * ```tsx
   * <Masthead.Wrapper>
   *  <Masthead.Avatar>...</Masthead.Avatar>
   *  <Masthead.Details>...</Masthead.Details>
   * </Masthead.Wrapper>
   * ```
   */
  Wrapper: MastheadWrapper,
  /**
   * A layer for useful information (i.e. username, follower/following count, etc.),
   * must be wrapped in {@link Masthead.Details}
   *
   * @example
   *
   * ```tsx
   * <Masthead.Details>
   *  <Masthead.Layer>Layer 1</Masthead.Layer>
   *  <Masthead.Layer>Layer 2</Masthead.Layer>
   *  <Masthead.Layer>Layer 3</Masthead.Layer>
   * </Masthead.Details>
   * ```
   */
  Layer: MastheadLayer,
  /**
   * Used for wrapping {@link Masthead.Layer} components only
   */
  Details: MastheadDetails,
  /**
   * A wrapper for the {@link Tabs} component
   */
  Tabs: MastheadTabs
})

export { Masthead }

function yes() {
  return <Masthead></Masthead>
}
