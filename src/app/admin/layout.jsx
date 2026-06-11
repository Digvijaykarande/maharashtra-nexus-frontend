import AdminPageLayout from "@/components/admin/AdminPageLayout";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Admin — MH Nexus",
};

export default function AdminLayout({ children }) {
  return (
    <>
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
    }}
  />

  <AdminPageLayout>
    {children}
  </AdminPageLayout>
</>
  )
}