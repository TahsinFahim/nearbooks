import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Nearbook</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Your trusted platform for university books, academic projects,
            assignments, and knowledge sharing.
          </p>

          <div className="mt-4 flex gap-4">
            <Link href="#" className="hover:text-white">Facebook</Link>
            <Link href="#" className="hover:text-white">Instagram</Link>
            <Link href="#" className="hover:text-white">LinkedIn</Link>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">University Books</Link></li>
            <li><Link href="#" className="hover:text-white">University Projects</Link></li>
            <li><Link href="#" className="hover:text-white">Assignment Help</Link></li>
            <li><Link href="#" className="hover:text-white">E-Books</Link></li>
            <li><Link href="#" className="hover:text-white">Book Donation</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">Academic</Link></li>
            <li><Link href="#" className="hover:text-white">Fiction</Link></li>
            <li><Link href="#" className="hover:text-white">Islamic</Link></li>
            <li><Link href="#" className="hover:text-white">Children's Books</Link></li>
            <li><Link href="#" className="hover:text-white">Writer</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white">Welcome to Nearbook</Link></li>
            <li><Link href="#" className="hover:text-white">Track Your Order</Link></li>
            <li><Link href="#" className="hover:text-white">Entrepreneur Program</Link></li>
            <li><Link href="#" className="hover:text-white">Download App</Link></li>
            <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Nearbook. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
