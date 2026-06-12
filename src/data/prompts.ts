export type Model =
  | "Veo"
  | "Seedance"
  | "Kling"
  | "Hailuo"
  | "Midjourney Video"
  | "Runway"
  | "Luma";

export type Category =
  | "Action"
  | "Documentary"
  | "Commercial"
  | "Luxury"
  | "Sci-Fi"
  | "Travel"
  | "Fashion"
  | "Cinematic";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Master";

export interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  model: Model;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  gradient: string;
  accent: string;
  stat: string;
}

export const MODELS: Model[] = [
  "Veo",
  "Seedance",
  "Kling",
  "Hailuo",
  "Midjourney Video",
  "Runway",
  "Luma",
];

export const CATEGORIES: Category[] = [
  "Action",
  "Documentary",
  "Commercial",
  "Luxury",
  "Sci-Fi",
  "Travel",
  "Fashion",
  "Cinematic",
];

export const PROMPTS: Prompt[] = [
  {
    id: "neon-rain-chase",
    title: "Neon Rain Chase",
    description:
      "A relentless rooftop pursuit through a rain-drenched megacity, lit only by holographic billboards and lightning.",
    prompt:
      "Cinematic tracking shot, low angle: a figure in a black trench coat sprints across wet neon-lit rooftops at night, torrential rain, reflections of pink and cyan holographic billboards on every surface, dynamic camera following at high speed, motion blur on background, lightning illuminating the skyline, anamorphic lens flares, 35mm film grain, dramatic high-contrast lighting, 24fps motion cadence, color graded like Blade Runner 2049.",
    model: "Kling",
    category: "Action",
    difficulty: "Advanced",
    tags: ["chase", "neon", "rain", "night city"],
    gradient: "linear-gradient(135deg, #0d0221 0%, #3b0a59 35%, #c9184a 70%, #ff5d8f 100%)",
    accent: "#ff5d8f",
    stat: "412K generations",
  },
  {
    id: "glacier-monk",
    title: "The Last Glacier",
    description:
      "A meditative documentary opening — one monk, one melting glacier, one impossible drone descent.",
    prompt:
      "Documentary aerial drone shot descending slowly through low clouds, revealing a lone monk in deep-red robes standing on a vast blue glacier at dawn, volumetric god rays breaking through mist, ultra-wide composition, natural muted color palette, gentle camera drift, photorealistic 8K detail, BBC Earth cinematography style, slow contemplative pacing, ambient stillness.",
    model: "Veo",
    category: "Documentary",
    difficulty: "Intermediate",
    tags: ["aerial", "nature", "dawn", "minimal"],
    gradient: "linear-gradient(135deg, #03045e 0%, #0077b6 40%, #90e0ef 80%, #caf0f8 100%)",
    accent: "#90e0ef",
    stat: "286K generations",
  },
  {
    id: "obsidian-perfume",
    title: "Obsidian No. 9",
    description:
      "A luxury perfume spot built from liquid gold, black silk and impossible macro physics.",
    prompt:
      "Ultra-luxury commercial macro shot: a sculptural black glass perfume bottle rotating slowly on a bed of flowing black silk, liquid gold cascading in slow motion around it, droplets suspended mid-air, studio lighting with a single dramatic rim light, deep shadows, shallow depth of field, 1000fps slow-motion feel, hyper-detailed reflections, premium product cinematography, Chanel campaign aesthetic.",
    model: "Runway",
    category: "Luxury",
    difficulty: "Master",
    tags: ["macro", "slow motion", "product", "gold"],
    gradient: "linear-gradient(135deg, #000000 0%, #1a1407 40%, #b8860b 75%, #ffd700 100%)",
    accent: "#ffd700",
    stat: "198K generations",
  },
  {
    id: "mars-terraform",
    title: "Terraform Dawn",
    description:
      "The first sunrise over a terraformed Mars — colossal atmosphere processors waking a red world.",
    prompt:
      "Epic sci-fi establishing shot: sunrise over a terraformed Mars valley, colossal atmosphere-processing towers venting white clouds into an orange-pink sky, two small astronauts on a ridge in the foreground for scale, slow majestic camera push-in, volumetric atmospheric haze, photorealistic planetary detail, Denis Villeneuve composition, IMAX 70mm look, deep cinematic color grade, awe-inspiring scale.",
    model: "Seedance",
    category: "Sci-Fi",
    difficulty: "Advanced",
    tags: ["space", "epic scale", "sunrise", "world-building"],
    gradient: "linear-gradient(135deg, #1a0500 0%, #7f2704 40%, #e85d04 75%, #ffba08 100%)",
    accent: "#ffba08",
    stat: "354K generations",
  },
  {
    id: "amalfi-vespa",
    title: "Amalfi Golden Hour",
    description:
      "A vintage Vespa ride along the Amalfi coast that feels like a memory you never had.",
    prompt:
      "Dreamy travel film shot: vintage cream-colored Vespa winding along the Amalfi coast road at golden hour, turquoise sea below, pastel cliffside villages, camera tracking alongside then craning up to reveal the coastline, warm sun flares through lens, gentle film halation, Kodak Portra color palette, nostalgic 16mm texture, soft wind movement in trees, romantic Italian summer atmosphere.",
    model: "Luma",
    category: "Travel",
    difficulty: "Beginner",
    tags: ["golden hour", "coast", "vintage", "16mm"],
    gradient: "linear-gradient(135deg, #03396c 0%, #0096c7 35%, #f4a261 70%, #ffd6a5 100%)",
    accent: "#f4a261",
    stat: "527K generations",
  },
  {
    id: "midnight-runway",
    title: "Midnight Couture",
    description:
      "An avant-garde fashion film — liquid fabric, strobing light, and a runway that doesn't exist.",
    prompt:
      "High-fashion editorial video: model walking toward camera through total darkness on a mirror-black runway, wearing an avant-garde gown made of flowing liquid chrome fabric, strobing white light freezing each step, fabric morphing and rippling in zero gravity between strobes, extreme contrast, Nick Knight SHOWstudio aesthetic, beauty lighting on face, 120fps slow motion, surreal couture energy.",
    model: "Hailuo",
    category: "Fashion",
    difficulty: "Master",
    tags: ["editorial", "strobe", "chrome", "surreal"],
    gradient: "linear-gradient(135deg, #0b090a 0%, #2b2d42 45%, #8d99ae 80%, #edf2f4 100%)",
    accent: "#c0c8d8",
    stat: "173K generations",
  },
  {
    id: "tokyo-noir",
    title: "Tokyo Noir Diner",
    description:
      "One unbroken shot through a 3 a.m. Tokyo diner where every stranger hides a story.",
    prompt:
      "Cinematic one-take dolly shot gliding through a tiny Tokyo diner at 3am, steam rising from ramen bowls, neon signage glow bleeding through rain-streaked windows, lonely customers in pools of warm tungsten light, cigarette smoke curling in air, Wong Kar-wai color palette of deep greens and reds, anamorphic bokeh, melancholic mood, 24fps, subtle handheld breathing on camera.",
    model: "Veo",
    category: "Cinematic",
    difficulty: "Advanced",
    tags: ["one-take", "noir", "neon", "atmosphere"],
    gradient: "linear-gradient(135deg, #081c15 0%, #1b4332 40%, #d00000 80%, #ffba08 100%)",
    accent: "#52b788",
    stat: "468K generations",
  },
  {
    id: "desert-sneaker",
    title: "Gravity Drop",
    description:
      "A sneaker commercial where the product falls from the stratosphere and lands like a meteor.",
    prompt:
      "High-energy commercial: a futuristic sneaker free-falling from the stratosphere toward a white desert, camera spiraling around the product in hyper slow motion, sonic boom vapor cone forming, dust shockwave exploding on impact in a perfect ring, product hero shot rising from the crater, dramatic backlight, Michael Bay energy with Apple-ad cleanliness, crisp 8K detail, bold dynamic camera moves.",
    model: "Kling",
    category: "Commercial",
    difficulty: "Intermediate",
    tags: ["product", "impact", "slow motion", "desert"],
    gradient: "linear-gradient(135deg, #161a1d 0%, #463f3a 40%, #e0afa0 75%, #f4f3ee 100%)",
    accent: "#e0afa0",
    stat: "391K generations",
  },
  {
    id: "deep-sea-leviathan",
    title: "Leviathan Light",
    description:
      "A bioluminescent leviathan passes a deep-sea station — documentary wonder at crushing depth.",
    prompt:
      "Deep-sea documentary shot from inside a research station viewport: a colossal bioluminescent leviathan glides past in absolute darkness, thousands of blue-green light organs pulsing in waves along its body, particles drifting in submersible spotlight beams, slow awe-struck camera tilt following the creature, James Cameron abyss aesthetic, photorealistic water physics and caustics, immense sense of scale and silence.",
    model: "Seedance",
    category: "Documentary",
    difficulty: "Advanced",
    tags: ["underwater", "creature", "bioluminescence", "scale"],
    gradient: "linear-gradient(135deg, #010409 0%, #03045e 45%, #0077b6 75%, #48cae4 100%)",
    accent: "#48cae4",
    stat: "243K generations",
  },
  {
    id: "monaco-heist",
    title: "Monaco Heist",
    description:
      "A vintage getaway through Monte Carlo — tuxedos, tunnels, and a 1968 Alfa at full song.",
    prompt:
      "1960s heist film sequence: a 1968 Alfa Romeo speeding through Monte Carlo tunnels at night, driver in a tuxedo, low chase-camera mounted inches above asphalt, tunnel lights streaking overhead in rhythmic flashes, cut to interior shot with cufflinks on the gearshift, Technicolor-inspired grade, period-correct film grain and gate weave, Steve McQueen energy, kinetic but elegant editing rhythm.",
    model: "Midjourney Video",
    category: "Action",
    difficulty: "Intermediate",
    tags: ["vintage", "cars", "heist", "night"],
    gradient: "linear-gradient(135deg, #10002b 0%, #240046 40%, #9d4edd 75%, #e0aaff 100%)",
    accent: "#c77dff",
    stat: "319K generations",
  },
  {
    id: "orbital-hotel",
    title: "Orbital Suite",
    description:
      "A luxury hotel suite in orbit — champagne floats, Earth turns, nothing is impossible.",
    prompt:
      "Luxury sci-fi interior shot: a minimalist hotel suite aboard an orbital station, floor-to-ceiling window filling the frame with a slowly rotating Earth, champagne bubbles floating in zero gravity past the camera, soft diffused lighting from Earth-glow, silk robe drifting weightlessly, extremely slow elegant camera glide, 2001 Space Odyssey precision, serene ambient luxury, photorealistic space detail.",
    model: "Luma",
    category: "Luxury",
    difficulty: "Advanced",
    tags: ["space", "zero gravity", "interior", "serene"],
    gradient: "linear-gradient(135deg, #03071e 0%, #023e7d 45%, #5390d9 80%, #b9e6ff 100%)",
    accent: "#5390d9",
    stat: "157K generations",
  },
  {
    id: "sahara-caravan",
    title: "Dune Caravan",
    description:
      "A camel caravan crossing star-shaped dunes, shot like a $200M epic with zero budget.",
    prompt:
      "Epic travel cinematography: aerial shot rising over star-shaped Sahara dunes at sunset, a long camel caravan casting mile-long shadows across rippled sand, warm amber and deep violet sky gradient, heat shimmer on the horizon, slow majestic crane movement, Lawrence of Arabia widescreen composition, rich 70mm texture, sweeping orchestral pacing, breathtaking natural scale.",
    model: "Veo",
    category: "Travel",
    difficulty: "Beginner",
    tags: ["desert", "aerial", "sunset", "epic"],
    gradient: "linear-gradient(135deg, #240046 0%, #6a040f 40%, #e85d04 75%, #ffd166 100%)",
    accent: "#e85d04",
    stat: "602K generations",
  },
];
