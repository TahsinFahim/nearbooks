"use client";

import React from "react";
import Link from "next/link";
import { Category, SubCategory } from "@/types/category";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface BottomNavbarClientProps {
  categories: Category[];
}

const BottomNavbarClient = ({ categories }: BottomNavbarClientProps) => {
  const hasSubCategories = (category: Category) => 
    category.sub_categories && category.sub_categories.length > 0;

  const getCategoryUrl = (category: Category) => {
    // Only return URL if category has no subcategories
    if (!hasSubCategories(category)) {
      return `/category/${category.slug.replace("/", "")}`;
    }
    return "#";
  };

  const getSubCategoryUrl = (category: Category, subCategory: SubCategory) => {
    return `/category/${category.slug.replace("/", "")}/${subCategory.slug.replace("/", "")}`;
  };

  const renderSubCategoryGrid = (category: Category) => {
    if (!category.sub_categories || category.sub_categories.length === 0) return null;
    
    return (
      <div className="w-[70vw] p-6 max-h-[70vh] overflow-y-auto">
        {/* SUB CATEGORIES GRID */}
        <div className="mb-6">
          <div className="flex gap-1">
            {category.sub_categories.map((subCategory) => (
              <Link
                key={subCategory.id}
                href={getSubCategoryUrl(category, subCategory)}
                className="
                  group/subcategory flex flex-col gap-2 p-4
                  hover:bg-blue-50 hover:border-blue-200
                  border border-transparent rounded-lg
                  transition-all duration-200
                  min-h-[100px]
                "
              >
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 group-hover/subcategory:text-blue-950 truncate text-base">
                    {subCategory.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover/subcategory:text-blue-600 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm relative">
      <div className="container mx-auto px-4">
        <nav 
          className="flex items-center justify-center relative"
          aria-label="Main navigation"
        >
          {categories.map((category) => (
            <HoverCard key={category.id} openDelay={100} closeDelay={200}>
              <HoverCardTrigger asChild>
                <div className="relative">
                  {/* CATEGORY BUTTON/LINK */}
                  <Link
                    href={getCategoryUrl(category)}
                    className={`
                      group/category flex items-center gap-2 px-3 py-4
                      font-medium transition-all duration-200
                      data-[state=open]:text-blue-950 data-[state=open]:border-b-2 data-[state=open]:border-blue-950 data-[state=open]:font-semibold
                      ${hasSubCategories(category) 
                        ? "cursor-default text-gray-700 hover:text-blue-950 hover:bg-gray-50" 
                        : "text-gray-700 hover:text-blue-950 hover:bg-gray-50"
                      }
                    `}
                    onClick={(e) => {
                      if (hasSubCategories(category)) {
                        e.preventDefault();
                      }
                    }}
                    aria-haspopup={hasSubCategories(category) ? "true" : "false"}
                    aria-expanded={hasSubCategories(category) ? "false" : undefined}
                  >
                    <span className="whitespace-nowrap">{category.name}</span>
                    {hasSubCategories(category) && (
                      <ChevronDown 
                        className="w-4 h-4 text-gray-500 transition-transform duration-200 group-data-[state=open]/hover-card:rotate-180"
                      />
                    )}
                  </Link>
                </div>
              </HoverCardTrigger>

              {/* MEGA DROPDOWN CONTENT */}
              {hasSubCategories(category) && (
                <HoverCardContent 
                  className="
                    w-auto p-0 border border-gray-200 shadow-xl rounded-lg
                    data-[side=bottom]:mt-0
                    bg-white
                    overflow-hidden
                  "
                  side="bottom"
                  align="center"
                  sideOffset={1}
                  collisionPadding={16}
                  avoidCollisions={true}
                >
                  {renderSubCategoryGrid(category)}
                </HoverCardContent>
              )}
            </HoverCard>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BottomNavbarClient;