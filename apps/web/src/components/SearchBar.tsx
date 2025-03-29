"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { LuSearch, LuX } from "react-icons/lu";
import { Button } from "@mav/ui/components/buttons";
import { InputField } from "@mav/ui/components/fields";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !isOpen) {
        event.preventDefault();
        setIsOpen(true);
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    // TODO: Search logic
  };

  return (
    <div className="top-full relative">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          prefix={<LuSearch size={18} />}
          className="hover:!bg-100 w-64"
          variant="secondary"
        >
          Type
          <kbd className="bg-400 text-xs px-1 rounded">/</kbd>
          to search
        </Button>
      )}

      <Transition
        show={isOpen}
        enter="transition duration-[200ms] ease"
        enterFrom="transform -translate-y-1 opacity-0"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition duration-[200ms] ease"
        leaveTo="transform -translate-y-1 opacity-0"
        leaveFrom="transform translate-y-0 opacity-100"
        // @ts-expect-error
        className="translate-x-0 top-0"
      >
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed z-50 inset-0 overflow-y-auto top-3.5"
        >
          <div className="flex items-center justify-center w-full">
            <form onSubmit={handleSearch} className="flex items-center gap-x-2 w-2/3">
              <InputField
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Character, Artist, Artwork, User..."

              />
            </form>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
