import { Banner, BannerApiResponse } from "@/types/banner";
import { apiFetch } from "@/lib/api";
import BannerCarousel from "./BannerCarousel";

const BannerPage = async () => {
  const res: BannerApiResponse = await apiFetch("/banner");

  const banners: Banner[] = res.success ? res.data : [];
    console.log(banners);
  

  return <BannerCarousel banners={banners} />;
};

export default BannerPage;
