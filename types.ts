


import React from 'react';

// --- AI CONFIGURATION TYPES ---
export type AIProvider = 'google' | 'openai' | 'deepseek' | 'custom';

export interface ApiConfig {
    provider: AIProvider;
    apiKey: string;
    baseUrl?: string; // Optional for Google/OpenAI, required for Custom/DeepSeek
    modelName?: string; // Optional override (e.g. gpt-4o, deepseek-chat)
    // Cloudinary Config
    cloudinaryCloudName?: string;
    cloudinaryPreset?: string;
}

export interface LensSize {
  diameter: number;
  baseCurve: number;
}

export interface QualityOption {
  id: string;
  name: string;
  priceModifier: number;
  description?: string;
  colorTheme?: string; // For UI styling (e.g., 'cyan', 'gold', 'purple')
  active?: boolean; // New: Controls visibility on the product page
}

export interface DurationOption {
  id: string;
  name: string;
  priceModifier: number;
  colorTheme: string;
}

export interface Product {
  id: number;
  name:string;
  price: number;
  imageUrls: string[]; 
  overlayUrl?: string;
  modelUrl?: string;
  type: 'glasses' | 'lenses';
  category: 'sunglasses' | 'medical' | 'contact' | 'oppen';
  gender?: 'men' | 'women' | 'kids';
  description: string;
  lensOptions?: LensSize[];
  qualityOptions?: QualityOption[]; // New field for tiers (Star, Premium, etc.)
  durationOptions?: DurationOption[]; // New field for Contact Lens duration
  color?: string;
  frameSize?: string;
  salesCount?: number;
  stock?: number; // New: Inventory Tracking
  created_at?: string; // New: For Welcome Digest
}

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
  selectedLensSize?: LensSize;
  selectedQuality?: QualityOption; // Store selected tier
  selectedDuration?: DurationOption; // Store selected duration
  isSubscription?: boolean; // New: Auto-refill subscription
  giftMessage?: string; // New: Holographic Gift Message
  giftRecipientName?: string;
  isPrize?: boolean; // NEW: Flag for items won in wheel
}

export type Page = 'home' | 'products' | 'try-on' | 'doctors' | 'compare' | 'productDetail' | 'appointment' | 'wishlist' | 'styleAdvisor' | 'prescriptionAnalyzer' | 'googleStudio' | 'offers' | 'colorAnalyzer' | 'styleWall' | 'loyaltyHub' | 'eyeCareCorner' | 'globalChat' | 'liveShopping' | 'eyeYoga' | 'eyeCinema' | 'wazirAuction' | 'groupTryOn' | 'moodShopper' | 'aiSizeAdvisor' | 'lensTracker' | 'visionScreener' | 'styleBattle' | 'wazirVault' | 'lookbook' | 'openLenses' | 'wazirArcade' | 'wheel' | 'vipClub';

// FIX: Added 'contact' to MainCategory
export type MainCategory = 'all' | 'men' | 'women' | 'kids' | 'lenses' | 'oppen' | 'contact';
export type SubCategory = 'all' | 'sunglasses' | 'medical';

export interface Review {
  id: string;
  productId: number;
  reviewerName: string;
  rating: number;
  reviewText: string;
  date: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  address: string;
  phone: string;
}

export type SearchResult = { type: 'product'; data: Product } | { type: 'doctor'; data: Doctor };

export interface Prescription {
  sph: string;
  cyl: string;
  axis: string;
}

export interface PrescriptionResult {
  od: Prescription;
  os: Prescription;
}

export interface PrescriptionInput {
    od: Prescription;
    os: Prescription;
    add: { od: string; os: string };
    patientName: string;
    patientAge: string;
    lifestyleDescription?: string;
}

export interface PrescriptionAnalysisResult {
    explanation: string;
    visionProblems: string[];
    visionAcuityEstimation?: string;
    lensTypeRecommendation: string;
    lensMaterialRecommendation: string;
    lensCoatingRecommendation: string;
    lifestyleConsiderations: string;
    recommendedProductIds?: number[]; // AI can suggest products
}

// NEW: AI Size Advisor Types
export interface FrameSizeInput {
    type: 'manual' | 'description' | 'ocr';
    lensWidth?: number;
    bridgeWidth?: number;
    templeLength?: number;
    description?: string;
    ocrText?: string;
}

export interface FrameSizeAnalysisResult {
    analysis: string;
    recommendations: {
        productId: number;
        reason: string;
    }[];
}


export interface ComparisonAnalysisResult {
    summary: string;
    bestFor: { productId: number; reason: string }[];
    differences: string[];
}

// --- NEW TYPES FOR AUTH & DATABASE ---

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  customer_name?: string;
  customer_phone?: string;
  user_id?: string;
  receipt_url?: string; // Link to uploaded receipt image
  coupon_code?: string;
  discount?: number;
  tracking_number?: string | null;
  shipping_company?: string | null;
  down_payment?: number;
  remaining_amount?: number;
}

// NEW: UserCoupon interface
export interface UserCoupon {
    code: string;
    discount: number;
    used: boolean;
}

// NEW: Contact Lens Tracker
export interface LensTracker {
    id: string;
    brand_name: string;
    open_date: string;
    duration_days: number; // 30, 90, 180, 365
    eye_side: 'both' | 'left' | 'right';
    expiry_date: string; // Calculated
    active: boolean;
}

// NEW: Saved Look (Smart Mirror)
export interface SavedLook {
    id: string;
    image_url: string;
    created_at: string;
    notes?: string;
}

// NEW: Wheel Prize Won
export interface WheelPrizeWon {
    id: string;
    label: string;
    type: 'points' | 'product' | 'coupon' | 'loss';
    value: string | number; // Product ID, Points amount, or Coupon Code
    date_won: string;
    is_claimed: boolean;
}

// NEW: Address Type
export interface Address {
    id: string;
    label: string;
    street: string;
    city: string;
    phone: string;
    isDefault: boolean;
}

export interface User {
  id: string; // Now the user's phone number
  name: string;
  phone: string;
  orders: Order[];
  wishlist: number[]; // Store Product IDs
  points: number;
  cart_data?: CartItem[]; // NEW: For syncing cart across devices
  coupons?: UserCoupon[]; // NEW: Array to store user-specific coupons
  addresses?: Address[]; // NEW: For shipping addresses
  last_played_challenge?: string; // New field for Eye Spy Challenge
  vip_status?: 'pending' | 'active' | 'rejected' | null;
  vip_rejection_reason?: string | null;
  vip_trial_ends_at?: string | null; // NEW: For temporary VIP
  ai_access_enabled?: boolean;
  last_login?: string; // New: For Welcome Digest
  // NEW LEGENDARY FIELDS
  lens_trackers?: LensTracker[];
  saved_looks?: SavedLook[];
  wheel_winnings?: WheelPrizeWon[]; // NEW: Store won items
  available_spins?: number; // NEW: Track gifted spins
  referral_code?: string; // NEW: Referral Code
  referred_by?: string; // NEW: Referred By
}

// NEW: VIP Code type
export interface VipCode {
    id: string;
    code: string;
    duration_days: number;
    is_claimed: boolean;
    claimed_by: string | null;
    created_at: string;
    claimed_by_name?: string; // For admin view
}

export interface Notification {
    id?: string;
    title: string;
    body: string;
    target_user_id?: string; // For targeted notifications
    created_at?: string;
    is_read?: boolean;
    action_type?: string; // NEW: To handle clicks (e.g., 'open_wheel')
}

// --- ADMIN AI STUDIO TYPES ---
export interface AdminCommand {
    action: 'add_product' | 'update_price' | 'delete_product' | 'apply_discount' | 'unknown';
    data: any;
    message: string;
}

// NEW: Arcade Game Type
export interface ArcadeGame {
    id: string;
    title: string;
    url: string;
}

// --- FULL STORE DATA SYNC TYPE ---
export interface LoyaltyConfig {
    points_per_egp: number;
    points_for_discount: number;
    discount_percentage: number;
    vip_discount_percentage: number;
    vip_points_multiplier: number;
}
export interface CategoryMedia {
    men: string;
    women: string;
    kids: string;
}
export interface LiveStreamStatus {
    status: 'active' | 'inactive';
    started_at?: string;
    url?: string; // Added this property
}
export interface StoreData {
    products: Product[];
    flashDealIds: number[];
    newArrivalIds: number[];
    lastUpdated: number;
    pointsRate?: number; // Legacy, can be removed later
    loyaltyConfig?: LoyaltyConfig;
    global_ai_enabled?: boolean;
    liveStreamStatus?: LiveStreamStatus; // Added to StoreData for sync
}

// --- COUPONS ---
export interface Coupon {
    id: string;
    code: string;
    discount_percentage: number;
    is_active: boolean;
    expiry_date?: string;
    created_at?: string;
}

// --- BANNERS ---
export interface Banner {
    id: string;
    title: string;
    image_url: string;
    link?: string;
    is_active: boolean;
    sort_order: number;
    created_at?: string;
}

// --- STYLE WALL ---
export interface StyleWallPost {
    id: string;
    user_id: string;
    product_id: number;
    image_url: string;
    created_at: string;
    like_count: number;
    user_name: string;
    product_name: string;
    product_image_url: string;
    liked_by_user: boolean;
    challenge_id?: string; // Link to a challenge
    is_winner?: boolean; // To display a badge
}

export interface StyleChallenge {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date?: string;
    is_active: boolean;
    winners?: { user_id: string; post_id: string; user_name: string }[];
}

export interface UserActivity {
    id?: string;
    user_id: string;
    activity_type: 'view_product' | 'add_to_wishlist' | 'purchase';
    product_id: number;
    timestamp?: string;
}

// --- DYNAMIC ANIMATIONS ---
export interface AnimationSettings {
  animatedTextEnabled: boolean;
  animatedTextContent: string;
  animatedTextAnimation: 'fly-across' | 'bounce-horizontal';
  animatedTextEffect: 'neon-glow-cyan' | 'neon-glow-purple' | 'neon-glow-pink' | 'neon-glow-red' | 'neon-glow-blue' | 'neon-glow-gold' | 'neon-glow-green' | 'rgb-glow' | 'led-glow-header';
  overlayVideoEnabled: boolean;
  overlayVideoUrl: string;
  overlayVideoWidth: number;
  overlayVideoHeight: number;
  overlayVideoX: number; // percentage
  overlayVideoY: number; // percentage
}

// --- GLOBAL CHAT ---
export interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_name: string;
  user_is_vip: boolean;
}

// --- PRIVATE MESSAGES (UPDATED) ---
export interface PrivateMessage {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string; // Text content or description for media
    type: 'text' | 'image' | 'video' | 'audio' | 'call_signal';
    media_url?: string; // For images, videos, audio - CHANGED to match DB schema (snake_case)
    reactions?: { [userId: string]: string }; // Map of userId -> emoji
    is_read: boolean;
    created_at: string;
    call_data?: any; // For WebRTC signaling
}

// --- WAZIR AUCTION ---
export interface Auction {
    id: string;
    product_id: number;
    start_price: number;
    current_price: number;
    floor_price: number;
    decay_amount: number;
    decay_interval: number; // in seconds
    start_time: string;
    end_time: string | null;
    status: 'active' | 'sold' | 'expired';
    winner_id: string | null;
}

// --- VIP REQUESTS ---
export interface VipRequest {
    id: string;
    user_id: string;
    customer_name: string;
    phone: string;
    receipt_url: string;
    status: 'pending' | 'approved' | 'rejected';
    rejection_reason?: string;
    created_at: string;
}

// --- DYNAMIC MENU (NEW) ---
export interface DynamicMenuItem {
    id: string;
    label: string;
    icon: string; // Icon Name from IconMap
    action_type: 'navigate' | 'filter_category';
    action_value: string;
    sort_order: number;
    is_sub_item: boolean;
    color_class?: string;
}

// FIX: Add missing DynamicFloatingButton type.
export interface DynamicFloatingButton {
    enabled: boolean;
    label: string;
    icon: string;
    color: string;
    position: 'bottom_left' | 'bottom_right';
    animation: 'pulse' | 'bounce' | 'spin' | 'none';
    action_type: string;
    action_value: string;
}

// --- NEW UI SETTINGS ---
export interface MarqueeSettings {
    enabled: boolean;
    text: string;
    color: string;
    speed: number;
    text_enabled?: boolean;
}

export type HomePageSection = 'flash_deals' | 'style_champions' | 'new_arrivals' | 'best_sellers' | 'ai_recommendations' | 'categories' | 'services' | 'doctors';

// --- NEW: Dynamic Element Styling ---
export interface ElementStyle {
    label: string;
    color: 'cyan' | 'gold' | 'purple' | 'red' | 'green' | 'blue';
    icon: string; // Icon name
    animation: 'none' | 'pulse' | 'bounce' | 'shake';
    visible: boolean;
}

export interface UISettings {
    theme: 'holographic_blue' | 'royal_gold' | 'cyber_pink';
    primary_neon_color: string;
    section_order: HomePageSection[];
    section_visibility: {
        [key in HomePageSection]?: boolean;
    };
    fab_settings: DynamicFloatingButton;
    effects: {
        background_grid_enabled: boolean;
    };
    marquee_settings: MarqueeSettings;
    header_nav_links: {
      men: string;
      women: string;
      kids: string;
      contact: string;
      oppen: string;
    };
    // NEW: Granular button customization
    custom_elements?: {
        [key: string]: ElementStyle; // keys: 'men_btn', 'women_btn', 'kids_btn', etc.
    };
    // NEW: Live Wallpaper
    live_wallpaper?: {
        enabled: boolean;
        url: string | null;
    };
}

// --- SERVER DRIVEN UI CONFIG (NEW) ---
export interface DynamicWidgetConfig {
    id: string;
    enabled: boolean;
    type: 'banner' | 'card' | 'modal';
    
    // Properties as Numbers/Values
    widthPercent: number; // 0-100
    heightPx: number;
    borderRadius: number;
    borderWidth: number;
    opacity: number; // 0-1
    padding: number;
    fontSize: number;
    
    // Properties as Strings (Hex/Content)
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    shadowColor: string;
    
    contentTitle: string;
    contentBody: string;
    
    // Animation
    animationSpeed: number; // Seconds
    animationType: 'pulse' | 'slide' | 'fade' | 'none';
}

// --- AD SETTINGS (New) ---
export interface AdSettings {
    enabled: boolean;
    message: string;
    timestamp: number;
}

// --- DIGEST SETTINGS (NEW) ---
export interface DigestSettings {
    enabled: boolean;
    title: string;
    content: string; // HTML or Markdown supported
    timestamp: number;
}

// --- CELEBRATION SETTINGS (NEW) ---
export type AssetVariant = 'classic' | 'modern' | 'neon' | 'star' | 'crescent' | 'long' | 'short' | 'gold' | 'cyan' | 'pink' | 'red' | 'purple' | 'blue' | 'burst';
export type AssetType = 'lantern' | 'sheep' | 'lights' | 'star' | 'crescent' | 'mosque' | 'fireworks' | 'balloon' | 'heart' | 'text' | 'media' | 'board';
export type AnimationType = 'swing' | 'bounce' | 'pulse' | 'spin' | 'float' | 'flash' | 'rise';

export interface CelebrationItem {
    id: string;
    type: AssetType;
    variant: AssetVariant;
    x: number; // percentage
    y: number; // percentage
    scale: number;
    animation: AnimationType;
    text?: string; // Content for text decoration
    textLines?: string[]; // For multi-line boards
    color?: string; // For text/custom coloring
    mediaUrl?: string; // URL for uploaded video/image
    mediaMimeType?: string; // MIME type for media
    page?: string; // Specific page ID (e.g. 'home', 'wazirAuction'). If undefined, assume global or home.
}

export interface CelebrationSettings {
    enabled: boolean; // Global toggle
    items: CelebrationItem[];
}

// --- HOLOGRAPHIC CARD CONFIG ---
export interface HoloCardConfig {
    id: string; // Unique ID to track dismissals
    title: string;
    body: string;
    mediaUrl?: string; // Optional image/video URL
    mediaType?: 'image' | 'video';
    active: boolean;
    timestamp: number;
}

// --- SCRATCH CARD CONFIG (NEW) ---
export interface ScratchCardConfig {
    id: string; // To track "once per session" logic
    title: string;
    hiddenText: string;
    prizeType: 'coupon' | 'points';
    prizeValue: string | number; // Coupon Code OR Point Amount
    discountPercentage?: number; // Explicit discount for coupons
    active: boolean;
    timestamp: number;
}

// --- WHEEL OF FORTUNE CONFIG (NEW) ---
export interface WheelItem {
    id: string;
    label: string;
    type: 'points' | 'product' | 'coupon' | 'loss';
    value: string | number; // Product ID, Points amount, or Coupon Code
    color: string;
    probability: number; // Weight for winning
}

export interface WheelConfig {
    id: string; // To track if user has spun this version
    active: boolean;
    items: WheelItem[];
    timestamp: number;
    accessLevel: 'public' | 'vip'; // NEW: Access Control
    vipMonthlyRewards?: { // NEW: Automated Rewards
        points: number;
        spins: number;
        couponDiscount: number;
        active: boolean;
    };
    customBoxUrl?: string; // NEW: Custom 3D Model URL for the Loot Box
    boxTextureUrl?: string; // NEW: Custom Texture URL for the Loot Box Wrapping
}

// --- FEATURE GATING CONFIG (NEW) ---
export type FeatureAccess = 'public' | 'vip';

export interface FeatureGateConfig {
    [featureKey: string]: FeatureAccess;
}

// --- FEATURED ALERT CONFIG (NEW) ---
export type AlertType = 'new_arrival' | 'flash_deal' | 'discount' | 'auction';

export interface FeaturedAlertConfig {
    id: string; // Unique ID to track dismissals
    productId: number;
    type: AlertType;
    active: boolean;
    timestamp: number;
}


// --- GLOBAL JSX AUGMENTATION ---
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        poster?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        'shadow-intensity'?: string | number;
        style?: React.CSSProperties;
      };
      primitive: any;
      ambientLight: any;
      directionalLight: any;
      group: any;
      mesh: any;
      pointLight: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      meshPhysicalMaterial: any; // Added for Wazir3DLogo
      octahedronGeometry: any;
      spotLight: any;
      torusGeometry: any;
      sphereGeometry: any;
      cylinderGeometry: any; // Added for Prize3D.tsx

      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
      h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
      li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
      textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
      select: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
      option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
      svg: React.SVGProps<SVGSVGElement>;
      path: React.SVGProps<SVGPathElement>;
      circle: React.SVGProps<SVGCircleElement>;
      defs: React.SVGProps<SVGDefsElement>;
      linearGradient: React.SVGProps<SVGLinearGradientElement>;
      radialGradient: React.SVGProps<SVGRadialGradientElement>; // Added radialGradient
      stop: React.SVGProps<SVGStopElement>;
      line: React.SVGProps<SVGLineElement>;
      animate: React.SVGProps<SVGElement>;
      filter: React.SVGProps<SVGFilterElement>;
      feGaussianBlur: React.SVGProps<SVGFEGaussianBlurElement>;
      feMerge: React.SVGProps<SVGFEMergeElement>;
      feMergeNode: React.SVGProps<SVGFEMergeNodeElement>;
      g: React.SVGProps<SVGGElement>;
      text: React.SVGProps<SVGTextElement>;
      animateTransform: React.SVGProps<SVGElement>;
      polygon: React.SVGProps<SVGPolygonElement>;
      ellipse: React.SVGProps<SVGEllipseElement>;

      blockquote: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
      a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
      aside: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      video: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
      // Add audio here
      audio: React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
      br: React.DetailedHTMLProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
      strong: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      em: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
      table: React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
      tbody: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
      thead: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
      tr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
      td: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>;
      th: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>;
      section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      h5: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      canvas: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
      pattern: React.SVGProps<SVGPatternElement>;
      rect: React.SVGProps<SVGRectElement>;
      style: React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
      
      // Added missing SVG elements
      feTurbulence: React.SVGProps<SVGFETurbulenceElement>;
      feDiffuseLighting: React.SVGProps<SVGFEDiffuseLightingElement>;
      feDistantLight: React.SVGProps<SVGFEDistantLightElement>;
      feComposite: React.SVGProps<SVGFECompositeElement>;
      foreignObject: React.SVGProps<SVGForeignObjectElement>;

      // Add embed for Ruffle.js
      embed: React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
      
      // Added 'pre'
      pre: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
      
      // Added 'iframe'
      iframe: React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
    }
  }
}