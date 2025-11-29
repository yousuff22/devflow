"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { Input } from "../ui/input";

interface LocalSearchProps {
  route: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({ route, placeholder, otherClasses }: LocalSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const query = searchParams.get("q") || "";
  const [search, setSearch] = useState(query);

  useEffect(() => {
    // Debounce the search - wait 500ms after user stops typing
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500); // 500ms delay

    // Cleanup function - cancels the timeout if user keeps typing
    return () => clearTimeout(delayDebounceFn);
  }, [search]); // Only run when search value changes

  return (
    <div className={`relative flex items-center gap-1 ${otherClasses}`}>
      <Image
        src="/icons/search.svg"
        alt="Search"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="no-focus placeholder border-none bg-transparent shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;