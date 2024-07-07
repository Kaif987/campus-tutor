import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/globals.css";
import SideNavBar from "./components/SideNavBar";
import { AuthProvider } from "@/app/Providers";
import PathNameNav from "@/PathnameCheck/PathnameSidenav";

export default function UserLayout({ children, params }) {
  return (
    <html lang="en">
      <body>
        <div className="flex w-screen h-screen flex-row">
          <AuthProvider>
            <PathNameNav />
            <AntdRegistry>
              <div className="flex justify-center items-center w-full ">
                {children}
              </div>
            </AntdRegistry>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
