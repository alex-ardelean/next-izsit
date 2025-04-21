"use client";

import { useState } from "react";
import { CustomAlert } from "../../(AlertAndBadges)/CustomAlert";

export default function AgreementModal({
  userData,
  onAgree,
}: {
  userData: { full_name: string; email: string };
  onAgree: () => void;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertProps, setAlertProps] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
  });

  const handleAgree = async () => {
    if (!isChecked) {
      alert("You must agree to the terms before proceeding.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("inplayer_access_token");

      if (!token) {
        throw new Error("Token is missing. Please log in again.");
      }

      const response = await fetch("/api/creator/agreement", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to update agreement.");
      }

      setAlertProps({
        isOpen: true,
        title: "Success",
        message: "Agreement accepted successfully!",
      });
      // Delay the redirection to allow users to see the alert
      setTimeout(() => {
        onAgree();
      }, 2000);
    } catch (error) {
      console.error("Error accepting agreement:", error);
      setAlertProps({
        isOpen: true,
        title: "Error",
        message: "An error occurred while accepting the agreement.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAlert = () => {
    setAlertProps({ isOpen: false, title: "", message: "" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          IZSIT Creative Partner Agreement
        </h2>
        <p className="text-sm mb-4">
          Please read and agree to the terms and conditions of the IZSIT
          Creative Partner Agreement.
        </p>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows={6}
          readOnly
          value={`IZSIT PARTNER CREATOR AGREEMENT

This Partner Creator Agreement ('Agreement') is made and entered into by and between Izsit Inc. and:

Name: ${userData.full_name}
Email: ${userData.email}

1. Content Ownership
1.1 The Creator grants the Platform a non-exclusive, worldwide, royalty-free license to:

1.1.1 Display, distribute, and promote the content on the Platform;

1.1.2 Modify the content solely for promotional purposes (e.g., creating thumbnails or
trailers);

1.1.3 Monetize the content through ads, subscriptions, or other revenue models.

1.2 The Creator retains full ownership of all works uploaded to the Platform.

1.3 The Creator is free to distribute their content on other platforms without restriction.

1.4 The Platform reserves the right to utilize the Creator's content for promotional purposes.

1.5 Upon the Creator’s written request for removal of their content from the Platform:

1.5.1 The Platform shall cease all future use of the content in promotional materials within 7
days.

1.5.2 The Platform is not obligated to remove or alter any promotional materials that were
created prior to such a request.

1.5.3 In the event that the Creator's content has received an Izsit Award, the Platform retains
the right to continue using the content in connection with said award for promotional purposes
for a maximum period of 3 years following the award date, without any additional
compensation to the Creator.

1.5.4 The Platform will retain content only as necessary to comply with legal and regulatory
obligations.

1.5.5 The Platform will settle any outstanding revenue shares during the following payment
cycle.

1.6 The Creator warrants that they own, or have obtained all necessary rights, copyrights, trademarks,
permissions, and licenses to upload and distribute the content on the Platform. Proof must be provided
upon request by the Platform.

1.6.1 Creator's Responsibility: The Creator acknowledges and agrees that they are solely
responsible for ensuring that all content uploaded, including but not limited to music, images,
and videos, does not infringe upon any copyrights, trademarks, or other intellectual property
rights owned by third parties.

1.6.2 Izsit's Non-Responsibility: Izsit shall not be held liable, responsible, or accountable for
any infringement, violation, or misappropriation of any intellectual property rights, including
but not limited to copyrights, trademarks, patents, or any other form of intellectual property,
arising from the content provided by the Creator.

1.6.3 Indemnification by Creator: The Creator agrees to indemnify and hold harmless Izsit, its
officers, directors, employees, agents, and affiliates from and against any and all claims,
liabilities, damages, losses, or expenses (including legal fees and costs) arising out of or in
connection with any intellectual property infringement claim related to the Creator's content.

1.6.4 Content Removal: If any content is found to infringe upon the rights of a third party,
Izsit reserves the right to remove such content from the Platform without prior notice to the
Creator. The Creator will be responsible for resolving any disputes with the third party, and
Izsit shall not be involved in such disputes unless legally required.

2. Monetization and Revenue Sharing
2.1 The Platform may monetize Creators' content through various methods, including ads,
subscriptions and other mechanisms introduced to the Platform.

2.2 Revenue generated from content will be distributed as follows:

2.2.1 Without Referral Code:

2.2.1.1 Ad Revenue: Creator will receive 90% of the ad revenue, determined by Izsit's
proprietary algorithm described in 3.3. The Platform retains 10%.

3.2.1.2 Subscription Revenue: Creator will receive 90% of the subscription revenue,
determined by Izsit's proprietary algorithm described in 3.3. The Platform retains
10%.

2.2.1.3 Creators who do not maintain consistent content uploads to the platform may
have their share of ad and subscription revenue reduced down to or equal to 80%
(excluding referral code usage) and will be duly notified of this adjustment.

2.2.1.4 The Platform will offer enhanced promotional opportunities and bonuses to
creators who consistently upload content in accordance with the terms outlined in this
agreement.

2.2.2 With Referral Code

2.2.2.1 Each creator will receive an Izsit Creator Referral Code.

2.2.2.2 Ad Revenue: When a Creator brings an advertiser to the Platform, the Creator
will receive 10%-90% of the revenue generated by that advertiser. The Platform
retains 10% and the remainder gets distributed with other creative partners calculated
using Izsit's proprietary algorithm. This incentive encourages Creators to bring more
advertisers and subscribers to the Platform.

2.2.2.3 Subscription Revenue: When an audience member subscribes using a
Creator's referral code, the Creator will receive 90% of that subscriber’s revenue. The
Platform retains 10%. Subscribers who use referral codes will receive a discount on
the standard subscription price, helping Creators grow their audience and be
incentivised for it more effectively.

2.3 Revenue sharing from ads and subscriptions among creators is determined by Izsit's proprietary
algorithm, designed to ensure an equitable distribution of earnings based on factors such as total
watch time and audience engagement. The algorithm will be periodically updated to maintain fairness
for all creators, while preserving the Platform’s integrity and competitive advantage. The Platform is
committed to offering creators clear and detailed monthly earnings reports.

2.4 Any significant changes to the algorithm that may materially impact revenue distribution will be
communicated to Creators. Creators will also be notified of how the changes might affect their
earnings to maintain a level of transparency and trust.

2.5 Creators experiencing substantial fluctuations in their earnings may contact the Platform for
clarification and guidance regarding the factors contributing to their revenue changes.

2.6 Creators whose content wins a recognized award in the 'Best in Category,' 'Best in Genre,' or
similar distinguished categories, as determined by the Platform, shall be eligible to receive up to
100% of the revenue generated as determined by Izsit's proprietary algorithm for that specific content
for a limited time period from the date of the award. The specific revenue share adjustment and the
duration will be communicated between the Creator and the Platform.

2.7 The Platform will provide Creators with detailed monthly earnings reports and will disburse
payments on a monthly basis.

2.8 Payment methods could be made by bank transfer, check, PayPal, or another form of electronic
payment.

2.9 The Platform is committed to expanding monetization opportunities for Creators (e.g.
Merchandise, crowdfunding, donations). The Platform will notify Creators and provide them with
revenue structures to be outlined at the time of introduction.

3. Content Guidelines
3.1 The Creator agrees to adhere to the Platform's content guidelines, which prohibit:

3.1.1 Copyright, trademarks, permissions, licenses and other rights infringement of content;

3.1.2 Content that is harmful, hateful, or illegal;

3.1.3 Violations of privacy, violence, or explicit adult content.

3.2 The Platform reserves the right to remove any content that violates these guidelines or is deemed
inappropriate for its audience.

3.3 Content can be in any language but English subtitles are preferred as the audience is likely to
understand English.

3.4 The Platform retains full discretion over the content that is accepted or rejected for upload. This
agreement does not obligate the Platform to upload or feature any content submitted by the Creator.

3.5 The Creator is under no obligation to produce, upload, or continue to upload content to the
Platform.

3.6 The Creator may request content removal at any time, and the Platform will comply within 7 days,
settling any outstanding revenue shares.

4. Term and Termination
4.1 This Agreement will remain in effect until terminated by either party.

4.2 The Parties may terminate this Agreement at any time by notifying the other Party with 7 day
written notice.

4.3 The Platform may terminate this Agreement or suspend the Creator’s account for repeated
violations of content guidelines or this Agreement's terms.

4.4 Upon termination, the Platform will cease monetization of the Creator’s content. Any unpaid
earnings will be disbursed in the next payout cycle.
Name: ${userData.full_name}
Email: ${userData.email}

5. Indemnification
5.1 Both the Creator and the Platform agree to indemnify and hold harmless the other party from any
legal claims, damages, or losses arising from the other Party’s breach of this Agreement, including but
not limited to copyright infringement, defamation, or privacy violations.

6. Confidentiality
6.1 Both parties agree to maintain the confidentiality of all proprietary or sensitive information
exchanged during the partnership. This obligation extends beyond the termination of the Agreement.

7. Data Privacy
7.1 The Platform respects the privacy of all Creative Partners. Personal data, such as contact details,
will be collected and used solely for the purpose of administering this Agreement, including
communication, payment, and any legal or regulatory requirements.

7.2 Any data related to the Creator’s work, including drafts, finished projects, or associated metadata,
will be treated confidentially. The Platform will not share or sell this data to third parties without the
explicit consent of the Creator, except as required for platform functionality (e.g., hosting,
distribution, promotional activities as agreed).

7.3 The Platform may use third-party service providers to store, process, and manage data securely.
These providers are subject to strict data protection agreements to ensure the security and
confidentiality of the Creator’s information.

7.4 The Platform will handle all Creator data by relevant data protection laws, including but not
limited to GDPR and CCPA. Personal data will not be shared with third parties without the Creator's
explicit consent.

8. Limitation of Liability
8.1 Neither the Creator nor the Platform shall be held liable for any indirect, incidental, special, or
consequential damages resulting from the actions or omissions of the other party. This includes, but is
not limited to, damages related to loss of revenue, loss of profits, loss of business opportunities, or
damage to reputation, even if such damages were foreseeable or the party had been advised of the
possibility of such damages.

9. Amendments and Changes
9.1 The Platform reserves the right to modify or amend this Agreement at any time, at its sole
discretion. Any changes will be communicated to the Creator via email.

9.2 Material changes will take effect 7 days after notification, allowing the Creator time to review and
determine whether to continue under the revised terms.

9.3 The Creator’s continued use of the Platform after changes take effect constitutes acceptance of the
new terms. The Creator may terminate this Agreement if they do not agree to the revised terms.

10. Voluntary Participation:
10.1 The Creator's participation in the Platform is entirely voluntary, and they may choose the
frequency and amount of content they wish to contribute at their sole discretion.

11. Miscellaneous
11.1 This Agreement constitutes the entire agreement between the Creator and the Platform,
superseding any prior agreements or understandings.

11.2 If any provision of this Agreement is found invalid or unenforceable, the remainder of the
Agreement will remain in effect.

11.3 Any disputes arising under this Agreement will be governed by the laws of the State of Delaware
in the United States of America.

11.4 Any disputes arising under this Agreement will first be attempted to be resolved through binding
arbitration in Delaware, United States of America.

Signed:
Name: GIACOMO BONAVERA (CEO)
`}
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agree"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-sm">
            I agree to the terms and conditions.
          </label>
        </div>
        <button
          onClick={handleAgree}
          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Agree"}
        </button>
      </div>
      <CustomAlert
        title={alertProps.title}
        message={alertProps.message}
        isOpen={alertProps.isOpen}
        onClose={closeAlert}
      />
    </div>
  );
}
