"use client";

import DefaultIndustryTemplate from "./DefaultIndustryTemplate";
import CustomHealthcareIndustryTemplate from "./CustomHealthcareIndustryTemplate";

export default function IndustryTemplateRenderer({ industry }: { industry: any }) {
  if (!industry) return null;

  switch (industry.template) {
    case "healthcare-custom":
      return <CustomHealthcareIndustryTemplate industry={industry} />;
    case "default":
    default:
      return <DefaultIndustryTemplate industry={industry} />;
  }
}
