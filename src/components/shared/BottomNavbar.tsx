import { CategoryApiResponse } from "@/types/category";
import { apiFetch } from "@/lib/api";
import BottomNavbarClient from "./BottomNavbarClient";

const BottomNavbar = async () => {
  const res: CategoryApiResponse = await apiFetch("/categoris");
  const categories = res.success ? res.data : [];

  return <BottomNavbarClient categories={categories} />;
};

export default BottomNavbar;
