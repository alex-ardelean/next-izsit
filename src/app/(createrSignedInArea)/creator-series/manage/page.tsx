import React, { Suspense } from "react";
import ManageSeries from "./ManageSeries";
import CreatorLoginLayout from "../../../layouts/CreatorLayout";

export default function ManageSeriesPage() {
  return (
    <CreatorLoginLayout>
      <Suspense fallback={<div>Loading series ...</div>}>
        <ManageSeries />
      </Suspense>
    </CreatorLoginLayout>
  );
}
