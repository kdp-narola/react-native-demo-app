import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";

export default function CategoriesIndex() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/categories") {
      router.replace("/categories/none");
    }
  }, [pathname]);

  return null;
}
