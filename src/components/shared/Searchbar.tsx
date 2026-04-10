"use client"
import { useEffect, useState, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Author {
    id: number;
    name: string;
}

interface Book {
    id: number;
    title: string;
    slug: string;
    author?: Author;
}

const Searchbar = () => {
    const router = useRouter();
    const [query, setQuery] = useState<string>("");
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const totalItems = books.length;

    // ── Debounce ──
    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.trim() !== "") {
                fetchBooks(query);
            } else {
                setBooks([]);
                setShowDropdown(false);
                setActiveIndex(-1);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [query]);

    // Reset active index
    useEffect(() => {
        setActiveIndex(-1);
    }, [books]);

    // Outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
                setActiveIndex(-1);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ── Fetch ──
    const fetchBooks = async (searchText: string) => {
        try {
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/book-search?q=${encodeURIComponent(searchText)}`
            );
            const data = await res.json();

            if (data.status) {
                setBooks(data.data || []);
            } else {
                setBooks([]);
            }

            setShowDropdown(true);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    // ── Navigate ──
    const goToBook = useCallback((book: Book) => {
        setShowDropdown(false);
        setQuery(book.title);
        router.push(`/${book.slug}/${book.id}`);
        handleClear();
    }, [router]);

    // ── Keyboard nav ──
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown || totalItems === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex(prev => (prev + 1) % totalItems);
                break;

            case "ArrowUp":
                e.preventDefault();
                setActiveIndex(prev => (prev - 1 + totalItems) % totalItems);
                break;

            case "Enter":
                e.preventDefault();
                if (activeIndex === -1) {
                    fetchBooks(query);
                    return;
                }
                goToBook(books[activeIndex]);
                break;

            case "Escape":
                setShowDropdown(false);
                setActiveIndex(-1);
                inputRef.current?.blur();
                break;
        }
    };

    // ── Clear ──
    const handleClear = () => {
        setQuery("");
        setBooks([]);
        setShowDropdown(false);
        setActiveIndex(-1);
        inputRef.current?.focus();
    };

    return (
        <div ref={wrapperRef} className="w-full max-w-xl mx-auto relative">

            {/* Input */}
            <div className="relative flex items-center">
                <Search className="absolute left-3 text-gray-400 w-4 h-4" />

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search books, authors..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => books.length > 0 && setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-10 pr-10 py-2.5 border border-blue-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />

                <div className="absolute right-3">
                    {loading ? (
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    ) : query ? (
                        <X
                            className="w-4 h-4 text-gray-400 cursor-pointer hover:text-red-400"
                            onClick={handleClear}
                        />
                    ) : null}
                </div>
            </div>

            {/* Dropdown */}
            {showDropdown && books.length > 0 && (
                <div className="absolute w-full bg-white shadow-xl rounded-xl mt-2 max-h-80 overflow-y-auto z-50 border border-gray-100">

                    <div className="px-4 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase">
                        Books
                    </div>

                    {books.map((book, index) => (
                        <div
                            key={book.id}
                            onClick={() => goToBook(book)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer ${
                                activeIndex === index ? "bg-blue-50" : "hover:bg-blue-50"
                            }`}
                        >
                            <Search className="w-3.5 h-3.5 text-blue-500" />
                            <div>
                                <p className="text-sm font-medium">{book.title}</p>
                                {book.author?.name && (
                                    <p className="text-xs text-gray-400">
                                        {book.author.name}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Searchbar;