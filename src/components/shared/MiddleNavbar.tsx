"use client";

import { Heart, ShoppingCart, Download, User, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { useState } from "react";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <nav className="w-full bg-white border-b border-blue-300 sticky top-0 z-50">
                <div className="container w-[90%] lg:w-[85%] mx-auto px-4">
                    <div className="flex items-center justify-between h-16 gap-2">
                        
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-blue-950" />
                            ) : (
                                <Menu className="w-6 h-6 text-blue-950" />
                            )}
                        </button>

                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <Image
                                    src="/logo/nearbook-logo1.png"
                                    alt="NearBook Logo"
                                    width={190}
                                    height={70}
                                    priority
                                    className="cursor-pointer object-contain w-[140px] md:w-[190px]"
                                />
                            </Link>
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                            <Searchbar />
                        </div>

                        {/* Search Icon - Mobile */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label="Search"
                        >
                            <svg
                                className="w-5 h-5 text-blue-950"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2 md:gap-5">
                            {/* Download App - Desktop */}
                            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-full hover:bg-blue-900 transition text-sm">
                                <Download size={18} />
                                <span className="font-medium">Download App</span>
                            </button>

                            {/* Wishlist */}
                            <button className="relative hover:text-blue-600 transition p-1">
                                <Heart size={22} className="md:w-6 md:h-6" />
                                <span className="absolute -top-1 -right-1 text-[10px] md:text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                                    2
                                </span>
                            </button>

                            {/* Cart */}
                            <button className="relative hover:text-blue-600 transition p-1">
                                <ShoppingCart size={22} className="md:w-6 md:h-6" />
                                <span className="absolute -top-1 -right-1 text-[10px] md:text-xs bg-blue-600 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                                    3
                                </span>
                            </button>

                            {/* Account - Desktop */}
                            <button className="hidden md:flex items-center gap-2 px-4 py-2 hover:text-white text-blue-950 rounded-full hover:bg-blue-900 transition">
                                <User size={18} />
                                <span className="text-sm font-semibold">Account</span>
                            </button>

                            {/* Account Icon - Mobile */}
                            <button className="md:hidden p-1 hover:text-blue-600 transition">
                                <User size={22} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    {isSearchOpen && (
                        <div className="md:hidden py-3 border-t border-blue-100 animate-slideDown">
                            <Searchbar />
                        </div>
                    )}
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`lg:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out z-40 ${
                        isMobileMenuOpen
                            ? "max-h-96 opacity-100 visible"
                            : "max-h-0 opacity-0 invisible"
                    } overflow-hidden border-b border-blue-100`}
                >
                    <div className="flex flex-col py-4 px-6 space-y-3">
                        <Link
                            href="/wishlist"
                            className="flex items-center gap-3 py-2 text-gray-700 hover:text-blue-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Heart size={20} />
                            <span>My Wishlist</span>
                            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                2
                            </span>
                        </Link>
                        
                        <Link
                            href="/cart"
                            className="flex items-center gap-3 py-2 text-gray-700 hover:text-blue-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <ShoppingCart size={20} />
                            <span>Shopping Cart</span>
                            <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                                3
                            </span>
                        </Link>
                        
                        <Link
                            href="/account"
                            className="flex items-center gap-3 py-2 text-gray-700 hover:text-blue-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <User size={20} />
                            <span>My Account</span>
                        </Link>
                        
                        <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition mt-2">
                            <Download size={18} />
                            <span>Download App</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Backdrop Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Add animation styles */}
            <style jsx global>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.2s ease-out;
                }
            `}</style>
        </>
    );
};

export default Navbar;