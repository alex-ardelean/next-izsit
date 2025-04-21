// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// const withAuth = (WrappedComponent: React.FC) => {
//   return function ProtectedRoute(props) {
//     const router = useRouter();

//     useEffect(() => {
//       const token = localStorage.getItem("inplayer_access_token");

//       if (!token) {
//         // Redirect to the login page if not authenticated
//         router.push("/creator-login");
//       }
//     }, [router]);

//     // Render the protected component if authenticated
//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.FC) => {
  return function ProtectedRoute(props) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const validateUser = async () => {
        try {
          const token =
            localStorage.getItem("inplayer_access_token") ||
            sessionStorage.getItem("inplayer_access_token");

          if (!token) {
            throw new Error("No token found");
          }

          // Step 1: Validate token and fetch user details
          const accountResponse = await fetch(
            "https://services.inplayer.com/accounts",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!accountResponse.ok) {
            throw new Error("Invalid or expired token");
          }

          const accountData = await accountResponse.json();

          // Step 2: Check if the user has the correct role
          const accountRole = accountData.metadata?.account_role;
          if (accountRole !== "creator") {
            throw new Error("Unauthorized access");
          }

          setIsAuthenticated(true); // User is valid
        } catch (error) {
          console.error("Authentication failed:", error);
          router.push("/creator-login"); // Redirect to login
        }
      };

      validateUser();
    }, [router]);

    // Render only if authenticated
    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
