"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuthForAdmin = (WrappedComponent: React.FC) => {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      const adminToken = localStorage.getItem("admin_access_token");

      if (!adminToken) {
        // Redirect to the admin login page if not authenticated
        router.push("/admin-area/login");
      }
    }, [router]);

    // Render the protected component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuthForAdmin;
