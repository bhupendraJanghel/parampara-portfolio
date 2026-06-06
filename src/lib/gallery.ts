import fs from "fs";
import path from "path";

export interface GalleryItem {
  src: string;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  type: "album" | "video";
  count?: number;
  duration?: string;
  videoSrc?: string;
  showArrow: boolean;
  span: string;
}

const CATEGORY_MAP: { [key: string]: string } = {
  wedding: "weddings",
  sangeet: "sangeet",
  reception: "reception",
  mehendi: "haldi",
  haldi: "haldi",
  Birthday: "birthdays",
  Other: "corporate",
  gallery: "weddings",
  uploads: "weddings",
  "gallery-uploads": "weddings",
};

const PRESET_ITEMS: Omit<GalleryItem, "description">[] = [
  {
    src: "/wedding/wedding_1.png",
    category: "weddings",
    title: "The Sharma Wedding",
    location: "Raipur, Chhattisgarh",
    date: "May 2024",
    type: "album",
    count: 36,
    showArrow: true,
    span: "col-span-12 md:col-span-4",
  },
  {
    src: "/haldi/haldi_1.png",
    category: "haldi",
    title: "Haldi Highlights",
    location: "Raipur, Chhattisgarh",
    date: "May 2024",
    type: "video",
    duration: "02:15",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-putting-on-a-wedding-ring-44165-large.mp4",
    showArrow: false,
    span: "col-span-12 md:col-span-4",
  },
  {
    src: "/Birthday/birthday_1.png",
    category: "birthdays",
    title: "Aarohi's Birthday",
    location: "Raipur, Chhattisgarh",
    date: "Apr 2024",
    type: "album",
    count: 28,
    showArrow: true,
    span: "col-span-12 md:col-span-4",
  },
  {
    src: "/reception/reception_1.png",
    category: "reception",
    title: "Reception Highlights",
    location: "Raipur, Chhattisgarh",
    date: "Mar 2024",
    type: "video",
    duration: "01:30",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-champagne-glasses-toast-at-a-celebration-40013-large.mp4",
    showArrow: false,
    span: "col-span-12 md:col-span-3",
  },
  {
    src: "/wedding/wedding_2.png",
    category: "weddings",
    title: "The Mehta Wedding",
    location: "Raipur, Chhattisgarh",
    date: "Mar 2024",
    type: "album",
    count: 42,
    showArrow: true,
    span: "col-span-12 md:col-span-6",
  },
  {
    src: "/haldi/haldi_2.png",
    category: "haldi",
    title: "Haldi Ceremony",
    location: "Bhilai, Chhattisgarh",
    date: "Feb 2024",
    type: "album",
    count: 24,
    showArrow: false,
    span: "col-span-12 md:col-span-3",
  },
  {
    src: "/Other/corporate_1.png",
    category: "corporate",
    title: "Corporate Event",
    location: "Raipur, Chhattisgarh",
    date: "Jan 2024",
    type: "album",
    count: 18,
    showArrow: false,
    span: "col-span-12 md:col-span-3",
  },
  {
    src: "/gallery/wedding_stage.png",
    category: "weddings",
    title: "The Verma Wedding",
    location: "Raipur, Chhattisgarh",
    date: "Dec 2023",
    type: "album",
    count: 35,
    showArrow: true,
    span: "col-span-12 md:col-span-6",
  },
  {
    src: "/gallery/sangeet_energy.png",
    category: "sangeet",
    title: "Sangeet Night",
    location: "Raipur, Chhattisgarh",
    date: "Dec 2023",
    type: "video",
    duration: "02:45",
    videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-under-arch-44161-large.mp4",
    showArrow: false,
    span: "col-span-12 md:col-span-3",
  },
];

function formatTitle(filename: string): string {
  // Remove extension
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
  // Replace underscores and hyphens with spaces
  let name = nameWithoutExt.replace(/[_-]/g, ' ');
  // Replace numbers in parentheses like "haldi (1)" -> "haldi 1"
  name = name.replace(/\((\d+)\)/g, '$1');
  // Capitalize words
  name = name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  // Clean up names that are just numbers
  if (/^\d+$/.test(name.trim())) {
    return `Event Showcase ${name}`;
  }
  return name.trim();
}

function getDescription(category: string, title: string): string {
  switch (category) {
    case "weddings":
      return `A beautiful ${title.toLowerCase()} crafted by Parampara Events, featuring bespoke floral structures and premium design elements.`;
    case "sangeet":
      return `Stunning lighting and ambience design for the ${title.toLowerCase()}, creating an unforgettable celebratory atmosphere.`;
    case "reception":
      return `Elegant stage setups and banquet decor for the ${title.toLowerCase()}, curated to make a lasting impression.`;
    case "haldi":
      return `Vibrant, colorful traditional setup for the ${title.toLowerCase()}, showcasing custom drapes and fresh floral styling.`;
    case "birthdays":
      return `Bespoke styling and themed decorations for the ${title.toLowerCase()}, tailored for a memorable milestone.`;
    case "corporate":
      return `A professional and curated design for the ${title.toLowerCase()}, ensuring a premium experience for all guests.`;
    default:
      return `Custom event styling and premium decor presentation by Parampara Events.`;
  }
}

function getCategoryFromFilename(filename: string, defaultCategory: string): string {
  const name = filename.toLowerCase();
  if (name.includes("wedding") || name.includes("mandap") || name.includes("stage") || name.includes("setup")) {
    return "weddings";
  }
  if (name.includes("sangeet") || name.includes("snageet")) {
    return "sangeet";
  }
  if (name.includes("reception")) {
    return "reception";
  }
  if (name.includes("mehendi") || name.includes("mehndi") || name.includes("haldi")) {
    return "haldi";
  }
  if (name.includes("birthday") || name.includes("bday") || name.includes("kids")) {
    return "birthdays";
  }
  if (
    name.includes("corporate") || 
    name.includes("office") || 
    name.includes("social") || 
    name.includes("cradle") || 
    name.includes("religious") || 
    name.includes("pooja") || 
    name.includes("baby") ||
    name.includes("occasion") ||
    name.includes("function")
  ) {
    return "corporate";
  }
  return defaultCategory;
}

export function getGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];
  const publicDir = path.join(process.cwd(), "public");

  // Define the preset items mapped by relative source path
  const presetMap = new Map<string, Omit<GalleryItem, "description">>();
  PRESET_ITEMS.forEach(p => {
    presetMap.set(p.src, p);
  });

  const folders = Object.keys(CATEGORY_MAP);

  folders.forEach((folder) => {
    const dirPath = path.join(publicDir, folder);
    
    // Check if directory exists
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      try {
        const files = fs.readdirSync(dirPath);
        
        files.forEach((file) => {
          const ext = path.extname(file).toLowerCase();
          const isImage = [".png", ".jpg", ".jpeg", ".webp", ".jfif"].includes(ext);
          const isVideo = [".mp4", ".mov", ".webm", ".ogg"].includes(ext);

          if (isImage || isVideo) {
            const src = `/${folder}/${file}`;
            
            // Check if there is preset metadata for this path
            const preset = presetMap.get(src);
            if (preset) {
              items.push({
                src,
                category: preset.category,
                title: preset.title,
                description: getDescription(preset.category, preset.title),
                location: preset.location,
                date: preset.date,
                type: preset.type,
                count: preset.count,
                duration: preset.duration,
                videoSrc: preset.videoSrc,
                showArrow: preset.showArrow,
                span: preset.span,
              });
            } else {
              // Dynamic item fallback
              const defaultCategory = CATEGORY_MAP[folder];
              const category = ["gallery", "Other", "uploads", "gallery-uploads"].includes(folder)
                ? getCategoryFromFilename(file, defaultCategory)
                : defaultCategory;

              const title = formatTitle(file);
              const description = getDescription(category, title);

              items.push({
                src,
                category,
                title,
                description,
                location: "Raipur, Chhattisgarh",
                date: "Recent",
                type: isVideo ? "video" : "album",
                count: isVideo ? undefined : 12,
                duration: isVideo ? "01:00" : undefined,
                videoSrc: isVideo ? src : undefined,
                showArrow: false,
                span: "col-span-12 md:col-span-4",
              });
            }
          }
        });
      } catch (err) {
        console.error(`Error reading directory ${dirPath}:`, err);
      }
    }
  });

  // Fallback to static list if no items found in public directory
  if (items.length === 0) {
    return PRESET_ITEMS.map(p => ({
      ...p,
      description: getDescription(p.category, p.title),
    }));
  }

  // To preserve the order of the screenshot items first, sort items:
  // Preset items first (ordered by their appearance in PRESET_ITEMS), then dynamic items at the bottom.
  const presetOrderMap = new Map<string, number>();
  PRESET_ITEMS.forEach((p, idx) => presetOrderMap.set(p.src, idx));

  return items.sort((a, b) => {
    const orderA = presetOrderMap.has(a.src) ? presetOrderMap.get(a.src)! : 1000;
    const orderB = presetOrderMap.has(b.src) ? presetOrderMap.get(b.src)! : 1000;
    
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.title.localeCompare(b.title);
  });
}
