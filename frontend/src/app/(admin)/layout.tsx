import "../../globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <div className="min-h-screen bg-white text-gray-900">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}