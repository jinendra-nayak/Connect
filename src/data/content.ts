import type { DeviceVariant } from "@/components/shared/device-art";

/** Interest options shared by the product cards and the enquiry form. */
export const interests = [
  "Smart Glass Touch Panels",
  "Smart Switch Panels",
  "Smart Sensors",
  "Smart Door Locks",
  "Smart Lighting Automation",
  "Smart Curtain Automation",
  "Intelligent Home Control",
  "Full-home automation",
  "Not sure yet",
] as const;

export const experiences = [
  { id: "light", title: "One-touch lighting", text: "Set the mood in a room, or the whole home, from a single touch.", image: "/images/living-2.jpg" },
  { id: "climate", title: "Intelligent climate", text: "Manage comfort and appliances from one calm, consistent interface.", image: "/images/interior-6.jpg" },
  { id: "access", title: "Smart access & security", text: "Know who comes and goes, and keep entry points under your control.", image: "/images/living-4.jpg" },
  { id: "curtain", title: "Automated curtains", text: "Let daylight in or shut the evening out without leaving your seat.", image: "/images/curtain-14.jpg" },
  { id: "connected", title: "Connected spaces", text: "Every room speaks the same language, so your home feels like one system.", image: "/images/living-3.jpg" },
] as const;

export const products: {
  id: string;
  title: string;
  description: string;
  interest: string;
  variant: DeviceVariant;
  image: string;
  /** Optional real product photo. When set it replaces the illustration. */
  photo?: string;
  span: string;
}[] = [
  { id: "panels", title: "Smart Glass Panels", description: "Touch-sensitive glass that puts lighting, scenes and curtains under one fingertip.", interest: "Smart Glass Touch Panels", variant: "panel", image: "/images/living-1.jpg", span: "md:col-span-4 md:row-span-2" },
  { id: "sensors", title: "Smart Sensors", description: "Quiet sensors that notice motion, doors, temperature and humidity, so your home can respond.", interest: "Smart Sensors", variant: "sensor", image: "/images/lamp-13.jpg", span: "md:col-span-2" },
  { id: "locks", title: "Smart Door Locks", description: "Secure, convenient entry designed to sit beautifully on your door.", interest: "Smart Door Locks", variant: "lock", image: "/images/hall-16.jpg", span: "md:col-span-2" },
  { id: "control", title: "Smart Home Control", description: "One intelligent layer that connects every product into a single, effortless experience.", interest: "Intelligent Home Control", variant: "hub", image: "/images/bedroom-7.jpg", span: "md:col-span-6" },
];

export const panelFeatures = [
  { title: "Elegant touch interface", text: "A seamless glass surface that feels as refined as the room it lives in.", active: 4 },
  { title: "Lighting control", text: "Switch and set the lights in your space with a single touch.", active: 0 },
  { title: "Scene control", text: "Bring several actions together so a room changes the way you want, instantly.", active: 1 },
  { title: "Curtain automation", text: "Open or close curtains from the same panel you use for light.", active: 2 },
  { title: "Fan & appliance control", text: "Everyday appliances, handled without reaching for a separate switch.", active: 3 },
] as const;

export const sensors = [
  { key: "motion", title: "Motion sensors", text: "Notice when a room is in use, so lights can follow you and rest when you leave.", example: "Walk into the hallway at night → soft light comes on." },
  { key: "door", title: "Door & window sensors", text: "Know when openings change, at home or away.", example: "Front door opens → the entry scene starts." },
  { key: "temp", title: "Temperature sensors", text: "Keep an eye on how a room feels.", example: "A room gets warm → the fan can switch on." },
  { key: "humidity", title: "Humidity sensors", text: "Understand the air in bathrooms, bedrooms and living areas.", example: "Humidity rises → ventilation can respond." },
  { key: "security", title: "Security sensors", text: "Add an extra layer of awareness around the home.", example: "Something unexpected → you are alerted." },
] as const;

export const security = [
  { title: "Secure entry", text: "Entry that is designed around keeping your home protected." },
  { title: "Convenient access", text: "Come and go without fumbling for keys." },
  { title: "Intelligent locking", text: "Locking that fits naturally into the way your home behaves." },
  { title: "Connected home security", text: "Locks that work alongside your sensors and panels, not apart from them." },
] as const;

export const nodes = [
  { id: "panel", label: "Smart panels", text: "Touch control for light, scenes and curtains.", x: 50, y: 12 },
  { id: "lighting", label: "Lighting", text: "Scenes and one-touch control across rooms.", x: 86, y: 34 },
  { id: "sensors", label: "Sensors", text: "Motion, doors, temperature and humidity inform the home.", x: 86, y: 72 },
  { id: "locks", label: "Door locks", text: "Entry that knows about the rest of your home.", x: 50, y: 90 },
  { id: "curtains", label: "Curtains", text: "Open or close with a touch or as part of a scene.", x: 14, y: 72 },
  { id: "control", label: "Home control", text: "The intelligent layer that ties it all together.", x: 14, y: 34 },
] as const;

/** Illustrative scenes: which nodes participate. Not a statement of product specs. */
export const scenes = [
  { id: "arrive", label: "Arriving home", on: ["locks", "lighting", "panel"] },
  { id: "evening", label: "Evening", on: ["curtains", "lighting", "control"] },
  { id: "night", label: "Good night", on: ["locks", "sensors", "lighting", "curtains"] },
  { id: "all", label: "Everything", on: ["panel", "lighting", "sensors", "locks", "curtains", "control"] },
] as const;

export const why = [
  { title: "Modern technology", text: "Built for the way homes work today." },
  { title: "Elegant product design", text: "Devices that belong on a beautiful wall, not hidden away." },
  { title: "Intelligent automation", text: "Routines that take care of the everyday." },
  { title: "Seamless user experience", text: "One consistent, intuitive way to control your home." },
  { title: "Professional installation", text: "Planned and fitted with care, so it simply works." },
  { title: "Smart living solutions", text: "From a single room to a whole home." },
] as const;
