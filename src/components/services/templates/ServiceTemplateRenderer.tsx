"use client";

import DefaultServiceTemplate, { ServiceData } from "./DefaultServiceTemplate";
import CustomAiServiceTemplate from "./CustomAiServiceTemplate";
import CustomHealthcareServiceTemplate from "./CustomHealthcareServiceTemplate";

export default function ServiceTemplateRenderer({ service }: { service: ServiceData }) {
  switch (service.template) {
    case "ai-custom":
      return <CustomAiServiceTemplate service={service} />;
    case "healthcare-custom":
      return <CustomHealthcareServiceTemplate service={service} />;
    default:
      return <DefaultServiceTemplate service={service} />;
  }
}
