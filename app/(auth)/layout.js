import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@/globals.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
