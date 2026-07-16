import type { NextConfig } from "next";

// STATIC_EXPORT=1 — статическая сборка для GitHub Pages:
// без серверных роутов (/api/contact отключается), картинки без оптимизатора,
// basePath = имя репозитория.
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic && {
    output: "export" as const,
    basePath: "/nikita-site",
    images: { unoptimized: true },
    env: { NEXT_PUBLIC_NO_API: "1" },
  }),
};

export default nextConfig;
