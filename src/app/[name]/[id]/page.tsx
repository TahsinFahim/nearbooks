import { apiFetch } from "@/lib/api";
import { Book, BookApiResponse } from "@/types/book";
import Image from "next/image";
import { ShoppingCart, Clock, FileText, BookOpen, Tag, Calendar, FolderTree, CheckCircle, XCircle } from "lucide-react";

export default async function BlogPostPage({ params }: {
    params: Promise<{ name: string; id: string }>
}) {
    const { name, id } = await params;
    const res: BookApiResponse = await apiFetch("/book/details/" + id);
    const book: Book | null = res.success ? res.data : null;

    // Calculate discounted price if applicable
    const hasDiscount = book && book.discount_parcentage && book.discount_parcentage > 0;
    const discountedPrice = hasDiscount
        ? book.price - (book.price * (book.discount_parcentage! / 100))
        : null;

    return (
        <div className="bg-gray-100 min-h-screen p-5">
            <div className="bg-white grid grid-cols-1 lg:grid-cols-6 max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden">
                {/* Image Section */}
                <div className="md:col-span-2 m-5 border rounded-lg overflow-hidden p-5 ">
                    {book?.cover_image ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${book.cover_image}`}
                            alt={book.title}
                            width={300}
                            height={400}
                            className="object-cover rounded-lg"
                        />
                    ) : (
                        <div className="bg-gray-200 w-full h-64 flex items-center justify-center">
                            <span className="text-gray-500">No cover image available</span>
                        </div>
                    )}
                    <div>
                         <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-blue-950 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 border border-gray-300">
                            <Clock className="w-5 h-5" />
                            Save for Later
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-3 p-6 md:p-8">
                    {/* Title and Meta */}
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-blue-950 mb-3">{book?.title}</h1>

                        <div className="flex flex-wrap gap-4 text-sm">
                            <span className="text-gray-600 flex items-center gap-1">
                                <span className="font-semibold text-blue-950">Author:</span> {book?.author.name}
                            </span>
                            <span className="text-gray-600 flex items-center gap-1">
                                <span className="font-semibold text-blue-950">Publisher:</span> {book?.publisher?.name || "Unknown"}
                            </span>
                            {book?.isbn && (
                                <span className="text-gray-600 flex items-center gap-1">
                                    <span className="font-semibold text-blue-950">ISBN:</span> {book.isbn}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-blue-950 mb-2 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Description
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {book?.short_description.slice(0, 180) ?? "No description available."} ...
                            <button className="font-medium text-blue-950 hover:text-blue-700 underline ml-1 transition-colors">
                                Read More
                            </button>
                        </p>
                    </div>

                    <hr className="border-gray-200 mb-6" />

                    {/* Professional Price Section */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-blue-950 mb-4 flex items-center gap-2">
                            <Tag className="w-5 h-5" />
                            Pricing & Formats
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Physical Book Price Card */}
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-950/30 transition-colors">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-950/10 p-3 rounded-lg">
                                        <BookOpen className="text-blue-950 w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-blue-950 mb-2">Physical Book</h3>
                                        {hasDiscount ? (
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-2xl font-bold text-blue-950">
                                                        ৳{Number(discountedPrice).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </span>
                                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                        -{book?.discount_parcentage}%
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-400 line-through text-sm">
                                                        ৳{Number(book?.price).toLocaleString()}
                                                    </span>
                                                    <span className="text-green-600 text-xs font-medium">
                                                        Save ৳{(book!.price - discountedPrice!).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-2xl font-bold text-blue-950">
                                                ৳{book ? Number(book.price).toLocaleString() : "Unknown"}
                                            </span>
                                        )}

                                        {/* Stock Status */}
                                        {book && (
                                            <div className="mt-2">
                                                {book.stock > 0 ? (
                                                    <p className="text-xs text-green-600 flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" />
                                                        {book.stock} copies in stock
                                                    </p>
                                                ) : (
                                                    <p className="text-xs text-red-600 flex items-center gap-1">
                                                        <XCircle className="w-3 h-3" />
                                                        Out of stock
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* PDF Version Card */}
                            {book?.pdf_price && book.pdf_price > 0 && (
                                <div className="border border-blue-950/20 bg-blue-50/30 rounded-lg p-4 hover:border-blue-950 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-blue-950/10 p-3 rounded-lg">
                                            <FileText className="text-blue-950 w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-blue-950 mb-2">PDF Version</h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-bold text-blue-950">
                                                    ৳{Number(book.pdf_price).toLocaleString()}
                                                </span>
                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    Instant
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Read on any device • No shipping
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button className="flex-1 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-blue-950 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 border border-gray-300">
                            <Clock className="w-5 h-5" />
                            Save for Later
                        </button>
                    </div>

                    {/* Additional Info */}
                    {(book?.publication_date || book?.category) && (
                        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-gray-500">
                            {book?.publication_date && (
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    Published: {new Date(book.publication_date).toLocaleDateString()}
                                </span>
                            )}
                            {book?.category && (
                                <span className="flex items-center gap-1">
                                    <FolderTree className="w-3 h-3" />
                                    Category: {book.category.name}
                                    {book.sub_category && ` / ${book.sub_category.name}`}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}