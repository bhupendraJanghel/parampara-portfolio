/**
 * Global constants for Parampara Events Portfolio.
 * Keeps all brand names, founding dates, regions, links, and contact information consolidated.
 */

// Brand founding year
export const FOUNDING_YEAR = 2020;

/**
 * Calculates years of experience dynamically based on founding year
 */
export const getYearsOfExperience = (startYear = FOUNDING_YEAR): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};

// Brand Names
export const BRAND_NAME = "Parampara Events";
export const BRAND_NAME_DECOR_SHOP = "Parampara Decor Shop";
export const BRAND_NAME_FULL = "Parampara Decor & Events";

// Primary Location
export const OPERATIONAL_REGION = "Chhattisgarh";

// Social URLs & Usernames
export const SOCIALS = {
  instagramEvents: "https://instagram.com/theparamparaevents",
  instagramEventsUsername: "@theparamparaevents",
  instagramDecor: "https://instagram.com/parampara_decor_shop", // customize if needed
  instagramDecorUsername: "@parampara_decor_shop", // customize if needed
  facebook: "https://www.facebook.com/profile.php?id=61566655755699",
  googleMaps: "https://www.google.com/maps/place/Parampara+Decor+%26+Events/@21.2194689,81.3424908,816m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a2923982dd74161:0x8d4a7c3c65118734!8m2!3d21.2194689!4d81.3450657!16s%2Fg%2F11y6zv3g7j?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
  whatsappEvents: "https://wa.me/7879836379",
  whatsappDecor: "https://wa.me/6260690912", // default placeholder or same
};

// Contact Details
export const CONTACT_INFO = {
  events: {
    name: "Rumesh Janghel (Events)",
    phone: "+91-7879836379",
    email: "paramparadecorevents@gmail.com",
  },
  decor: {
    name: "Nitesh Janghel (Decor Shop)",
    phone: "+91-6260690912", // placeholder or edit as needed
    email: "paramparadecor@gmail.com",
  }
};
