"use client";

import { Hydrate as HydrationBoundary } from "react-query";
import React from "react";

export default function Hydrate(props: any) {
  return <HydrationBoundary {...props} />;
}
