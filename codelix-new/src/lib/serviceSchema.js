import { FOOTER_ALL_SERVICES } from "../MyComponents/HomepageV2/footerData";
import { seoData } from "./seoData";

/* Name and description for a service page's Service markup. The name comes
   from the footer's service list, which already labels all 26 service routes,
   so every page is named by one list rather than by whatever each component
   happens to call itself. The description is the page's own meta
   description: from seoData for the eight main services, passed in by the
   page for the eighteen data-driven ones. Imported only by service pages, so
   it stays out of the entry chunk. */
export function serviceInfo(path, description) {
  return {
    name: FOOTER_ALL_SERVICES.find((s) => s.path === path)?.label,
    description: description ?? seoData[path]?.description,
  };
}
