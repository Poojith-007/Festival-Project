'use client';

import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'te';

export const translations = {
  en: {
    // Header & Navigation
    home: 'Home',
    days: 'Days',
    updates: 'Updates',
    gallery: 'Gallery',
    nimajjanam: 'Nimajjanam',
    wallet: 'Wallet',
    menu: 'Menu',
    menuTitle: 'Festival Menu',
    selectLanguage: 'Select Language',
    aboutMenu: 'About Festival',
    organizersMenu: 'Organizers & Committee',
    locationMenu: 'Location & Directions',
    instructionsMenu: 'Instructions & Guidelines',
    contactMenu: 'Contact Details',
    moneyMenu: 'Money & Donations',
    shareLink: 'Share Festival Link',
    linkCopied: 'Link Copied!',

    // Hero Section
    heroBadge: 'Devotional Celebrations 2026',
    festivalTitle: 'Sri Vinayaka Chavithi Celebrations 2026',
    teluguTitle: 'శ్రీ వినాయక చవితి మహోత్సవాలు 2026',
    villageName: 'Suryaraopet',
    liveStatus: 'FESTIVAL IS LIVE',
    dayWord: 'DAY',
    todayQuickSchedule: "Today's Quick Schedule",
    viewScheduleBtn: "View Today's Schedule",

    // 7-Day Journey
    journeyTitle: 'The 7-Day Journey (List View)',
    journeySubtitle: 'Explore the daily schedule, sacred rituals, and divine darshan.',
    todayStage: 'Pranapratishta',
    todayLabel: 'Day 1 (14 September 2026)',
    upcomingStage: 'Days 2–6',
    upcomingNote: 'Upcoming events. Normal opacity.',
    mahaNimajjanamStage: 'MAHA NIMAJJANAM',
    finalDayLabel: 'Day 7 (20 September 2026)',

    // Specific Day Details
    dayDetailsHeading: 'Specific Day Details',
    dayThemeBlock: 'Day Theme & Schedule Block',
    themeLabel: 'Theme',
    dayAnnouncements: 'Announcements',
    dayPhotoGrid: 'Photo Grid',
    lightboxHint: 'Click to open lightbox',
    dayScheduleIntro: 'Showing schedule, updates, and photos for Day',
    dayNumberSuffix: '',
    phoneLabel: 'Phone / Mobile',
    emailLabel: 'Email Address',
    venueTimingsLabel: 'Venue Timings',
    mapDistance: '~3.5 KM',
    mapAlt: 'Procession Route Map',
    addMoneyRecord: 'Add Money Record',
    moneyRecordType: 'Record Type',
    moneyRecordDescription: 'Description',
    moneyRecordAmount: 'Amount',
    moneyRecordDonation: 'Chanda / Donation',
    moneyRecordSponsor: 'Sponsorship',
    moneyRecordExpense: 'Expense',
    addRecord: 'Add Record',
    moneyRecords: 'Recent Money Records',
    noMoneyRecords: 'No money records added yet.',

    // Updates
    updatesHeading: 'Live Updates & Notifications',
    updatesSubheading: 'Real-time announcements and event updates from the organizing committee.',
    liveUpdateBadge: 'LIVE UPDATE (High Priority)',
    liveUpdate1Title: "Today's Maha Aarti will begin at 7:30 PM.",
    liveUpdate1Time: '10 minutes ago',
    programChangeBadge: 'Program Change',
    liveUpdate2Title: "Important: Today's cultural program has been rescheduled to 8:00 PM.",
    liveUpdate2Time: '2 hours ago',
    mandapamIllumination: 'Pooja Mandapam & Golden Illumination',
    subscribeBtn: '🔔 Subscribe to Push Notifications',
    subscribedBtn: '✓ Subscribed to Push Notifications',
    notificationSuccess: 'Push notifications enabled! You will receive live alerts.',
    notificationUnsubscribed: 'Push notifications unsubscribed.',
    notificationBlocked: 'Notifications are blocked in your browser settings. Please allow notifications in site settings.',
    notificationUnsupported: 'Your browser does not support push notifications.',
    notificationWelcome: '🔔 You are now subscribed to live aarti & festival updates for Suryaraopet!',

    // Gallery
    galleryHeading: 'Immersive Gallery & Videos',
    gallerySubheading: 'Explore festival photographs, devotional aartis, and procession videos.',
    allFilter: 'All',

    // Nimajjanam
    nimajjanamHeading: 'Maha Nimajjanam (Overrides Home on Day 7)',
    nimajjanamSubheading: 'Grand Visarjan, Procession Route, and Water Safety Instructions',
    countdownUnits: 'HRS : MIN : SEC',
    untilProcession: 'Until Procession Starts',
    routeMapHeading: 'Procession Route Map',
    routeMapSub: 'Suryaraopet Main Mandapam → Gandhi Chowk → Machilipatnam Link → Immersion Ghat',
    safetyHeading: 'Important Instructions',
    safety1: 'Keep children with guardians at all times.',
    safety2: 'Use designated parking areas only.',
    safety3: 'Follow safety instructions near water strictly.',

    // About
    aboutHeading: 'About Sri Vinayaka Chavithi Mahotsavam',
    aboutBadge: 'Tradition & Devotion',
    aboutP1: 'Sri Vinayaka Chavithi Mahotsavam is the premier devotional and cultural celebration of Suryaraopet. For years, our community has gathered in sacred harmony to worship Lord Ganesha with Vedic rituals, cultural renditions, and selfless service.',
    aboutP2: 'The 7 days symbolize prayer, community togetherness, and cultural vibrancy. From morning Suprabhatam to evening bhajans and divine prasadam distribution, the festival welcomes devotees from across surrounding regions.',

    // Organizers
    organizersHeading: 'Festival Organizers',
    organizersBadge: 'Organizing Committee',

    // Location
    locationHeading: 'Festival Location',
    locationBadge: 'Venue Details',
    mandapamName: 'Ramalayam Temple Mandapam',
    venueAddress: '64QC+V49, Suryaraopet, near, Machilipatnam, Andhra Pradesh 521366',
    venueLandmark: 'Near Pedana, Krishna District',
    getDirectionsBtn: 'Get Directions on Google Maps',
    openInMaps: 'Open in Maps ↗',

    // Instructions
    instructionsHeading: 'Important Instructions',
    instructionsBadge: 'Devotee Guidelines',

    // Money / Donations
    moneyHeading: 'Festival Fund & Donations (Money)',
    moneyBadge: 'Transparency & Contributions',
    moneySubheading: 'Support sacred pooja rituals, daily Anna Danam, flower decorations, and the grand immersion procession.',
    donationsCollected: 'Donations Received',
    categorizedExpenses: 'Budget / Expenses',
    treasuryBalance: 'Account Balance',
    sponsorTitle: 'Sponsorship Categories',
    sponsor1: '🌸 Daily Flower Alankaram: ₹ 5,000',
    sponsor2: '🍛 Maha Anna Danam Seva: ₹ 10,000',
    sponsor3: '🪔 Maha Aarti & Laddu Prasadam: ₹ 3,000',
    sponsor4: '🥁 Nimajjanam Procession & Dappu: ₹ 15,000',
    contactTreasurer: 'For receipts, UPI QR code, and offline donations, please contact the Committee Treasurer.',

    // Contact
    contactHeading: 'Contact & Help Desk',
    contactBadge: 'Reach Out',
    contactSub: 'For pooja sponsorships, volunteer registration, or emergencies, please contact the festival committee.',
    templeTimings: 'Darshan & Office Hours: 06:00 AM - 10:00 PM',

    // Footer
    quickNav: 'Quick Navigation',
    footerJourney: '7-Day Journey Schedule',
    footerUpdates: 'Live Updates & Alerts',
    footerGallery: 'Photo & Video Gallery',
    footerNimajjanam: 'Maha Nimajjanam',
    footerInstructions: 'Instructions & Guidelines',
    footerMoney: 'Money & Donations',
    footerVenue: 'Festival Venue',
    viewDirections: 'View Map & Directions →',
    footerCopyright: '© 2026 Sri Vinayaka Chavithi Mahotsavam, Suryaraopet. Devotion • Celebration • Unity.',
  },
  te: {
    // Header & Navigation
    home: 'హోమ్',
    days: 'రోజులు',
    updates: 'అప్‌డేట్స్',
    gallery: 'గ్యాలరీ',
    nimajjanam: 'నిమజ్జనం',
    wallet: 'వాలెట్',
    menu: 'మెనూ',
    menuTitle: 'ఉత్సవ మెనూ',
    selectLanguage: 'భాషను ఎంచుకోండి',
    aboutMenu: 'ఉత్సవ విశేషాలు',
    organizersMenu: 'నిర్వాహకులు & కమిటీ',
    locationMenu: 'ప్రాంగణం & దారి',
    instructionsMenu: 'భక్తుల సూచనలు',
    contactMenu: 'సంప్రదించండి',
    moneyMenu: 'చందాలు & విరాళాలు (Money)',
    shareLink: 'ఉత్సవ లింక్‌ను షేర్ చేయండి',
    linkCopied: 'లింక్ కాపీ అయింది!',

    // Hero Section
    heroBadge: 'భక్తి ప్రపత్తుల వేడుకలు 2026',
    festivalTitle: 'శ్రీ వినాయక చవితి మహోత్సవాలు 2026',
    teluguTitle: 'శ్రీ వినాయక చవితి మహోత్సవాలు 2026',
    villageName: 'సూర్యారావుపేట',
    liveStatus: 'ఉత్సవాలు ప్రారంభమైనవి',
    dayWord: 'రోజు',
    todayQuickSchedule: 'నేటి ముఖ్య పూజా కార్యక్రమాలు',
    viewScheduleBtn: 'నేటి పూర్తి షెడ్యూల్ చూడండి',

    // 7-Day Journey
    journeyTitle: '7 రోజుల ఉత్సవ ప్రస్థానం (జాబితా)',
    journeySubtitle: 'రోజువారీ పూజా విశేషాలు, దివ్య హారతులు మరియు దర్శనం వివరాలు.',
    todayStage: 'ప్రాణప్రతిష్ఠ',
    todayLabel: '1వ రోజు (14 సెప్టెంబర్ 2026)',
    upcomingStage: '2–6 రోజులు',
    upcomingNote: 'రాబోవు రోజువారీ పూజా కార్యక్రమాలు.',
    mahaNimajjanamStage: 'మహా నిమజ్జనం',
    finalDayLabel: '7వ రోజు (20 సెప్టెంబర్ 2026)',

    // Specific Day Details
    dayDetailsHeading: 'రోజువారీ పూర్తి వివరాలు',
    dayThemeBlock: 'నేటి పూజా విశేషాలు & సమయాలు',
    themeLabel: 'విశేషం',
    dayAnnouncements: 'తాజా ప్రకటనలు',
    dayPhotoGrid: 'ఫోటో గ్యాలరీ',
    lightboxHint: 'పెద్దగా చూడటానికి క్లిక్ చేయండి',
    dayScheduleIntro: 'రోజు పూజా కార్యక్రమాలు, విశేషాలు మరియు ఫోటోలు:',
    dayNumberSuffix: 'వ రోజు',
    phoneLabel: 'ఫోన్ / మొబైల్',
    emailLabel: 'ఈమెయిల్ చిరునామా',
    venueTimingsLabel: 'సందర్శన వేళలు',
    mapDistance: '~3.5 కి.మీ',
    mapAlt: 'శోభాయాత్ర మార్గ పటం',
    addMoneyRecord: 'ఆదాయం లేదా ఖర్చు నమోదు చేయండి',
    moneyRecordType: 'నమోదు రకం',
    moneyRecordDescription: 'వివరణ',
    moneyRecordAmount: 'మొత్తం',
    moneyRecordDonation: 'చందా / విరాళం',
    moneyRecordSponsor: 'స్పాన్సర్ విరాళం',
    moneyRecordExpense: 'ఖర్చు',
    addRecord: 'నమోదు చేయండి',
    moneyRecords: 'ఇటీవలి నిధి వివరాలు',
    noMoneyRecords: 'ఇంకా నిధి వివరాలు నమోదు కాలేదు.',

    // Updates
    updatesHeading: 'లైవ్ అప్‌డేట్స్ & ప్రకటనలు',
    updatesSubheading: 'ఉత్సవ కమిటీ నుండి ఎప్పటికప్పుడు తాజా సమాచారం మరియు ప్రకటనలు.',
    liveUpdateBadge: 'లైవ్ అప్‌డేట్ (ముఖ్య సమాచారం)',
    liveUpdate1Title: 'నేటి సాయంత్రం మహా ఆరతి 7:30 గంటలకు ప్రారంభమవుతుంది.',
    liveUpdate1Time: '10 నిమిషాల క్రితం',
    programChangeBadge: 'కార్యక్రమ సమయ మార్పు',
    liveUpdate2Title: 'ముఖ్య గమనిక: సాంస్కృతిక భజన కార్యక్రమం రాత్రి 8:00 గంటలకు నిర్వహించబడుతుంది.',
    liveUpdate2Time: '2 గంటల క్రితం',
    mandapamIllumination: 'దివ్య పూజా మండపం & విద్యుద్దీపాలంకరణ',
    subscribeBtn: '🔔 పుష్ నోటిఫికేషన్లను ప్రారంభించండి',
    subscribedBtn: '✓ పుష్ నోటిఫికేషన్లు ఆన్ చేయబడ్డాయి',
    notificationSuccess: 'నోటిఫికేషన్లు ఆన్ చేయబడ్డాయి! ప్రత్యక్ష సమాచారం అందుతుంది.',
    notificationUnsubscribed: 'నోటిఫికేషన్లు రద్దు చేయబడ్డాయి.',
    notificationBlocked: 'నోటిఫికేషన్లు బ్లాక్ చేయబడ్డాయి. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి.',
    notificationUnsupported: 'మీ బ్రౌజర్ పుష్ నోటిఫికేషన్లను సపోర్ట్ చేయదు.',
    notificationWelcome: '🔔 ధన్యవాదాలు! సూర్యారావుపేట గణేష్ ఉత్సవాల ప్రత్యక్ష అప్‌డేట్స్ మీకు అందుతాయి.',

    // Gallery
    galleryHeading: 'ఫోటో & వీడియో గ్యాలరీ',
    gallerySubheading: 'ఉత్సవ వేడుకలు, భక్తి ఆరతులు మరియు శోభాయాత్ర వీడియోలు.',
    allFilter: 'అన్నీ',

    // Nimajjanam
    nimajjanamHeading: 'మహా నిమజ్జనం (7వ రోజు ముగింపు)',
    nimajjanamSubheading: 'ఘనంగా శోభాయాత్ర, నిమజ్జన మార్గం మరియు భద్రతా సూచనలు',
    countdownUnits: 'గంటలు : నిమిషాలు : సెకన్లు',
    untilProcession: 'శోభాయాత్ర ప్రారంభ సమయం వరకు',
    routeMapHeading: 'శోభాయాత్ర మార్గ పటం',
    routeMapSub: 'సూర్యారావుపేట రామాలయం మండపం → గాంధీ చౌక్ → మచిలీపట్నం రోడ్డు → నిమజ్జన ఘాట్',
    safetyHeading: 'ముఖ్యమైన భద్రతా సూచనలు',
    safety1: 'చిన్నపిల్లలను తల్లిదండ్రులు జాగ్రత్తగా గమనిస్తూ ఉండండి.',
    safety2: 'వాహనాలను కేటాయించిన పార్కింగ్ ప్రదేశాల్లోనే ఉంచండి.',
    safety3: 'నీటి ఒడ్డున వాలంటీర్ల భద్రతా హెచ్చరికలు తప్పక పాటించండి.',

    // About
    aboutHeading: 'శ్రీ వినాయక చవితి మహోత్సవాల గురించి',
    aboutBadge: 'సాంప్రదాయం & భక్తి',
    aboutP1: 'సూర్యారావుపేట గ్రామ ప్రజల ఆధ్వర్యంలో జరుగు అత్యంత వైభవమైన భక్తి సంబరం శ్రీ వినాయక చవితి మహోత్సవాలు. ప్రతి సంవత్సరం మన గ్రామంలో గణనాథుడిని వేదమంత్రోచ్ఛారణలతో, సాంస్కృతిక వేడుకలతో ఘనంగా కొలుస్తున్నాము.',
    aboutP2: 'ఈ 7 రోజుల పాటు జరిగే నిత్య పూజలు, సుప్రభాతం, అఖండ భజనలు మరియు అన్నదాన కార్యక్రమాలలో భక్తులందరూ పాల్గొని తీర్థప్రసాదాలు స్వీకరించగలరు.',

    // Organizers
    organizersHeading: 'ఉత్సవ నిర్వాహకులు & కమిటీ',
    organizersBadge: 'ఉత్సవ కమిటీ',

    // Location
    locationHeading: 'ఉత్సవ ప్రాంగణం & దారి',
    locationBadge: 'ప్రదేశం వివరాలు',
    mandapamName: 'రామాలయం గుడి ప్రాంగణం',
    venueAddress: '64QC+V49, సూర్యారావుపేట, మచిలీపట్నం దగ్గర, ఆంధ్రప్రదేశ్ 521366',
    venueLandmark: 'మచిలీపట్నం దగ్గర, పెడన సమీపంలో, కృష్ణా జిల్లా',
    getDirectionsBtn: 'గూగుల్ మ్యాప్స్‌లో దారి చూడండి',
    openInMaps: 'మ్యాప్స్‌లో చూడండి ↗',

    // Instructions
    instructionsHeading: 'భక్తులకు ముఖ్యమైన సూచనలు',
    instructionsBadge: 'దర్శన మార్గదర్శకాలు',

    // Money / Donations
    moneyHeading: 'ఉత్సవ నిధి & విరాళాలు (Money)',
    moneyBadge: 'పారదర్శకత & సహాయ నిధి',
    moneySubheading: 'నిత్య పూజలు, అన్నదానం, పుష్పాలంకరణ మరియు నిమజ్జన శోభాయాత్ర కోసం మీ వంతు సహాయం చేయండి.',
    donationsCollected: 'స్వీకరించిన విరాళాలు',
    categorizedExpenses: 'ఖర్చులు / బడ్జెట్',
    treasuryBalance: 'మిగిలిన నిల్వ',
    sponsorTitle: 'ప్రత్యేక సేవా విరాళాలు',
    sponsor1: '🌸 నిత్య పుష్పాలంకరణ సేవ: ₹ 5,000',
    sponsor2: '🍛 మహా అన్నదాన సేవ: ₹ 10,000',
    sponsor3: '🪔 మహా ఆరతి & లడ్డూ ప్రసాదం: ₹ 3,000',
    sponsor4: '🥁 నిమజ్జన శోభాయాత్ర డప్పు వాయిద్యాలు: ₹ 15,000',
    contactTreasurer: 'రసీదులు, ఆన్‌లైన్ UPI చెల్లింపులు లేదా చందాల కొరకు కమిటీ కోశాధికారిని సంప్రదించండి.',

    // Contact
    contactHeading: 'సంప్రదించండి & సహాయ కేంద్రం',
    contactBadge: 'సహాయ కేంద్రం',
    contactSub: 'పూజల సమాచారం, అన్నదానం విరాళాలు లేదా అత్యవసర సేవల కొరకు కమిటీ సభ్యులను సంప్రదించండి.',
    templeTimings: 'దర్శనం & కార్యాలయ వేళలు: ఉదయం 06:00 - రాత్రి 10:00',

    // Footer
    quickNav: 'త్వరిత లింకులు',
    footerJourney: '7 రోజుల ఉత్సవ ప్రస్థానం',
    footerUpdates: 'లైవ్ అప్‌డేట్స్ & సమాచారం',
    footerGallery: 'ఫోటో & వీడియో గ్యాలరీ',
    footerNimajjanam: 'మహా నిమజ్జనం',
    footerInstructions: 'నిబంధనలు & సూచనలు',
    footerMoney: 'చందాలు & విరాళాలు (Money)',
    footerVenue: 'ఉత్సవ ప్రాంగణం',
    viewDirections: 'దారి & మ్యాప్ చూడండి →',
    footerCopyright: '© 2026 శ్రీ వినాయక చవితి మహోత్సవాలు, సూర్యారావుపేట. భక్తి • వేడుక • ఐక్యత.',
  }
};

// Bilingual 7-Day Journey Data
export interface TranslatedDay {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  shortDescription: string;
  status: 'current' | 'upcoming';
  announcement: string;
  events: Array<{ id: string; time: string; name: string; icon: string }>;
}

export const translatedDaysData: Record<Language, TranslatedDay[]> = {
  en: [
    {
      id: 'day-1',
      dayNumber: 1,
      date: '14 Sep 2026',
      title: 'Installation & Pranapratishta',
      shortDescription: 'The grand welcoming and sacred consecration of Lord Ganesha.',
      status: 'upcoming',
      announcement: 'Welcome to Day 1! Murthi Sthapana and Pranapratishta will begin at 9:00 AM.',
      events: [
        { id: 'e1', time: '06:00 AM', name: 'Suprabhatam & Mangala Vadyam', icon: '🌅' },
        { id: 'e2', time: '09:00 AM', name: 'Murthi Sthapana & Pranapratishta', icon: '🪔' },
        { id: 'e3', time: '07:00 PM', name: 'Ganesh Puja & Maha Aarti', icon: '🕉️' },
        { id: 'e4', time: '08:00 PM', name: 'Maha Prasadam Distribution', icon: '🍛' }
      ]
    },
    {
      id: 'day-2',
      dayNumber: 2,
      date: '15 Sep 2026',
      title: 'Ganesh Puja & Archana',
      shortDescription: 'Morning Vedic rituals and evening devotional archana.',
      status: 'upcoming',
      announcement: 'Please follow queues for smooth darshan and archana offerings.',
      events: [
        { id: 'e5', time: '07:00 AM', name: 'Nitya Ganesh Puja', icon: '🪔' },
        { id: 'e6', time: '10:00 AM', name: 'Sahasranama Archana', icon: '🌸' },
        { id: 'e7', time: '06:00 PM', name: 'Sandhya Aarti & Bhajans', icon: '🕉️' },
        { id: 'e8', time: '07:30 PM', name: 'Prasadam Distribution', icon: '🍛' }
      ]
    },
    {
      id: 'day-3',
      dayNumber: 3,
      date: '16 Sep 2026',
      title: 'Devotional Bhajans & Kirtans',
      shortDescription: 'Devotional songs and musical renditions by the village community.',
      status: 'upcoming',
      announcement: 'Special musical bhajans by local devotees starting at 7:30 PM.',
      events: [
        { id: 'e9', time: '07:00 AM', name: 'Morning Puja', icon: '🪔' },
        { id: 'e10', time: '06:30 PM', name: 'Divya Deepa Aarti', icon: '🕉️' },
        { id: 'e11', time: '07:30 PM', name: 'Community Bhajans & Kirtans', icon: '🎵' },
        { id: 'e12', time: '09:00 PM', name: 'Teertha Prasadam', icon: '🍛' }
      ]
    },
    {
      id: 'day-4',
      dayNumber: 4,
      date: '17 Sep 2026',
      title: 'Sri Mahaganapathi Special Puja',
      shortDescription: 'Sacred abhishekam, deeparadhana, and cultural events.',
      status: 'current',
      announcement: 'Today special Anna Danam seva will be served to all devotees.',
      events: [
        { id: 'e13', time: '06:00 AM', name: 'Suprabhatam', icon: '🌅' },
        { id: 'e14', time: '07:00 AM', name: 'Vishesha Abhishekam & Puja', icon: '🪔' },
        { id: 'e15', time: '10:00 AM', name: 'Sarva Darshanam', icon: '🙏' },
        { id: 'e16', time: '06:00 PM', name: 'Devotional Renditions', icon: '🎵' },
        { id: 'e17', time: '08:00 PM', name: 'Maha Mangala Aarti', icon: '🕉️' },
        { id: 'e18', time: '09:00 PM', name: 'Maha Anna Prasadam', icon: '🍛' }
      ]
    },
    {
      id: 'day-5',
      dayNumber: 5,
      date: '18 Sep 2026',
      title: 'Lakshmi Ganapathi Homam',
      shortDescription: 'Sacred homam for village peace, prosperity, and auspiciousness.',
      status: 'upcoming',
      announcement: 'Devotees are invited to participate in the sacred Purnahuti at 11:30 AM.',
      events: [
        { id: 'e19', time: '08:00 AM', name: 'Sri Lakshmi Ganapathi Homam', icon: '🔥' },
        { id: 'e20', time: '11:30 AM', name: 'Maha Purnahuti & Ashirvachanam', icon: '🪔' },
        { id: 'e21', time: '07:00 PM', name: 'Grand Evening Aarti', icon: '🕉️' },
        { id: 'e22', time: '08:30 PM', name: 'Prasadam Distribution', icon: '🍛' }
      ]
    },
    {
      id: 'day-6',
      dayNumber: 6,
      date: '19 Sep 2026',
      title: 'Laddu Auction & Cultural Night',
      shortDescription: 'The grand sacred laddu auction and youth cultural festivities.',
      status: 'upcoming',
      announcement: 'The sacred Vinayaka Laddu auction will commence after the 8:00 PM Aarti.',
      events: [
        { id: 'e23', time: '06:00 PM', name: 'Youth Cultural Programs', icon: '🎭' },
        { id: 'e24', time: '08:00 PM', name: 'Maha Aarti', icon: '🕉️' },
        { id: 'e25', time: '08:30 PM', name: 'Sacred Laddu Auction', icon: '🏆' },
        { id: 'e26', time: '09:45 PM', name: 'Special Laddu Prasadam', icon: '🍛' }
      ]
    },
    {
      id: 'day-7',
      dayNumber: 7,
      date: '20 Sep 2026',
      title: 'Maha Nimajjanam & Shobha Yatra',
      shortDescription: 'The grand farewell procession and holy immersion ceremony.',
      status: 'upcoming',
      announcement: 'Procession starts at 2:00 PM from Ramalayam Temple Mandapam to Immersion Ghat.',
      events: [
        { id: 'e27', time: '08:00 AM', name: 'Farewell Maha Puja & Yagnyam', icon: '🪔' },
        { id: 'e28', time: '01:00 PM', name: 'Murthi Utsavam on Chariot', icon: '🛞' },
        { id: 'e29', time: '02:00 PM', name: 'Grand Procession Commences', icon: '🥁' },
        { id: 'e30', time: '06:30 PM', name: 'Sacred Water Immersion (Ghat)', icon: '🌊' }
      ]
    }
  ],
  te: [
    {
      id: 'day-1',
      dayNumber: 1,
      date: '14 సెప్టెం 2026',
      title: 'మూర్తి స్థాపన & ప్రాణప్రతిష్ఠ',
      shortDescription: 'గణనాథుడికి ఘన స్వాగతం మరియు పవిత్ర ప్రాణప్రతిష్ఠ పూజ.',
      status: 'upcoming',
      announcement: '1వ రోజుకు స్వాగతం! ఉదయం 9:00 గంటలకు గణపతి మూర్తి స్థాపన మరియు ప్రాణప్రతిష్ఠ పూజ ప్రారంభమవుతుంది.',
      events: [
        { id: 'e1', time: '06:00 AM', name: 'సుప్రభాతం & మంగళవాయిద్యాలు', icon: '🌅' },
        { id: 'e2', time: '09:00 AM', name: 'మూర్తి స్థాపన & ప్రాణప్రతిష్ఠ పూజ', icon: '🪔' },
        { id: 'e3', time: '07:00 PM', name: 'గణపతి పూజ & మహా దివ్య హారతి', icon: '🕉️' },
        { id: 'e4', time: '08:00 PM', name: 'మహా అన్నప్రసాద వితరణ', icon: '🍛' }
      ]
    },
    {
      id: 'day-2',
      dayNumber: 2,
      date: '15 సెప్టెం 2026',
      title: 'గణపతి పూజ & అర్చన',
      shortDescription: 'ఉదయం వేద పూజలు మరియు సాయంత్రం దివ్య సహస్రనామార్చన.',
      status: 'upcoming',
      announcement: 'ప్రశాంత దర్శనం కోసం భక్తులు క్యూ లైన్లలో వేచి ఉండగలరు.',
      events: [
        { id: 'e5', time: '07:00 AM', name: 'నిత్య గణపతి పూజ', icon: '🪔' },
        { id: 'e6', time: '10:00 AM', name: 'శ్రీ గణేశ సహస్రనామార్చన', icon: '🌸' },
        { id: 'e7', time: '06:00 PM', name: 'సంధ్యా హారతి & భజనలు', icon: '🕉️' },
        { id: 'e8', time: '07:30 PM', name: 'తీర్థ ప్రసాద వితరణ', icon: '🍛' }
      ]
    },
    {
      id: 'day-3',
      dayNumber: 3,
      date: '16 సెప్టెం 2026',
      title: 'భక్తి భజనలు & సంకీర్తనలు',
      shortDescription: 'గ్రామ ప్రజల మరియు మహిళల ఆధ్వర్యంలో భక్తి సంకీర్తనలు.',
      status: 'upcoming',
      announcement: 'సాయంత్రం 7:30 గంటలకు గ్రామస్థుల ప్రత్యేక భక్తి భజన కార్యక్రమం ప్రారంభమవుతుంది.',
      events: [
        { id: 'e9', time: '07:00 AM', name: 'ఉదయపు గణపతి పూజ', icon: '🪔' },
        { id: 'e10', time: '06:30 PM', name: 'దివ్య దీపోత్సవ హారతి', icon: '🕉️' },
        { id: 'e11', time: '07:30 PM', name: 'గ్రామస్థుల భక్తి భజనలు', icon: '🎵' },
        { id: 'e12', time: '09:00 PM', name: 'ప్రసాద వితరణ', icon: '🍛' }
      ]
    },
    {
      id: 'day-4',
      dayNumber: 4,
      date: '17 సెప్టెం 2026',
      title: 'శ్రీ మహాగణపతి విశేష పూజ',
      shortDescription: 'పంచామృతాభిషేకాలు, మంగళ హారతులు మరియు సాంస్కృతిక వేడుకలు.',
      status: 'current',
      announcement: 'నేడు భక్తులందరికీ ప్రత్యేక మహా అన్నదాన సేవ నిర్వహించబడుతుంది.',
      events: [
        { id: 'e13', time: '06:00 AM', name: 'సుప్రభాత సేవ', icon: '🌅' },
        { id: 'e14', time: '07:00 AM', name: 'విశేష అభిషేక సహిత పూజ', icon: '🪔' },
        { id: 'e15', time: '10:00 AM', name: 'భక్తుల సర్వదర్శనం', icon: '🙏' },
        { id: 'e16', time: '06:00 PM', name: 'భక్తి సంకీర్తనలు', icon: '🎵' },
        { id: 'e17', time: '08:00 PM', name: 'మహా మంగళ హారతి', icon: '🕉️' },
        { id: 'e18', time: '09:00 PM', name: 'మహా అన్నప్రసాదం', icon: '🍛' }
      ]
    },
    {
      id: 'day-5',
      dayNumber: 5,
      date: '18 సెప్టెం 2026',
      title: 'లక్ష్మీ గణపతి హోమం',
      shortDescription: 'గ్రామ సుభిక్షం మరియు శాంతి కొరకు పవిత్ర హోమ పూజ.',
      status: 'upcoming',
      announcement: 'ఉదయం 11:30 గంటలకు జరిగే పూర్ణాహుతి కార్యక్రమంలో భక్తులు పాల్గొనవచ్చు.',
      events: [
        { id: 'e19', time: '08:00 AM', name: 'శ్రీ లక్ష్మీ గణపతి హోమం ప్రారంభం', icon: '🔥' },
        { id: 'e20', time: '11:30 AM', name: 'మహా పూర్ణాహుతి & ఆశీర్వచనం', icon: '🪔' },
        { id: 'e21', time: '07:00 PM', name: 'విశేష దీపారాధన హారతి', icon: '🕉️' },
        { id: 'e22', time: '08:30 PM', name: 'హోమ ప్రసాద వితరణ', icon: '🍛' }
      ]
    },
    {
      id: 'day-6',
      dayNumber: 6,
      date: '19 సెప్టెం 2026',
      title: 'లడ్డూ వేలంపాట & సాంస్కృతిక రాత్రి',
      shortDescription: 'పవిత్ర గణపతి లడ్డూ వేలంపాట మరియు యువత సాంస్కృతిక వేడుకలు.',
      status: 'upcoming',
      announcement: 'రాత్రి 8:00 గంటల హారతి అనంతరం పవిత్ర లడ్డూ వేలంపాట నిర్వహించబడుతుంది.',
      events: [
        { id: 'e23', time: '06:00 PM', name: 'సాంస్కృతిక నృత్య ప్రదర్శనలు', icon: '🎭' },
        { id: 'e24', time: '08:00 PM', name: 'మహా దివ్య హారతి', icon: '🕉️' },
        { id: 'e25', time: '08:30 PM', name: 'పవిత్ర గణపతి లడ్డూ వేలంపాట', icon: '🏆' },
        { id: 'e26', time: '09:45 PM', name: 'లడ్డూ మహా ప్రసాద వితరణ', icon: '🍛' }
      ]
    },
    {
      id: 'day-7',
      dayNumber: 7,
      date: '20 సెప్టెం 2026',
      title: 'మహా నిమజ్జనం & శోభాయాత్ర',
      shortDescription: 'గ్రామ పురవీధుల్లో భవ్య శోభాయాత్ర మరియు పవిత్ర జల నిమజ్జనం.',
      status: 'upcoming',
      announcement: 'మధ్యాహ్నం 2:00 గంటలకు రామాలయం మండపం నుండి నిమజ్జన శోభాయాత్ర ప్రారంభమవుతుంది.',
      events: [
        { id: 'e27', time: '08:00 AM', name: 'వీడ్కోలు మహా పూజ & యజ్ఞం', icon: '🪔' },
        { id: 'e28', time: '01:00 PM', name: 'రథంపై గణపతి మూర్తి అధిరోహణ', icon: '🛞' },
        { id: 'e29', time: '02:00 PM', name: 'పురవీధుల్లో శోభాయాత్ర ప్రారంభం', icon: '🥁' },
        { id: 'e30', time: '06:30 PM', name: 'మచిలీపట్నం ఘాట్ వద్ద పవిత్ర నిమజ్జనం', icon: '🌊' }
      ]
    }
  ]
};

// Bilingual Instructions Data
export const translatedInstructions: Record<Language, Array<{ id: string; text: string }>> = {
  en: [
    { id: 'i1', text: 'Follow volunteer instructions and queue lines at all times.' },
    { id: 'i2', text: 'Keep children with guardians, especially during crowded aarti timings.' },
    { id: 'i3', text: 'Use designated vehicle parking areas outside the temple entrance.' },
    { id: 'i4', text: 'Keep the festival surroundings clean and use provided waste bins.' },
    { id: 'i5', text: 'Follow the designated procession route during Maha Nimajjanam.' },
    { id: 'i6', text: 'Maintain sacred decorum and cooperate with organizing committee volunteers.' }
  ],
  te: [
    { id: 'i1', text: 'ఎల్లవేళలా ఉత్సవ వాలంటీర్ల సూచనలను మరియు క్యూ లైన్లను పాటించవలెను.' },
    { id: 'i2', text: 'భక్తుల రద్దీ ఎక్కువగా ఉన్నందున పిల్లలను ఎల్లప్పుడూ తల్లిదండ్రులు కనిపెట్టుకుని ఉండండి.' },
    { id: 'i3', text: 'ఆలయ ప్రవేశం వద్ద కేటాయించిన పార్కింగ్ ప్రదేశాలలో మాత్రమే వాహనాలను ఉంచవలెను.' },
    { id: 'i4', text: 'ఉత్సవ ప్రాంగణాన్ని పరిశుభ్రంగా ఉంచండి, చెత్తబుట్టలను మాత్రమే ఉపయోగించండి.' },
    { id: 'i5', text: 'మహా నిమజ్జన సమయంలో నిర్దేశించిన శోభాయాత్ర మార్గాన్ని మాత్రమే అనుసరించండి.' },
    { id: 'i6', text: 'తోటి భక్తులకు సహకరిస్తూ, పవిత్ర భక్తి భావాన్ని కాపాడవలెను.' }
  ]
};

// Bilingual Committee Data
export const translatedCommittee: Record<Language, Array<{ id: string; role: string; name: string }>> = {
  en: [
    { id: 'c1', role: 'President', name: 'Sri [President Name]' },
    { id: 'c2', role: 'Secretary', name: 'Sri [Secretary Name]' },
    { id: 'c3', role: 'Treasurer', name: 'Sri [Treasurer Name]' },
    { id: 'c4', role: 'Event Coordinator', name: 'Sri [Coordinator Name]' }
  ],
  te: [
    { id: 'c1', role: 'అధ్యక్షులు (President)', name: 'శ్రీ [అధ్యక్షుల పేరు]' },
    { id: 'c2', role: 'కార్యదర్శి (Secretary)', name: 'శ్రీ [కార్యదర్శి పేరు]' },
    { id: 'c3', role: 'కోశాధికారి (Treasurer)', name: 'శ్రీ [కోశాధికారి పేరు]' },
    { id: 'c4', role: 'కార్యక్రమ సమన్వయకర్త (Coordinator)', name: 'శ్రీ [సమన్వయకర్త పేరు]' }
  ]
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
  days: TranslatedDay[];
  instructions: Array<{ id: string; text: string }>;
  committee: Array<{ id: string; role: string; name: string }>;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  days: translatedDaysData.en,
  instructions: translatedInstructions.en,
  committee: translatedCommittee.en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('festival_lang') as Language;
    return saved === 'te' || saved === 'en' ? saved : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('festival_lang', newLang);
    }
  };

  const t = translations[lang] || translations.en;
  const days = translatedDaysData[lang] || translatedDaysData.en;
  const instructions = translatedInstructions[lang] || translatedInstructions.en;
  const committee = translatedCommittee[lang] || translatedCommittee.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, days, instructions, committee }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
