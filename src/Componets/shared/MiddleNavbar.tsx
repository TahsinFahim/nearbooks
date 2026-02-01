import { Heart, ShoppingCart, Download, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="w-full bg-white border-b  border-blue-300">
            <div className="container w-[85%] mx-auto px-4">
                <div className="grid grid-cols-5 items-center h-16">

                    {/* Left: Logo */}
                    <div className="flex items-center col-span-1">
                        <Link href="/">
                            <Image
                                src="/logo/nearbook-logo1.png"   // public/logo/nearbook-logo.png
                                alt="NearBook Logo"
                                width={190}
                                height={70}
                                priority
                                className="cursor-pointer object-contain"
                            />
                        </Link>
                    </div>

                    {/* Center: Search Bar */}
                    <div className="flex justify-center col-span-2">
                        <input
                            type="text"
                            placeholder="Search books..."
                            className="w-full  px-4 py-2 border border-blue-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-5 col-span-2">

                        {/* Download App */}
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-full hover:bg-blue-900 transition">
                            <Download size={18} />
                            <span className="text-sm font-medium">Download App</span>
                        </button>

                        {/* Wishlist */}
                        <button className="relative hover:text-blue-600 transition">
                            <Heart size={24} />
                            <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
                                2
                            </span>
                        </button>

                        {/* Cart */}
                        <button className="relative hover:text-blue-600 transition">
                            <ShoppingCart size={24} />
                            <span className="absolute -top-1 -right-2 text-xs bg-blue-600 text-white rounded-full px-1">
                                3
                            </span>
                        </button>

                         <button className="hidden md:flex items-center gap-2 px-4 py-2 hover:text-white  text-blue-950 rounded-full hover:bg-blue-900 transition">
                            <User size={18} />
                            <span className="text-base font-semibold">Account</span>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
