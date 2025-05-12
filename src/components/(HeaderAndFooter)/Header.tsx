"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANDING_NAVITEMS } from "../../../utils/constants";

const navigation = [
  { name: "Join as a Creator", href: "/ai-video-creators" },
  { name: "About", href: "/about" },
  // { name: "AI Video News", href: "/news" }, Hiding for now.
  { name: "Blog", href: "/blog" },
  {
    name: "Izsit TV",
    href: "https://app.izsit.com",
    badge: true,
  },
  { name: "Creator Portal", href: "/creator-login", type: 'primary' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState(navigation);
  const pathname = usePathname();
  const currentPage = pathname.split("/")[1];
  useEffect(() => {
    console.log("I called");
    if (currentPage == "landing-page") {
      setNavItems(LANDING_NAVITEMS);
    } else {
      setNavItems(navItems);
    }
  }, [pathname]);

  return (
    <header className="sticky top-0 bg-gray-900 z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Izsit</span>
            <img
              alt="Izsit Logo"
              src="/logo/izsit-logo.svg"
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.name === "Izsit TV" ? "_blank" : "_self"} // Only open Izsit TV in a new tab
              rel={item.name === "Izsit TV" ? "noopener noreferrer" : undefined} // Add security attributes only for Izsit TV
              className={`text-sm font-semibold text-white flex items-center uppercase px-4 py-2 rounded-sm ${item?.type == 'primary' ? 'bg-primary' : item?.type == 'secondary' ? 'border border-primary' : 'px-0'}`}
            >
              {item.name}
              {item.badge && (
                <span className="ml-2 inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/30">
                  Alpha
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Dialog for Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="relative z-50 lg:hidden"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        {/* Mobile Menu */}
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Izsit</span>
              <img
                alt="Izsit Logo"
                src="/logo/izsit-logo.svg"
                className="h-10 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.name === "Izsit TV" ? "_blank" : "_self"}
                    rel={
                      item.name === "Izsit TV"
                        ? "noopener noreferrer"
                        : undefined
                    } // Add security attributes only for Izsit TV
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-gray-800 flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    {item.badge && (
                      <span className="ml-2 inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/30">
                        Alpha
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
