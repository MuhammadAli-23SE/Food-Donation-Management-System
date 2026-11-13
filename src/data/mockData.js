// NourishBridge Realistic Mock Data for Food-Tech Application

export const DEMO_USERS = {
  donor: {
    id: "usr_donor_01",
    name: "Marcus Vance",
    email: "marcus@artisanbakery.com",
    role: "donor",
    organizationName: "Golden Crust Artisan Bakery & Bistro",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    phone: "+1 (555) 234-8901",
    city: "Seattle, WA",
    address: "842 Pine Street, Downtown",
    bio: "Passionate artisanal baker dedicated to zero bakery surplus. Donating daily fresh bread and viennoiseries since 2024.",
    donationsCount: 38,
    mealsProvided: 1420
  },
  organization: {
    id: "usr_org_01",
    name: "Elena Rostova",
    email: "elena@hopecommunity.org",
    role: "organization",
    organizationName: "Hope Community Kitchen & Shelter",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    phone: "+1 (555) 892-4412",
    city: "Seattle, WA",
    address: "1205 4th Ave, South District",
    bio: "Providing 400+ warm, nutritious meals daily to unhoused families, veterans, and youth in greater Seattle.",
    verificationStatus: "verified", // "verified" | "pending" | "rejected"
    registrationNumber: "NGO-WA-2021-9874",
    certificateDoc: "https://example.com/certificate_sample.pdf",
    requestsCount: 29,
    peopleServed: 3850
  },
  admin: {
    id: "usr_admin_01",
    name: "Dr. Alistair Chen",
    email: "admin@nourishbridge.org",
    role: "admin",
    organizationName: "NourishBridge Operations Trust",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    phone: "+1 (555) 100-2020",
    city: "Seattle, WA",
    address: "700 Innovation Way, Suite 400",
    bio: "Platform Director & Systems Auditor monitoring food-safety compliance and organization certifications.",
    managedUsersCount: 184,
    verifiedOrgsCount: 42
  }
};

export const INITIAL_DONATIONS = [
  {
    id: "don_01",
    donorId: "usr_donor_01",
    donorName: "Golden Crust Artisan Bakery",
    donorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    title: "Surplus Sourdough Boules & Morning Brioche",
    description: "Daily evening surplus baked this morning. Crisp crust sourdough loaves, cardamom knots, and flaky butter brioche buns. Safely packed in food-grade bakery bags.",
    type: "bakery", // "cooked", "bakery", "produce", "packaged", "dairy"
    quantity: 35,
    unit: "loaves & pastries",
    estimatedServings: 70,
    storageInstructions: "Keep dry at ambient room temperature. Freeze if not consumed within 48 hours.",
    dietary: ["Vegetarian", "Dairy-Free Option"],
    expiryTime: "Today at 9:30 PM",
    expiryHoursLeft: 4,
    pickupAddress: "842 Pine Street, Seattle, WA",
    city: "Seattle",
    status: "available", // "available", "requested", "reserved", "completed", "cancelled"
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-11-13T12:00:00Z"
  },
  {
    id: "don_02",
    donorId: "usr_donor_02",
    donorName: "L'Étoile Mediterranean Brasserie",
    donorAvatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80",
    title: "Roasted Vegetable Couscous & Grilled Herb Chicken",
    description: "High-grade catered lunch trays stored in stainless commercial warmers. Tender rosemary chicken thighs with saffron bell pepper couscous. Untouched and vacuum sealed hot.",
    type: "cooked",
    quantity: 50,
    unit: "servings",
    estimatedServings: 50,
    storageInstructions: "Refrigerate immediately under 40°F (4°C) or consume warm within 2 hours.",
    dietary: ["Halal", "High Protein"],
    expiryTime: "Today at 10:00 PM",
    expiryHoursLeft: 5,
    pickupAddress: "410 Olive Way, Seattle, WA",
    city: "Seattle",
    status: "available",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-11-13T13:30:00Z"
  },
  {
    id: "don_03",
    donorId: "usr_donor_03",
    donorName: "Valley Green Organic Market",
    donorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    title: "Organic Heirloom Apples, Pears & Winter Squash",
    description: "Crated fresh harvest from local Yakima Valley farmers. Cosmetically imperfect but sweet and crisp orchard apples, ripe Bosc pears, and butternut squash.",
    type: "produce",
    quantity: 120,
    unit: "kg",
    estimatedServings: 240,
    storageInstructions: "Store in cool cellar or produce bin.",
    dietary: ["Vegan", "Organic", "Gluten-Free"],
    expiryTime: "Tomorrow at 6:00 PM",
    expiryHoursLeft: 26,
    pickupAddress: "1904 Pike Place, Stall 14",
    city: "Seattle",
    status: "available",
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-11-13T10:15:00Z"
  },
  {
    id: "don_04",
    donorId: "usr_donor_04",
    donorName: "Grand Hyatt Banquet Services",
    donorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    title: "Steamed Jasmine Rice & Thai Green Coconut Curry",
    description: "Surplus buffet food from a corporate summit. Aromatic vegetable tofu coconut curry with ginger and lime leaves, alongside fragrant jasmine rice in sanitized cambro containers.",
    type: "cooked",
    quantity: 65,
    unit: "servings",
    estimatedServings: 65,
    storageInstructions: "Keep insulated in thermal bags until transfer to cold storage.",
    dietary: ["Vegan", "Gluten-Free", "Nut-Free"],
    expiryTime: "Today at 11:30 PM",
    expiryHoursLeft: 6,
    pickupAddress: "721 Pine St, Loading Dock B",
    city: "Seattle",
    status: "requested",
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-11-13T14:00:00Z"
  },
  {
    id: "don_05",
    donorId: "usr_donor_01",
    donorName: "Golden Crust Artisan Bakery",
    donorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    title: "Sandwich Baguettes, Ciabatta & Artisanal Rye",
    description: "Rustic crusty loaves baked for evening banquet orders that downsized. Ideal for shelters serving hearty soups and stews.",
    type: "bakery",
    quantity: 25,
    unit: "loaves",
    estimatedServings: 60,
    storageInstructions: "Room temperature.",
    dietary: ["Vegetarian"],
    expiryTime: "Tomorrow at 11:00 AM",
    expiryHoursLeft: 18,
    pickupAddress: "842 Pine Street, Downtown",
    city: "Seattle",
    status: "reserved",
    imageUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-11-13T11:00:00Z"
  },
  {
    id: "don_06",
    donorId: "usr_donor_05",
    donorName: "Pacific Dairy Collective",
    donorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    title: "Whole Grade-A Milk & Cultured Greek Yogurt",
    description: "Sealed cartons from local dairy farm direct delivery with 5 days remaining before sell-by date. 100% pasteurized and chilled in refrigerated display.",
    type: "dairy",
    quantity: 40,
    unit: "units / gallons",
    estimatedServings: 80,
    storageInstructions: "Store strictly at 36°F - 39°F.",
    dietary: ["Vegetarian", "Calcium Rich"],
    expiryTime: "Nov 16 at 5:00 PM",
    expiryHoursLeft: 72,
    pickupAddress: "2200 Westlake Ave, South Lake Union",
    city: "Seattle",
    status: "available",
    imageUrl: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-11-13T09:30:00Z"
  }
];

export const INITIAL_REQUESTS = [
  {
    id: "req_01",
    donationId: "don_04",
    donationTitle: "Steamed Jasmine Rice & Thai Green Coconut Curry",
    donationImage: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=600&q=80",
    organizationId: "usr_org_01",
    organizationName: "Hope Community Kitchen & Shelter",
    orgAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    donorId: "usr_donor_04",
    donorName: "Grand Hyatt Banquet Services",
    requestedQuantity: "65 servings",
    status: "pending", // "pending" | "approved" | "rejected" | "cancelled"
    notes: "We have an evening family shelter meal at 7:00 PM. We can send our refrigerated van for pickup at 5:30 PM.",
    createdAt: "2026-11-13T14:45:00Z"
  },
  {
    id: "req_02",
    donationId: "don_05",
    donationTitle: "Sandwich Baguettes, Ciabatta & Artisanal Rye",
    donationImage: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80",
    organizationId: "usr_org_01",
    organizationName: "Hope Community Kitchen & Shelter",
    orgAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    donorId: "usr_donor_01",
    donorName: "Golden Crust Artisan Bakery",
    requestedQuantity: "25 loaves",
    status: "approved",
    notes: "Perfect accompaniment for our vegetable minestrone. Our volunteer David will pick this up on his route.",
    createdAt: "2026-11-13T11:45:00Z"
  },
  {
    id: "req_03",
    donationId: "don_02",
    donationTitle: "Roasted Vegetable Couscous & Grilled Herb Chicken",
    donationImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    organizationId: "usr_org_02",
    organizationName: "St. Vincent Youth Food Bank",
    orgAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    donorId: "usr_donor_02",
    donorName: "L'Étoile Mediterranean Brasserie",
    requestedQuantity: "50 servings",
    status: "approved",
    notes: "Warm meal for 45 youth arriving at our community drop-in center.",
    createdAt: "2026-11-12T16:00:00Z"
  }
];

export const INITIAL_TRACKING = [
  {
    id: "trk_01",
    donationId: "don_05",
    requestId: "req_02",
    title: "Sandwich Baguettes, Ciabatta & Artisanal Rye",
    donorName: "Golden Crust Artisan Bakery",
    organizationName: "Hope Community Kitchen",
    status: "scheduled", // "reserved", "scheduled", "picked_up", "distributed"
    pickupAddress: "842 Pine Street, Seattle, WA",
    scheduledTime: "Today at 5:00 PM",
    driverName: "David Miller (Volunteer Van #2)",
    beneficiaryTarget: 60,
    proofImage: null,
    distributionNotes: "",
    updatedAt: "2026-11-13T12:30:00Z"
  },
  {
    id: "trk_02",
    donationId: "don_02",
    requestId: "req_03",
    title: "Roasted Vegetable Couscous & Grilled Herb Chicken",
    donorName: "L'Étoile Mediterranean Brasserie",
    organizationName: "St. Vincent Youth Food Bank",
    status: "picked_up",
    pickupAddress: "410 Olive Way, Seattle, WA",
    scheduledTime: "Today at 3:30 PM",
    driverName: "Sarah Chen (Cargo Van)",
    beneficiaryTarget: 50,
    proofImage: null,
    distributionNotes: "Collected in insulated food warmers. Heading to drop-in center.",
    updatedAt: "2026-11-13T15:40:00Z"
  },
  {
    id: "trk_03",
    donationId: "don_hist_01",
    requestId: "req_hist_01",
    title: "Gourmet Pasta Trays & Garden Salads",
    donorName: "Trattoria Bella",
    organizationName: "Hope Community Kitchen",
    status: "distributed",
    pickupAddress: "1420 5th Ave, Seattle, WA",
    scheduledTime: "Nov 11, 2026 at 4:00 PM",
    driverName: "Elena Rostova",
    beneficiaryTarget: 75,
    actualBeneficiaries: 82,
    proofImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    distributionNotes: "All 82 community members were served hot dinner. Zero food wasted. Complete community gratitude.",
    updatedAt: "2026-11-11T19:30:00Z"
  }
];

export const ORGANIZATIONS_LIST = [
  {
    id: "usr_org_01",
    name: "Hope Community Kitchen & Shelter",
    repName: "Elena Rostova",
    email: "elena@hopecommunity.org",
    phone: "+1 (555) 892-4412",
    regNumber: "501(c)(3) #84-291829",
    city: "Seattle, WA",
    address: "1205 4th Ave, South District",
    verificationStatus: "verified",
    certificateUrl: "https://example.com/certificate_sample.pdf",
    appliedDate: "Oct 12, 2026",
    peopleServedMonthly: 4200,
    mission: "Equitable meal distribution for unsheltered adults and working families."
  },
  {
    id: "usr_org_02",
    name: "St. Vincent Youth Food Bank",
    repName: "Father Marcus Hall",
    email: "marcus@stvincentyouth.org",
    phone: "+1 (555) 431-9002",
    regNumber: "NGO-WA-501-449",
    city: "Seattle, WA",
    address: "2100 2nd Ave, Belltown",
    verificationStatus: "verified",
    certificateUrl: "https://example.com/certificate_sample.pdf",
    appliedDate: "Nov 01, 2026",
    peopleServedMonthly: 1850,
    mission: "Nourishing school children and youth programs across King County."
  },
  {
    id: "usr_org_03",
    name: "Rainier Valley Food Relief",
    repName: "Amina Jama",
    email: "amina@rainierrelief.org",
    phone: "+1 (555) 772-1920",
    regNumber: "WA-CHARITY-9921",
    city: "Rainier Beach, WA",
    address: "8812 Rainier Ave S",
    verificationStatus: "pending",
    certificateUrl: "https://example.com/certificate_sample.pdf",
    appliedDate: "Nov 12, 2026",
    peopleServedMonthly: 2100,
    mission: "Culturally relevant food access for refugee and immigrant families."
  },
  {
    id: "usr_org_04",
    name: "Compassion Center Ballard",
    repName: "Thomas Lind",
    email: "thomas@compassionballard.org",
    phone: "+1 (555) 654-3210",
    regNumber: "NGO-WA-1029",
    city: "Ballard, WA",
    address: "5401 22nd Ave NW",
    verificationStatus: "pending",
    certificateUrl: "https://example.com/certificate_sample.pdf",
    appliedDate: "Nov 13, 2026",
    peopleServedMonthly: 1200,
    mission: "Daily breakfast and pantry distribution for unhoused seniors."
  }
];

export const SYSTEM_ACTIVITY = [
  {
    id: "act_01",
    action: "Donation Created",
    actor: "Golden Crust Artisan Bakery",
    actorRole: "Donor",
    target: "Surplus Sourdough Boules (35 loaves)",
    time: "15 minutes ago",
    badge: "New Listing"
  },
  {
    id: "act_02",
    action: "Request Approved",
    actor: "L'Étoile Mediterranean Brasserie",
    actorRole: "Donor",
    target: "St. Vincent Youth Food Bank (50 servings)",
    time: "1 hour ago",
    badge: "Fulfillment"
  },
  {
    id: "act_03",
    action: "Distribution Completed",
    actor: "Hope Community Kitchen",
    actorRole: "Organization",
    target: "82 Beneficiaries Fed (Proof Uploaded)",
    time: "3 hours ago",
    badge: "Impact"
  },
  {
    id: "act_04",
    action: "Verification Submitted",
    actor: "Rainier Valley Food Relief",
    actorRole: "Organization",
    target: "Certificate Doc #WA-CHARITY-9921",
    time: "5 hours ago",
    badge: "Compliance"
  }
];
