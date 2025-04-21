"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  UsersIcon,
  MegaphoneIcon,
  ChevronDownIcon,
  ArrowTrendingUpIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

const navigation = [
  {
    name: "Post AI News",
    href: "/admin-area/post-ai-news",
    icon: MegaphoneIcon,
  },
  {
    name: "Creator Management",
    href: "/admin-area/user-management",
    icon: UsersIcon,
  },
  {
    name: "Analytics per Creator",
    href: "/admin-area/analytics",
    icon: ArrowTrendingUpIcon,
  },
  {
    name: "Analytics per Content Type",
    href: "/admin-area/content-type-analytics",
    icon: ChartPieIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("inplayer_access_token");
    sessionStorage.removeItem("inplayer_access_token");
    localStorage.removeItem("admin_access_token");
    sessionStorage.removeItem("admin_access_token");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Sidebar */}
      <Dialog
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className="relative z-50 lg:hidden"
      >
        <div
          className="fixed inset-0 bg-gray-900 opacity-75"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex">
          <Dialog.Panel className="relative w-64 bg-gray-800 text-white flex flex-col">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-lg font-bold">Admin Area</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-4 flex-1">
              <Link href={"/"}>
                <p className="text-xs ml-4 text-white mb-4 mt-4">
                  ← Take me back.
                </p>
              </Link>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-600 hover:text-white",
                    "flex items-center px-4 py-2 rounded-md text-sm font-medium"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <footer className="p-4 text-center text-xs text-red-400">
              Admin only
            </footer>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-gray-800 text-white min-h-screen">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">Admin Area</h2>
        </div>
        <nav className="mt-4 flex-1">
          <Link href={"/"}>
            <p className="text-xs ml-4 text-white mb-4 mt-4">← Take me back.</p>
          </Link>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                pathname === item.href
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-600 hover:text-white",
                "flex items-center px-4 py-2 rounded-md text-sm font-medium"
              )}
            >
              <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </nav>
        <footer className="p-4 text-center text-xs text-red-400">
          Admin only
        </footer>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 flex flex-col">
        <header className="sticky top-0 z-10 bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold">Admin Area</h1>
          {/* User Menu */}
          <Menu as="div" className="relative">
            <MenuButton className="inline-flex items-center rounded-full bg-gray-50 p-2 text-sm text-gray-500 hover:bg-gray-200">
              <span className="sr-only">Open user menu</span>
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
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
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
