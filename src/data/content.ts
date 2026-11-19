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
  "Voice Assistant Integration",
  "Not sure yet",
] as const;

export const experiences = [
  { id: "light", title: "One-touch lighting", text: "Set the mood in a room, or the whole home, from a single touch.", image: "/images/luxury/amber-lounge.jpg" },
  { id: "climate", title: "Intelligent climate", text: "Manage comfort and appliances from one calm, consistent interface.", image: "/images/interior-6.jpg" },
  { id: "access", title: "Smart access & security", text: "Know who comes and goes, and keep entry points under your control.", image: "/images/living-4.jpg" },
  { id: "curtain", title: "Automated curtains", text: "Let daylight in or shut the evening out without leaving your seat.", image: "/images/luxury/skyline-residence.jpg" },
  { id: "connected", title: "Connected spaces", text: "Every room speaks the same language, so your home feels like one system.", image: "/images/luxury/night-dining.jpg" },
] as const;

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

/**
 * Voice assistant integrations.
 * `verified` MUST stay false until ConnectCom's product specifications or integration
 * documentation confirm support. While false, the UI shows "Compatibility to be confirmed".
 */
export const voiceAssistants = [
  {
    id: "alexa",
    brand: "Amazon Alexa",
    title: "Works with Amazon Alexa",
    text: "Control compatible smart-home devices using simple voice commands.",
    example: "Alexa, turn on the living room lights.",
    verified: false,
  },
  {
    id: "google",
    brand: "Google Assistant",
    title: "Works with Google Assistant",
    text: "Make everyday home control easier through compatible Google Assistant devices.",
    example: "Hey Google, turn off the bedroom lights.",
    verified: false,
  },
  {
    id: "homekit",
    brand: "Apple Siri / HomeKit",
    title: "Apple Siri / HomeKit",
    text: "Shown as an additional ecosystem only once ConnectCom products have verified support.",
    example: null,
    verified: false,
  },
] as const;

/** Illustrative voice scenes. Not a live integration. */
export const voiceDemos = [
  {
    id: "night",
    label: "Good night",
    phrase: "Alexa, good night.",
    image: "/images/bedroom-7.jpg",
    steps: ["Bedroom lights dim", "Curtains close", "Compatible devices enter the configured night scene"],
  },
  {
    id: "living",
    label: "Living room",
    phrase: "Hey Google, turn on living room lights.",
    image: "/images/luxury/amber-lounge.jpg",
    steps: ["Living room lighting activates", "The connected smart-home environment responds"],
  },
] as const;

export const controlMethods = [
  { id: "touch", title: "Touch Control", subtitle: "Smart Glass Panels", text: "Lights, scenes and curtains from a single glass surface on the wall.", anchor: "#panel" },
  { id: "voice", title: "Voice Control", subtitle: "Compatible Voice Assistants", text: "Speak naturally, where a compatible assistant is set up.", anchor: "#voice" },
  { id: "mobile", title: "Mobile Control", subtitle: "Smartphone Applications", text: "Your home in your pocket, at home or away.", anchor: "#consultation" },
  { id: "auto", title: "Intelligent Automation", subtitle: "Smart Sensors & Configured Scenes", text: "Sensors and scenes that let the home respond on its own.", anchor: "#sensors" },
] as const;

/** Illustrative moments: which control methods take part. Not a statement of product specs. */
export const scenes = [
  { id: "arrive", label: "Arriving home", on: ["touch", "auto"] },
  { id: "evening", label: "Evening", on: ["voice", "auto"] },
  { id: "night", label: "Good night", on: ["voice", "touch", "auto"] },
  { id: "away", label: "Away", on: ["mobile", "auto"] },
  { id: "all", label: "Everything", on: ["touch", "voice", "mobile", "auto"] },
] as const;

export const why = [
  { title: "Modern technology", text: "Built for the way homes work today." },
  { title: "Elegant product design", text: "Devices that belong on a beautiful wall, not hidden away." },
  { title: "Intelligent automation", text: "Routines that take care of the everyday." },
  { title: "Seamless user experience", text: "One consistent, intuitive way to control your home." },
  { title: "Professional installation", text: "Planned and fitted with care, so it simply works." },
  { title: "Smart living solutions", text: "From a single room to a whole home." },
] as const;
