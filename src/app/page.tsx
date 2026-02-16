import BannerPage from "@/components/Modules/Home/Banner/Banner";
import Products from "@/components/Modules/Home/Products/Products";
import Image from "next/image";

export default function Home() {
  return (
    <div className="  bg-gray-50 items-center justify-center font-sans dark:bg-black">
      < BannerPage />
      <div className="container max-w-6xl mx-auto ">
        <Products categoryId={1} title="University Books" />
        <Products categoryId={9} title="University Projects" />
        <Products categoryId={5} title="Islamic Books" />  
      </div>
    </div>

  );
}
