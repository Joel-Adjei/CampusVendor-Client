

export const defaultAdmin = {
    id: "101",
    name: "Joel Adjei",
    email: "admin@admin.com",
    password: "12345678",
    role: "admin",
};

export const newVendors = [
    {name: "Vendor One", email: "trial@gmail.com", description: "Best vendor in town." , status: "Pending", joined: "30 mins ago" , type: "vendor"},
    {name: "Vendor Two", email: "trial@gmail.com", description: "Quality products." , status: "Pending", joined: "5 hours ago" , type: "services"},
    {name: "Vendor Three", email: "trial@gmail.com", description: "Affordable prices." , status: "Pending", joined: "1 day ago" , type: "vendor"},
    {name: "Vendor Four", email: "trial@gmail.com", description: "Fast delivery." , status: "Pending", joined: "2 days ago" , type: "services"},
];

export const universityOfGhanaHalls = [
    "Legon Hall",
    "Akuafo Hall",
    "Commonwealth Hall",
    "Volta Hall",
    "Mensah Sarbah Hall",
    "Alexander Adum Kwapong Hall",
    "Jean Nelson Aka Hall",
    "Elizabeth Frances Sey Hall",
    "James Topp Nelson Yankah Hall",
    "Hilla Limann Hall",
    "International Students' Hostel (ISH)",
    "Africa Hall",
    "Business School Hostel",
    "VALCO Trust Fund Hostel",
    "TF Hostel",
    "Pentagon Hostel",
    "Jubilee Hall",
    "Bani Hall",
    "Islamic Hostel",
    "Graduate Hostel (New)",
    "Graduate Hostel (Old)",
    "UGCS Hostel",
    "Evandy Hostel",
    "Unity Hall",
    "PENT Hall",
    "Jean Nelson Aka Hall Annex",
    "Limann Hall Annex",
    "Climate Change Hall",
    "New Hostel Complex",
    "Diaspora African Forum Hall"
];


export const hallOptions = universityOfGhanaHalls.map(hall => ({
    value: hall.toLowerCase().replace(/\s+/g, '_'),
    label: hall
}));