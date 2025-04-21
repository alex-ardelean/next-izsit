export async function fetchAccountDetails(): Promise<string> {
  try {
    const token =
      localStorage.getItem("inplayer_access_token") ||
      sessionStorage.getItem("inplayer_access_token");

    if (!token) {
      console.error("Token not found. User might not be logged in.");
      throw new Error("User is not logged in.");
    }

    const response = await fetch("https://services.inplayer.com/accounts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching account details: ${response.statusText}`);
    }

    const accountDetails = await response.json();
    console.log("Account Details:", accountDetails);

    return accountDetails.id;
  } catch (error) {
    console.error("Error fetching account details:", error);
    throw error;
  }
}
