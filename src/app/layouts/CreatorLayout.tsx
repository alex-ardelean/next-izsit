"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  ChevronDownIcon,
  NumberedListIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/creator-dashboard",
    icon: HomeIcon,
  },
  {
    name: "Upload new video",
    href: "/upload-video",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Your videos",
    href: "/creator-videos",
    icon: FolderIcon,
  },
  {
    name: "Your series",
    href: "/creator-series",
    icon: NumberedListIcon,
  },
  {
    name: "Your Profile info",
    href: "/creator-profile",
    icon: UserCircleIcon,
  },
  {
    name: "Your analytics",
    href: "/creator-analytics",
    icon: ChartBarIcon,
  },
  {
    name: "FAQ",
    href: "/creator-faq",
    icon: QuestionMarkCircleIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface CreatorLoginLayoutProps {
  children: React.ReactNode;
}

export default function CreatorLoginLayout({
  children,
}: CreatorLoginLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("inplayer_access_token");
    sessionStorage.removeItem("inplayer_access_token");
    router.push("/");
  };

  return (
    <div>
      {/* Mobile Sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
            <div className="absolute top-0 right-0 p-2">
              <button onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="mt-5 flex h-16 items-center">
              <img
                alt="Izsit"
                src="/logo/izsit-logo.svg"
                className="h-8 w-auto pl-2"
              />
            </div>
            <Link href={"/"}>
              <p className="text-xs text-white mb-4 mt-4">← Take me back.</p>
            </Link>
            <nav className="flex flex-col mt-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-emerald-500 text-gray-900"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white",
                    "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold"
                  )}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  {item.name}
                  {item.name === "Your analytics" && (
                    <span
                      className={classNames(
                        pathname === item.href
                          ? "bg-gray-800  text-emerald-400"
                          : "bg-emerald-400/10 text-emerald-400",
                        "ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-emerald-400/30"
                      )}
                    >
                      Alpha
                    </span>
                  )}
                </a>
              ))}
            </nav>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-gray-900 px-6 pb-4">
        <div className="flex h-16 items-center">
          <img
            alt="Izsit"
            src="/logo/izsit-logo.svg"
            className="h-8 w-auto pl-2"
          />
        </div>
        <Link href={"/"}>
          <p className="text-xs text-white mb-4 mt-4">← Take me back.</p>
        </Link>
        <nav className="flex flex-1 flex-col mt-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                pathname === item.href
                  ? "bg-emerald-500 text-gray-900"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
                "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold"
              )}
            >
              <item.icon className="w-5 h-5" aria-hidden="true" />
              {item.name}
              {item.name === "Your analytics" && (
                <span
                  className={classNames(
                    pathname === item.href
                      ? "bg-gray-800  text-emerald-400"
                      : "bg-emerald-400/10 text-emerald-400",
                    "ml-2 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-emerald-400/30"
                  )}
                >
                  Alpha
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex h-16 items-center bg-gray-50 px-4 shadow-sm sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-700"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <div className="ml-auto flex items-center gap-x-4">
            <Menu as="div" className="relative">
              <MenuButton className="inline-flex items-center rounded-full bg-gray-50 p-2 text-sm text-gray-500 hover:bg-gray-200">
                <span className="sr-only">Open user menu</span>
                <span className="inline-block size-6 overflow-hidden rounded-full bg-gray-100">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="size-full text-gray-300"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </header>
        <main className="p-6 min-h-screen bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
