"use client"

import { FolderViewContainer } from "./Container"
import { FolderViewPagination } from "./Pagination"
import { FolderViewRoot } from "./Root"
import { FolderViewShelf } from "./SearchBar"
import { FolderViewSearchField } from "./SearchField"
import { FolderViewShelfItem } from "./ShelfItem"

/**
 * Modular way to construct an explorer, this element contains namespaced sub-components
 * @example
 * ```tsx
 * <FolderView>
 *  <FolderView.Shelf>
 *    <FolderView.ShelfItem>...</FolderView.ShelfItem>
 *    <FolderView.ShelfItem>...</FolderView.ShelfItem>
 *  </FolderView.Shelf>
 *
 *  <FolderView.Container>
 *    <FolderView.SearchField />
 *    <div>...</div>
 *    <div>...</div>
 *    <div>...</div>
 *  </FolderView.Container>
 * </FolderView>
 * ```
 */
const FolderView = Object.assign(FolderViewRoot, {
  /**
   * This component should be below {@link FolderView.Shelf} as the root element is a flexbox.
   *
   * @example
   * ```tsx
   * <FolderView>
   *  <FolderView.Shelf>
   *    <FolderView.ShelfItem>...</FolderView.ShelfItem>
   *    <FolderView.ShelfItem>...</FolderView.ShelfItem>
   *  </FolderView.Shelf>
   *
   *  // FolderView.Container should be placed BELOW FolderView.Shelf
   *  <FolderView.Container></FolderView.Container>
   * </FolderView>
   * ```
   */
  Container: FolderViewContainer,
  /**
   * This component should be above {@link FolderView.Container} as the root element is a
   * flexbox and the only child component it accepts is {@link FolderView.ShelfItem}.
   */
  Shelf: FolderViewShelf,
  /**
   * This component is the only accepted child component of {@link FolderView.Shelf}.
   */
  ShelfItem: FolderViewShelfItem,
  /**
   * A required component for searching and filtering items  and responsible for changing the view
   * of its items inside it, if necessary.
   *
   * This component should be placed inside {@link FolderView.Container}.
   */
  SearchField: FolderViewSearchField,
  /**
   * An optional component, if user set their settings to "paginated" instead of "infinite scroll" via settings,
   * to display a paginated number of items.
   *
   * This component should be placed inside {@link FolderView.Container}.
   */
  Pagination: FolderViewPagination
})

export { FolderView }
