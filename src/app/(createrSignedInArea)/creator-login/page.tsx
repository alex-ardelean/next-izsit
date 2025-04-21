"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AgreementModal from "../../../components/(CreatorsComponents)/creative-agreement-modal/AgreementModal";
import MainLayout from "../../layouts/MainLayout";

const CreatorSignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    full_name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/creator-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to authenticate.");
      }

      const data = await response.json();
      const { access_token } = data;

      // Store token in local storage/session
      localStorage.setItem("inplayer_access_token", access_token);

      // Fetch account details to get user's name, email, and agreement status
      const accountResponse = await fetch(
        "https://services.inplayer.com/accounts",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );

      if (!accountResponse.ok) {
        throw new Error("Failed to fetch account details.");
      }

      const accountData = await accountResponse.json();
      // console.log("Account Data:", accountData);

      const userName = accountData.full_name || "User";
      const userEmail = accountData.email;
      const agreementSigned = accountData.metadata?.agreement_signed === "true";

      if (!agreementSigned) {
        // Show Agreement Modal if not signed

        setUserData({ full_name: userName, email: userEmail });
      } else {
        // Redirect directly to dashboard if agreement is already signed
        router.push("/creator-dashboard");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleAgreementAccepted = () => {
    // Proceed to the creator dashboard after the agreement
    router.push("/creator-dashboard");
  };
  return (
    <MainLayout>
      <div className="relative isolate min-h-screen bg-gray-900">
        <div className="absolute inset-0 z-0 overflow-hidden"></div>
        <div className="relative z-10 flex items-start justify-center min-h-screen pt-40">
          <div className="max-w-md w-full bg-gray-700 shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-white mb-4">
              Creator Portal Login
            </h1>
            {error && <div className="text-red-400 mb-4">{error}</div>}
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-700 bg-gray-900 text-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-700 bg-gray-900 text-gray-300 rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-xl bg-gradient-to-r from-emerald-400 to-emerald-600 text-gray-900 font-bold py-2 px-4 rounded-lg hover:opacity-90 transition flex items-center justify-center"
                disabled={loading}
              >
                <span
                  className="relative flex items-center justify-center"
                  style={{ height: "1.5em", width: "6em" }} // Explicit height and width for consistency
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-6 w-6 text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Sign In"
                  )}
                </span>
              </button>
              {/* <p className="mt-4 text-sm text-gray-500">
            Forgot your password?{" "}
            <a
              href="/forgot-password"
              className="text-emerald-500 hover:underline"
                >
              Reset it here
            </a>
          </p> */}
            </form>
          </div>
        </div>

        {userData && (
          <AgreementModal
            userData={userData}
            onAgree={handleAgreementAccepted}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default CreatorSignInPage;
