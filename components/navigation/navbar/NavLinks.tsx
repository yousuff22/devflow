"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <Link
            href={item.route}
            key={item.label}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
              "text-dark300_light700", // default text color

              isActive
                ? "primary-gradient font-semibold text-primary-500" // ACTIVE
                : "hover:background-light800_dark300 hover:text-primary-500", // HOVER

              isMobileNav && "w-full justify-start" // For mobile drawer
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn(isActive && "brightness-125")} // Slight glow on active
            />

            <p
              className={cn("paragraph-medium", isActive && "text-primary-500")}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
