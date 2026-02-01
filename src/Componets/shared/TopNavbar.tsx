import React from "react";
import { TopMenuItem, ApiResponse } from "@/types/api";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

const TopNavbar = async () => {
    const data: ApiResponse<TopMenuItem[]> = await apiFetch("/top-menu");
    const menu = data.success ? data.data : [];

    const leftItem = menu.slice(0, 1);
    const rightItems = menu.slice(1);

    return (
        <header className="w-full bg-blue-50 ">
            <div className="flex items-center justify-between px-4 py-1 w-[93%] container mx-auto">

                {/* LEFT: First Menu Item */}
                <nav className="flex items-center gap-4">
                    {leftItem.map((item) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            className="font-normal text-blue-950 hover:text-blue-600 text-sm"
                        >
                            {item.title},
                        </Link>
                    ))}
                </nav>

                {/* RIGHT: Other Menu Items */}
                <nav className="flex items-center gap-4">
                    {rightItems.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            className="text-gray-700 hover:text-blue-600 flex items-center text-[13px]"
                        >
                            {item.title}

                            {/* Show separator only if NOT last item */}
                            {index !== rightItems.length - 1 && (
                                <span className="pl-3 text-gray-400">|</span>
                            )}
                        </Link>
                    ))}
                </nav>

            </div>
        </header>
    );
};

export default TopNavbar;
