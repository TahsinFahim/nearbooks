"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Category, SubCategory } from "@/types/category";
import { ChevronDown, ChevronRight, Facebook, Menu, MessageCircle, Phone, X } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface BottomNavbarClientProps {
  categories: Category[];
}

const BottomNavbarClient = ({ categories }: BottomNavbarClientProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsTablet(tablet);

      if (!mobile) {
        setIsMobileMenuOpen(false);
        setOpenMobileCategory(null);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setOpenMobileCategory(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const hasSubCategories = (category: Category) =>
    category.sub_categories && category.sub_categories.length > 0;

  const getCategoryUrl = (category: Category) => {
    if (!hasSubCategories(category)) {
      return `/category/${category.slug.replace("/", "")}`;
    }
    return "#";
  };

  const getSubCategoryUrl = (category: Category, subCategory: SubCategory) => {
    return `/category/${category.slug.replace("/", "")}/${subCategory.slug.replace("/", "")}`;
  };

  const renderSubCategoryGrid = (category: Category, isMobileView = false) => {
    if (!category.sub_categories || category.sub_categories.length === 0) return null;

    if (isMobileView) {
      return (
        <div className="pl-6 mt-2 space-y-2 border-l-2 border-blue-200 ml-2">
          {category.sub_categories.map((subCategory) => (
            <Link
              key={subCategory.id}
              href={getSubCategoryUrl(category, subCategory)}
              onClick={() => {
                setIsMobileMenuOpen(false);
                setOpenMobileCategory(null);
              }}
              className="flex items-center justify-between py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <span className="text-sm">{subCategory.name}</span>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </Link>
          ))}
        </div>
      );
    }

    // Desktop/Tablet grid view
    const columnCount = isTablet ? 3 : 4;
    return (
      <div className={`w-screen max-w-[${isTablet ? '80vw' : '70vw'}] md:max-w-${isTablet ? '5xl' : '6xl'} p-4 md:p-6 max-h-[70vh] overflow-y-auto`}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columnCount} gap-3 md:gap-4`}>
          {category.sub_categories.map((subCategory) => (
            <Link
              key={subCategory.id}
              href={getSubCategoryUrl(category, subCategory)}
              className="
                group/subcategory flex items-center justify-between p-3 md:p-4
                hover:bg-blue-50 hover:border-blue-200
                border border-transparent rounded-lg
                transition-all duration-200
              "
            >
              <span className="font-medium text-gray-900 group-hover/subcategory:text-blue-950 text-sm md:text-base truncate">
                {subCategory.name}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover/subcategory:text-blue-600 flex-shrink-0 ml-2" />
            </Link>
          ))}
        </div>
      </div>
    );
  };

  // Desktop/Tablet View (LG devices and above)
  if (!isMobile) {
    return (
      <div className="w-full bg-white border-b border-gray-200 shadow-sm relative z-40">
        <div className="container mx-auto px-4">
          <nav
            className="flex items-center justify-start lg:justify-center overflow-x-auto overflow-y-hidden hide-scrollbar"
            aria-label="Main navigation"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="flex items-center gap-1 md:gap-2">
              {categories.map((category) => (
                <HoverCard key={category.id} openDelay={100} closeDelay={200}>
                  <HoverCardTrigger asChild>
                    <div className="relative flex-shrink-0">
                      <Link
                        href={getCategoryUrl(category)}
                        className={`
                          group/category flex items-center gap-1 md:gap-2 px-2 md:px-3 py-3 md:py-4
                          text-sm md:text-base font-medium transition-all duration-200
                          hover:text-blue-950 hover:bg-gray-50 rounded-md
                          ${hasSubCategories(category) ? "cursor-default" : ""}
                          whitespace-nowrap
                        `}
                        onClick={(e) => {
                          if (hasSubCategories(category)) {
                            e.preventDefault();
                          }
                        }}
                        aria-haspopup={hasSubCategories(category) ? "true" : "false"}
                      >
                        <span>{category.name}</span>
                        {hasSubCategories(category) && (
                          <ChevronDown
                            className="w-3 h-3 md:w-4 md:h-4 text-gray-500 transition-transform duration-200 group-data-[state=open]/hover-card:rotate-180"
                          />
                        )}
                      </Link>
                    </div>
                  </HoverCardTrigger>

                  {hasSubCategories(category) && (
                    <HoverCardContent
                      className="
                        w-auto p-0 border border-gray-200 shadow-xl rounded-lg
                        bg-white overflow-hidden
                      "
                      side="bottom"
                      align="center"
                      sideOffset={1}
                      collisionPadding={16}
                      avoidCollisions={true}
                    >
                      {renderSubCategoryGrid(category, false)}
                    </HoverCardContent>
                  )}
                </HoverCard>
              ))}
            </div>
          </nav>
        </div>

        <style jsx global>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: thin;
          }
          .hide-scrollbar::-webkit-scrollbar {
            height: 4px;
          }
          .hide-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .hide-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .hide-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
      </div>
    );
  }

  // Mobile View (SM devices and below)
  return (
    <>
      {/* Mobile Bottom Navbar Button */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm z-40 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">

            {/* Left - Call */}
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-900 text-sm">
                01323814588
              </span>
            </div>

            {/* Middle - Social */}
            <div className="flex items-center gap-4">
              <i className="fab fa-whatsapp bg-green-700 p-1 rounded-full text-white text-lg cursor-pointer hover:scale-110 transition"></i>
              <i  className="fa-brands fa-xl  fa-facebook-messenger text-blue-500 text-lg cursor-pointer hover:scale-110 transition"></i>
            </div>

            {/* Right - Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-gray-700"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setOpenMobileCategory(null);
            }}
          />

          <div
            ref={mobileMenuRef}
            className="fixed top-0 left-0 w-[85%] max-w-sm h-full bg-white shadow-2xl z-50 lg:hidden overflow-y-auto transform transition-transform duration-300"
          >
            {/* Mobile Menu Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-gray-900">All Categories</h2>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setOpenMobileCategory(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contact Info in Mobile Menu */}
            <div className="px-4 py-3 border-b border-gray-100 bg-blue-50">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-gray-900">01323814588</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Call us for support</p>
            </div>

            {/* Mobile Categories List */}
            <div className="py-2">
              {categories.map((category) => (
                <div key={category.id} className="border-b border-gray-100">
                  {hasSubCategories(category) ? (
                    <>
                      <button
                        onClick={() => setOpenMobileCategory(
                          openMobileCategory === category.id ? null : category.id
                        )}
                        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-800">{category.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${openMobileCategory === category.id ? "rotate-180" : ""
                            }`}
                        />
                      </button>
                      {openMobileCategory === category.id && (
                        <div className="bg-gray-50 py-2">
                          {renderSubCategoryGrid(category, true)}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={getCategoryUrl(category)}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setOpenMobileCategory(null);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-800">{category.name}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BottomNavbarClient;