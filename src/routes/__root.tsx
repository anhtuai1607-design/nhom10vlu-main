import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import Navigation from "@/components/Navigation";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-muted-foreground">Trang không tồn tại.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nước là Sự sống" },
      { name: "description", content: "Dự án Môi trường và Con người — Đại học Văn Lang" },
      { name: "author", content: "Ngô Anh Tuấn & Team — VLU" },
      { property: "og:title", content: "Nước là Sự sống" },
      { name: "twitter:title", content: "Nước là Sự sống" },
      { property: "og:description", content: "Dự án Môi trường và Con người — Đại học Văn Lang" },
      { name: "twitter:description", content: "Dự án Môi trường và Con người — Đại học Văn Lang" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8fa724e3-1ef1-466b-adf4-6bbe51aa2390/id-preview-e878c1fa--bb268d64-b687-4437-865c-0bd66270b1e5.lovable.app-1776751558815.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8fa724e3-1ef1-466b-adf4-6bbe51aa2390/id-preview-e878c1fa--bb268d64-b687-4437-865c-0bd66270b1e5.lovable.app-1776751558815.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
