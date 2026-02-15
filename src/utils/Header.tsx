import { ChevronRight, Star, Sparkles } from "lucide-react";

interface HeaderProps {
    title: string;
    subtitle?: string;
    showRating?: boolean;
    ctaText?: string;
}

const Header = ({
    title,

    showRating = true,
    ctaText = "Explore All"
}: HeaderProps) => {
    return (
        <header className="w-full py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    {/* Left Section */}
                    <div className="space-y-4">



                        {/* Main Title with underline effect */}
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                                {title}
                                <div className="relative mt-3">
                                    <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
                                    <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full mt-1"></div>
                                </div>
                            </h1>


                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Rating with enhanced design */}
                        {showRating && (
                            <div className="flex items-center gap-3 px-4 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-600 mt-1">Customer Rating</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-gray-900">4.8</span>
                                    <span className="text-xs text-gray-500">out of 5</span>
                                </div>
                            </div>
                        )}

                        {/* CTA Button with enhanced effects */}
                        <button className="group relative inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white font-semibold rounded-xl  active:translate-y-0 transition-all duration-300 overflow-hidden min-w-[140px]">
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                            {/* Button content */}
                            <span className="relative z-10">{ctaText}</span>
                            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />

                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                        </button>
                    </div>
                </div>

                {/* Decorative separator */}
                
            </div>
        </header>
    );
};

export default Header;