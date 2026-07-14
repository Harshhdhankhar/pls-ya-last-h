export type FootProblem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  commonSigns: string[];
  supportiveFeatures: string[];
  dailyImpact: string;
  recommendedCategory: string;
  audienceGroups: string[];
  requiresDisclaimer: boolean;
  image: string;
};

export const footProblems: FootProblem[] = [
  // ── Everyday Comfort ──
  {
    slug: "long-standing",
    title: "Long Standing Hours",
    category: "Everyday Comfort",
    description:
      "If you spend most of your day on your feet, you may notice tiredness and pressure in your heels and arches by midday.",
    commonSigns: [
      "Aching heels after prolonged standing",
      "Fatigue in the arch area",
      "Discomfort that improves with rest",
    ],
    supportiveFeatures: [
      "Cushioned insoles designed to reduce impact",
      "Supportive arch construction",
      "Shock-absorbing outsoles",
    ],
    dailyImpact:
      "Long hours on hard surfaces can lead to general foot fatigue. Choosing footwear with enhanced cushioning may help improve comfort throughout the day.",
    recommendedCategory: "Low to Mid silhouettes with plush insoles",
    audienceGroups: ["adults", "men", "women", "40+"],
    requiresDisclaimer: false,
    image: "1600185365483-26d7a4cc7519",
  },
  {
    slug: "long-walking",
    title: "Long Walking Hours",
    category: "Everyday Comfort",
    description:
      "Frequent walking throughout the day can place repeated stress on the feet, especially the heels and forefoot.",
    commonSigns: [
      "Soreness in the balls of the feet",
      "Heel discomfort after long walks",
      "General foot tiredness by evening",
    ],
    supportiveFeatures: [
      "Lightweight construction to reduce fatigue",
      "Responsive cushioning for sustained comfort",
      "Breathable materials for temperature regulation",
    ],
    dailyImpact:
      "Covering several kilometres a day adds up. Footwear with good energy return and a secure fit may help reduce the feeling of tired feet.",
    recommendedCategory: "Runner and Lifestyle silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers"],
    requiresDisclaimer: false,
    image: "1606107557195-0e29a4b5b4aa",
  },
  {
    slug: "office-commute",
    title: "Office and Commute",
    category: "Everyday Comfort",
    description:
      "The transition from commute to desk to home can leave feet feeling fatigued without obvious cause.",
    commonSigns: [
      "Mild swelling after sitting for long periods",
      "Discomfort transitioning from sitting to standing",
      "General foot achiness by end of day",
    ],
    supportiveFeatures: [
      "Flexible soles for natural foot movement",
      "Padded collars for ankle comfort",
      "Easy-on, easy-off design for convenience",
    ],
    dailyImpact:
      "A mix of sitting, standing and walking throughout the day calls for versatile footwear that supports each phase without needing a change.",
    recommendedCategory: "Low and Mid silhouettes",
    audienceGroups: ["adults", "men", "women"],
    requiresDisclaimer: false,
    image: "1595950653106-6c9ebd614d3a",
  },
  {
    slug: "travel-comfort",
    title: "Travel",
    category: "Everyday Comfort",
    description:
      "Long flights, train journeys or road trips can cause foot discomfort and mild swelling due to reduced movement.",
    commonSigns: [
      "Feeling of tightness or swelling after prolonged sitting",
      "Cold feet during travel",
      "Discomfort when standing after long periods seated",
    ],
    supportiveFeatures: [
      "Roomy toe boxes for natural splay",
      "Lightweight materials easy to pack",
      "Slip-on convenience for security checks",
    ],
    dailyImpact:
      "Being seated for extended periods reduces circulation in the lower limbs. Comfortable, unrestrictive footwear can make long journeys more pleasant.",
    recommendedCategory: "Slip-on and lifestyle silhouettes",
    audienceGroups: ["adults", "men", "women", "40+", "elderly"],
    requiresDisclaimer: false,
    image: "1552346154-21d32810aba3",
  },
  {
    slug: "general-fatigue",
    title: "General Foot Fatigue",
    category: "Everyday Comfort",
    description:
      "A general feeling of tiredness in the feet at the end of the day, even without a specific underlying cause.",
    commonSigns: [
      "Diffuse achiness across the entire foot",
      "Feeling the need to sit down and rest feet",
      "Discomfort that resolves overnight",
    ],
    supportiveFeatures: [
      "Plush cushioning throughout the footbed",
      "Supportive yet flexible construction",
      "Premium materials that conform to the foot",
    ],
    dailyImpact:
      "Everyday fatigue can accumulate over a week. Footwear designed for all-day wear may help reduce the cumulative feeling of tiredness.",
    recommendedCategory: "Everyday lifestyle silhouettes",
    audienceGroups: ["adults", "men", "women", "40+", "elderly"],
    requiresDisclaimer: false,
    image: "1560769629-975ec94e6a86",
  },
  {
    slug: "everyday-comfort",
    title: "Everyday Comfort",
    category: "Everyday Comfort",
    description:
      "For those who simply want their footwear to feel good all day, without specific pain or discomfort.",
    commonSigns: [
      "Preference for soft, cushioned footwear",
      "History of trying different brands for comfort",
      "Value placed on feel over style alone",
    ],
    supportiveFeatures: [
      "Premium cushioning systems",
      "Anatomically shaped footbeds",
      "High-quality materials for lasting comfort",
    ],
    dailyImpact:
      "Comfort is not a luxurt is a foundation. Everyday comfort footwear is designed to make each step feel as good as the first.",
    recommendedCategory: "Signature and lifestyle silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers", "40+"],
    requiresDisclaimer: false,
    image: "1542291026-7eec264c27ff",
  },
  // ── Foot Structure & Movement ──
  {
    slug: "flat-feet",
    title: "Flat Feet",
    category: "Foot Structure & Movement",
    description:
      "Low arches can cause tiredness and uneven pressure during long periods of standing or walking.",
    commonSigns: [
      "Discomfort along the inner side of the foot",
      "Feet that tire quickly",
      "Shoes that wear unevenly on the inner edge",
    ],
    supportiveFeatures: [
      "Arch-supportive design",
      "Stable heel counters",
      "Cushioned midsoles for pressure distribution",
    ],
    dailyImpact:
      "The shape of your arch affects how weight is distributed across the foot during movement. Supportive footwear may help improve comfort and reduce fatigue.",
    recommendedCategory: "Structured Mid and High silhouettes",
    audienceGroups: ["adults", "men", "women", "children", "teenagers", "40+", "elderly"],
    requiresDisclaimer: true,
    image: "1606107557195-0e29a4b5b4aa",
  },
  {
    slug: "high-arches",
    title: "High Arches",
    category: "Foot Structure & Movement",
    description:
      "High arches can concentrate pressure on the heel and ball of the foot, leading to discomfort during impact.",
    commonSigns: [
      "Discomfort in the heel or ball of the foot",
      "Feeling off-balance during movement",
      "Shoes that wear quickly on the outer edge",
    ],
    supportiveFeatures: [
      "Extra cushioning in heel and forefoot",
      "Flexible outsoles that adapt to foot shape",
      "Shock-absorbing midsoles",
    ],
    dailyImpact:
      "High arches reduce the foot's natural ability to absorb shock. Well-cushioned footwear may help reduce the impact felt during walking or running.",
    recommendedCategory: "Cushioned Runner and lifestyle silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers", "40+"],
    requiresDisclaimer: true,
    image: "1595950653106-6c9ebd614d3a",
  },
  {
    slug: "bunions",
    title: "Bunions",
    category: "Foot Structure & Movement",
    description:
      "A bony prominence at the base of the big toe can make finding comfortable footwear a challenge.",
    commonSigns: [
      "A visible bump on the side of the big toe",
      "Discomfort or tenderness around the joint",
      "Difficulty fitting into narrow shoes",
    ],
    supportiveFeatures: [
      "Roomy toe boxes to reduce pressure",
      "Soft, flexible upper materials",
      "Adjustable fit systems",
    ],
    dailyImpact:
      "Changes in the shape of the forefoot can make standard footwear feel restrictive. Shoes with a wider toe box and soft uppers may help reduce pressure on sensitive areas.",
    recommendedCategory: "Wide-fit and lifestyle silhouettes",
    audienceGroups: ["adults", "men", "women", "40+", "elderly"],
    requiresDisclaimer: true,
    image: "1542291026-7eec264c27ff",
  },
  {
    slug: "hammer-toe",
    title: "Hammer Toe",
    category: "Foot Structure & Movement",
    description:
      "A bend in one or more toes at the middle joint can lead to rubbing and discomfort inside footwear.",
    commonSigns: [
      "Toes that curl downward instead of lying flat",
      "Corns or calluses on top of the affected toe",
      "Difficulty finding shoes with enough toe room",
    ],
    supportiveFeatures: [
      "Deep, roomy toe boxes",
      "Seamless interiors to reduce friction",
      "Soft, stretchable upper materials",
    ],
    dailyImpact:
      "Changes in toe alignment can make everyday footwear feel restrictive. Shoes with extra vertical space in the toe area and soft linings may help reduce irritation.",
    recommendedCategory: "Wide-fit and soft-toe silhouettes",
    audienceGroups: ["adults", "men", "women", "40+", "elderly"],
    requiresDisclaimer: true,
    image: "1491553895911-0055eca6402d",
  },
  {
    slug: "overpronation",
    title: "Overpronation",
    category: "Foot Structure & Movement",
    description:
      "Overpronation is when the foot rolls inward excessively during movement, which can affect alignment.",
    commonSigns: [
      "Excessive inward roll of the foot when walking",
      "Discomfort in the arch or heel",
      "Shoes that tilt inward when placed on a flat surface",
    ],
    supportiveFeatures: [
      "Stability-focused midsole construction",
      "Supportive arch bridges",
      "Firm heel counters for controlled motion",
    ],
    dailyImpact:
      "Excessive inward movement can place additional stress on the feet and lower joints. Footwear designed with stability features may help support a more natural gait cycle.",
    recommendedCategory: "Structured and stability silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers", "40+"],
    requiresDisclaimer: true,
    image: "1606107557195-0e29a4b5b4aa",
  },
  {
    slug: "supination",
    title: "Supination",
    category: "Foot Structure & Movement",
    description:
      "Supination occurs when the foot rolls outward excessively, placing extra pressure on the outer edge.",
    commonSigns: [
      "Wear concentrated on the outer edge of shoes",
      "Discomfort on the outside of the foot or ankle",
      "Feeling unstable during movement",
    ],
    supportiveFeatures: [
      "Cushioned midsoles to absorb lateral impact",
      "Flexible outsoles that encourage natural motion",
      "Comfortable, secure fit systems",
    ],
    dailyImpact:
      "Outward rolling of the foot can reduce its ability to absorb shock evenly. Cushioned and flexible footwear may help distribute pressure more evenly across the foot.",
    recommendedCategory: "Cushioned and flexible silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers", "40+"],
    requiresDisclaimer: true,
    image: "1525966222134-fcfa99b8ae77",
  },
  {
    slug: "uneven-pressure",
    title: "Uneven Pressure",
    category: "Foot Structure & Movement",
    description:
      "Some people experience pressure that is not evenly distributed across the foot during standing or movement.",
    commonSigns: [
      "Certain areas of the foot feel sore after activity",
      "Calluses or hard skin in specific spots",
      "General discomfort that is hard to pinpoint",
    ],
    supportiveFeatures: [
      "Evenly cushioned footbeds",
      "Supportive midsoles for balanced weight distribution",
      "Premium insoles that conform to foot shape",
    ],
    dailyImpact:
      "Uneven pressure can lead to localised discomfort over time. Footwear with balanced cushioning and supportive construction may help improve overall comfort.",
    recommendedCategory: "Cushioned lifestyle silhouettes",
    audienceGroups: ["adults", "men", "women", "40+", "elderly"],
    requiresDisclaimer: false,
    image: "1552346154-21d32810aba3",
  },
  // ── Recovery & Rehabilitation ──
  {
    slug: "diabetic-foot",
    title: "Diabetic Foot",
    category: "Recovery & Rehabilitation",
    description:
      "Reduced sensation or circulation in the feet calls for extra care in footwear selection to maintain comfort throughout the day.",
    commonSigns: [
      "Reduced sensation or tingling in the feet",
      "Feet that feel cold or numb",
      "Feet that are sensitive to friction or pressure",
    ],
    supportiveFeatures: [
      "Seamless interiors to minimise friction",
      "Soft, non-constricting uppers",
      "Extra depth for custom orthotics",
    ],
    dailyImpact:
      "Footwear that prioritises comfort, fit and protection can make a meaningful difference in how your feet feel each day.",
    recommendedCategory: "Soft, seamless lifestyle silhouettes",
    audienceGroups: ["adults", "40+", "elderly"],
    requiresDisclaimer: true,
    image: "1608231387042-66d1773070a5",
  },
  {
    slug: "arthritis",
    title: "Arthritis",
    category: "Recovery & Rehabilitation",
    description:
      "Joint discomfort and stiffness in the feet can make everyday steps feel effortful.",
    commonSigns: [
      "Stiffness in the foot joints, especially in the morning",
      "Swelling or tenderness in the toes or midfoot",
      "Discomfort that increases with activity",
    ],
    supportiveFeatures: [
      "Cushioned midsoles for shock absorption",
      "Easy-entry designs to reduce bending",
      "Stable outsoles for confident movement",
    ],
    dailyImpact:
      "Joint discomfort can make each step feel effortful. Footwear with generous cushioning and easy entry may help improve daily comfort.",
    recommendedCategory: "Easy-entry, cushioned silhouettes",
    audienceGroups: ["adults", "40+", "elderly"],
    requiresDisclaimer: true,
    image: "1600185365483-26d7a4cc7519",
  },
  {
    slug: "plantar-fasciitis",
    title: "Plantar Fasciitis",
    category: "Recovery & Rehabilitation",
    description:
      "Irritation of the tissue along the bottom of the foot can cause heel discomfort during the first steps of the day.",
    commonSigns: [
      "Noticeable heel discomfort in the morning or after rest",
      "Discomfort that eases after a few minutes of walking",
      "Tenderness along the arch",
    ],
    supportiveFeatures: [
      "Supportive arch construction",
      "Cushioned heel zones for impact reduction",
      "Stable midsoles for controlled movement",
    ],
    dailyImpact:
      "This type of discomfort can make starting the day feel challenging. Footwear designed with arch support and heel cushioning may help improve comfort during daily activities.",
    recommendedCategory: "Supportive lifestyle and walking silhouettes",
    audienceGroups: ["adults", "men", "women", "40+", "elderly"],
    requiresDisclaimer: true,
    image: "1595950653106-6c9ebd614d3a",
  },
  {
    slug: "post-polio-support",
    title: "Post-Polio Support",
    category: "Recovery & Rehabilitation",
    description:
      "Muscle weakness and fatigue in the legs and feet can affect mobility over time.",
    commonSigns: [
      "Muscle weakness or fatigue in the legs",
      "Difficulty walking for extended periods",
      "Reduced stability on uneven surfaces",
    ],
    supportiveFeatures: [
      "Lightweight construction to reduce effort",
      "Stable outsoles for confident footing",
      "Secure fit systems for a locked-in feel",
    ],
    dailyImpact:
      "Changes in muscle strength over time can affect mobility. Lightweight, stable footwear may help support comfortable movement throughout the day.",
    recommendedCategory: "Lightweight, stable silhouettes",
    audienceGroups: ["adults", "40+", "elderly"],
    requiresDisclaimer: true,
    image: "1560769629-975ec94e6a86",
  },
  {
    slug: "post-surgical-recovery",
    title: "Post-Surgical Recovery",
    category: "Recovery & Rehabilitation",
    description:
      "After foot or ankle surgery, finding footwear that is easy to put on and gentle on healing tissue supports a more comfortable recovery.",
    commonSigns: [
      "Swelling in the foot or ankle",
      "Limited range of motion",
      "Sensitivity around the surgical site",
    ],
    supportiveFeatures: [
      "Easy-entry design with minimal bending",
      "Soft, stretchable uppers that accommodate swelling",
      "Lightweight construction for reduced effort",
    ],
    dailyImpact:
      "Recovery periods require footwear that adapts to changing needs. Easy-entry, soft shoes may help make the recovery process more comfortable.",
    recommendedCategory: "Easy-entry recovery silhouettes",
    audienceGroups: ["adults", "men", "women", "40+", "elderly"],
    requiresDisclaimer: true,
    image: "1491553895911-0055eca6402d",
  },
  {
    slug: "rehabilitation-support",
    title: "Rehabilitation Support",
    category: "Recovery & Rehabilitation",
    description:
      "During rehabilitation from a lower-limb injury, footwear that supports stable movement can be beneficial.",
    commonSigns: [
      "Reduced confidence in balance",
      "Concern about re-injury during movement",
      "Need for extra support during recovery exercises",
    ],
    supportiveFeatures: [
      "Stable platform outsoles",
      "Supportive uppers for a secure fit",
      "Cushioned midsoles for gentle impact absorption",
    ],
    dailyImpact:
      "Rehabilitation is a gradual process. Supportive yet comfortable footwear can help maintain mobility and confidence during recovery.",
    recommendedCategory: "Supportive walking silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers", "40+"],
    requiresDisclaimer: true,
    image: "1525966222134-fcfa99b8ae77",
  },
  {
    slug: "varicose-vein-discomfort",
    title: "Varicose Vein-Related Discomfort",
    category: "Recovery & Rehabilitation",
    description:
      "A feeling of heaviness, swelling or achiness in the lower legs and feet can build throughout the day.",
    commonSigns: [
      "Heaviness or achiness in the legs by end of day",
      "Swelling in the feet and ankles",
      "Visible bulging veins",
    ],
    supportiveFeatures: [
      "Lightweight construction to reduce leg fatigue",
      "Comfortable, non-constricting fit",
      "Cushioned footbeds for all-day comfort",
    ],
    dailyImpact:
      "Discomfort related to circulation can build throughout the day. Lightweight, comfortable footwear may help improve how your legs feel by evening.",
    recommendedCategory: "Lightweight lifestyle silhouettes",
    audienceGroups: ["adults", "40+", "elderly"],
    requiresDisclaimer: true,
    image: "1542291026-7eec264c27ff",
  },
  {
    slug: "acl-recovery",
    title: "ACL Recovery Support",
    category: "Recovery & Rehabilitation",
    description:
      "Recovering from an ACL injury requires footwear that provides stability and confidence during daily movement.",
    commonSigns: [
      "Reduced stability when walking",
      "Concern about twisting or re-injury",
      "Need for reliable traction on various surfaces",
    ],
    supportiveFeatures: [
      "Stable, wide platform outsoles",
      "Secure lacing systems for a locked-in fit",
      "Cushioned midsoles for gentle impact management",
    ],
    dailyImpact:
      "ACL recovery involves rebuilding strength and confidence. Stable, supportive footwear can help you move with greater assurance during the rehabilitation phase.",
    recommendedCategory: "Stable walking and training silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers"],
    requiresDisclaimer: true,
    image: "1606107557195-0e29a4b5b4aa",
  },
  // ── Sports and Active Use ──
  {
    slug: "walking",
    title: "Walking",
    category: "Sports and Active Use",
    description:
      "Whether for fitness or leisure, walking places repeated impact on the feet that requires proper support.",
    commonSigns: [
      "Heel or forefoot discomfort after long walks",
      "Desire for lighter, more responsive footwear",
      "Need for better traction on varied terrain",
    ],
    supportiveFeatures: [
      "Responsive cushioning for energy return",
      "Lightweight construction for reduced fatigue",
      "Durable outsoles for mixed surfaces",
    ],
    dailyImpact:
      "Walking is one of the most accessible forms of movement. Footwear designed for walking can make each step feel more comfortable and supported.",
    recommendedCategory: "Walking and lifestyle silhouettes",
    audienceGroups: ["adults", "men", "women", "40+", "elderly"],
    requiresDisclaimer: false,
    image: "1552346154-21d32810aba3",
  },
  {
    slug: "running",
    title: "Running",
    category: "Sports and Active Use",
    description:
      "Running places high impact on the feet and requires footwear that can absorb shock and support natural motion.",
    commonSigns: [
      "Recurring impact discomfort during or after runs",
      "Desire for better energy return",
      "Need for improved fit and lockdown",
    ],
    supportiveFeatures: [
      "High-rebound midsole compounds",
      "Lightweight, breathable uppers",
      "Secure heel lockdown for stable strides",
    ],
    dailyImpact:
      "Running puts up to three times your body weight through each foot. Purpose-built running footwear can help make each session more comfortable.",
    recommendedCategory: "Performance Runner silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers"],
    requiresDisclaimer: false,
    image: "1560769629-975ec94e6a86",
  },
  {
    slug: "gym-training",
    title: "Gym and Training",
    category: "Sports and Active Use",
    description:
      "Gym training involves lateral movement, lifting and impact that requires stable, versatile footwear.",
    commonSigns: [
      "Feet feeling unsupported during lateral moves",
      "Discomfort during high-impact exercises",
      "Need for better grip on gym floors",
    ],
    supportiveFeatures: [
      "Flat, stable platforms for lifting",
      "Supportive sidewalls for lateral stability",
      "Durable traction patterns",
    ],
    dailyImpact:
      "Training places varied demands on the feet. Versatile training footwear can help you move confidently between exercises.",
    recommendedCategory: "Training and cross-training silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers"],
    requiresDisclaimer: false,
    image: "1606107557195-0e29a4b5b4aa",
  },
  {
    slug: "court-sports",
    title: "Court Sports",
    category: "Sports and Active Use",
    description:
      "Court sports involve quick directional changes that place lateral stress on the feet and ankles.",
    commonSigns: [
      "Ankle discomfort during rapid direction changes",
      "Need for better grip on court surfaces",
      "Desire for lower, more stable platform",
    ],
    supportiveFeatures: [
      "Low-to-ground platforms for stability",
      "Reinforced side panels for lateral support",
      "Outsole patterns optimised for court grip",
    ],
    dailyImpact:
      "Quick stops and starts place unique demands on footwear. Court-specific design features may help support confident movement during play.",
    recommendedCategory: "Court and training silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers"],
    requiresDisclaimer: false,
    image: "1542291026-7eec264c27ff",
  },
  {
    slug: "outdoor-activity",
    title: "Outdoor Activity",
    category: "Sports and Active Use",
    description:
      "Outdoor activities expose feet to uneven terrain, moisture and variable temperatures.",
    commonSigns: [
      "Need for better traction on loose surfaces",
      "Feet feeling unsupported on uneven ground",
      "Desire for weather-resistant footwear",
    ],
    supportiveFeatures: [
      "Aggressive outsole tread patterns",
      "Weather-resistant upper materials",
      "Reinforced toe and heel protection",
    ],
    dailyImpact:
      "Outdoor conditions change constantly. Durable, traction-focused footwear can help you stay comfortable and confident on any terrain.",
    recommendedCategory: "Outdoor and trail silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers"],
    requiresDisclaimer: false,
    image: "1525966222134-fcfa99b8ae77",
  },
  {
    slug: "recovery-footwear",
    title: "Recovery Footwear",
    category: "Sports and Active Use",
    description:
      "After intense activity, your feet benefit from footwear that allows them to rest and recover.",
    commonSigns: [
      "Soreness or fatigue after workouts",
      "Desire for something soft and unrestrictive",
      "Need for easy-on, easy-off access",
    ],
    supportiveFeatures: [
      "Plush, cushioned footbeds",
      "Relaxed, roomy fit",
      "Lightweight construction",
    ],
    dailyImpact:
      "Recovery is an essential part of any training routine. Post-activity footwear designed for comfort can help your feet feel refreshed sooner.",
    recommendedCategory: "Relaxed lifestyle silhouettes",
    audienceGroups: ["adults", "men", "women", "teenagers", "40+"],
    requiresDisclaimer: false,
    image: "1595950653106-6c9ebd614d3a",
  },
];

export const categories = [
  {
    slug: "everyday-comfort",
    title: "Everyday Comfort",
    description: "For all-day ease, from morning to night.",
    icon: "Footprints",
  },
  {
    slug: "structural-needs",
    title: "Foot Structure & Movement",
    description: "For unique stride patterns and personalised support.",
    icon: "ShieldCheck",
  },
  {
    slug: "medical-recovery",
    title: "Recovery & Rehabilitation",
    description: "For gentle support during recovery and care.",
    icon: "Heart",
  },
  {
    slug: "sports-active",
    title: "Sports and Active Use",
    description: "For movement, training and staying active.",
    icon: "Sparkles",
  },
];

export const audienceGroups = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "children", label: "Children" },
  { id: "teenagers", label: "Teenagers" },
  { id: "adults", label: "Adults" },
  { id: "40+", label: "40+" },
  { id: "elderly", label: "Elderly" },
];
