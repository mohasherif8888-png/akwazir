/**
 * ملاحظة للمستخدم:
 * هذا الملف يقوم بإعداد هيكل مجلدات الصور لتطبيقك.
 * لقد قمنا بإضافة الصور تلقائيًا إلى المجلدات المناسبة في `public/images`.
 * المسارات أدناه تتوافق مع الصور الجديدة التي تمت إضافتها.
 */

// --- Base Paths ---
const PRODUCT_IMG_PATH = '/images/products';
const OVERLAY_IMG_PATH = '/images/overlays';
const PAGE_IMG_PATH = '/images/pages';

// --- Page Images ---
export const page_images = {
  hero: `${PAGE_IMG_PATH}/home/hero.jpg`,
  category_men: `${PAGE_IMG_PATH}/home/category-men.jpg`,
  category_women: `${PAGE_IMG_PATH}/home/category-women.jpg`,
  category_kids: `${PAGE_IMG_PATH}/home/category-kids.jpg`,
};


// --- Product Images ---
export const men_sunglasses_paths = [
  `${PRODUCT_IMG_PATH}/men-sunglasses/1.jpg`,
  `${PRODUCT_IMG_PATH}/men-sunglasses/2.jpg`,
  `${PRODUCT_IMG_PATH}/men-sunglasses/3.jpg`,
  `${PRODUCT_IMG_PATH}/men-sunglasses/4.jpg`,
  `${PRODUCT_IMG_PATH}/men-sunglasses/5.jpg`,
];
export const men_medical_paths = [
  `${PRODUCT_IMG_PATH}/men-medical/1.jpg`,
  `${PRODUCT_IMG_PATH}/men-medical/2.jpg`,
  `${PRODUCT_IMG_PATH}/men-medical/3.jpg`,
  `${PRODUCT_IMG_PATH}/men-medical/4.jpg`,
  `${PRODUCT_IMG_PATH}/men-medical/5.jpg`,
];
export const women_sunglasses_paths = [
  `${PRODUCT_IMG_PATH}/women-sunglasses/1.jpg`,
  `${PRODUCT_IMG_PATH}/women-sunglasses/2.jpg`,
  `${PRODUCT_IMG_PATH}/women-sunglasses/3.jpg`,
  `${PRODUCT_IMG_PATH}/women-sunglasses/4.jpg`,
  `${PRODUCT_IMG_PATH}/women-sunglasses/5.jpg`,
];
export const women_medical_paths = [
  `${PRODUCT_IMG_PATH}/women-medical/1.jpg`,
  `${PRODUCT_IMG_PATH}/women-medical/2.jpg`,
  `${PRODUCT_IMG_PATH}/women-medical/3.jpg`,
  `${PRODUCT_IMG_PATH}/women-medical/4.jpg`,
  `${PRODUCT_IMG_PATH}/women-medical/5.jpg`,
];
export const kids_sunglasses_paths = [
  `${PRODUCT_IMG_PATH}/kids-sunglasses/1.jpg`,
  `${PRODUCT_IMG_PATH}/kids-sunglasses/2.jpg`,
  `${PRODUCT_IMG_PATH}/kids-sunglasses/3.jpg`,
];
export const kids_medical_paths = [
  `${PRODUCT_IMG_PATH}/kids-medical/1.jpg`,
  `${PRODUCT_IMG_PATH}/kids-medical/2.jpg`,
  `${PRODUCT_IMG_PATH}/kids-medical/3.jpg`,
];
export const lenses_paths = [
  `${PRODUCT_IMG_PATH}/lenses/1.jpg`,
  `${PRODUCT_IMG_PATH}/lenses/2.jpg`,
  `${PRODUCT_IMG_PATH}/lenses/3.jpg`,
  `${PRODUCT_IMG_PATH}/lenses/4.jpg`,
];

// --- Virtual Try-On Overlay Images ---
export const men_sunglasses_overlays = [
  `${OVERLAY_IMG_PATH}/men-sunglasses/1.png`,
  `${OVERLAY_IMG_PATH}/men-sunglasses/2.png`,
  `${OVERLAY_IMG_PATH}/men-sunglasses/3.png`,
];
export const men_medical_overlays = [
  `${OVERLAY_IMG_PATH}/men-medical/1.png`,
  `${OVERLAY_IMG_PATH}/men-medical/2.png`,
  `${OVERLAY_IMG_PATH}/men-medical/3.png`,
];
export const women_sunglasses_overlays = [
  `${OVERLAY_IMG_PATH}/women-sunglasses/1.png`,
  `${OVERLAY_IMG_PATH}/women-sunglasses/2.png`,
  `${OVERLAY_IMG_PATH}/women-sunglasses/3.png`,
];
export const women_medical_overlays = [
  `${OVERLAY_IMG_PATH}/women-medical/1.png`,
  `${OVERLAY_IMG_PATH}/women-medical/2.png`,
  `${OVERLAY_IMG_PATH}/women-medical/3.png`,
];
export const kids_overlays = [
  `${OVERLAY_IMG_PATH}/kids/1.png`,
  `${OVERLAY_IMG_PATH}/kids/2.png`,
];

// Overlays for specific, uniquely shaped glasses
export const special_overlays = {
    clubmaster: `${OVERLAY_IMG_PATH}/special/clubmaster.png`,
    classic_round: `${OVERLAY_IMG_PATH}/special/classic-round.png`,
    cat_eye: `${OVERLAY_IMG_PATH}/special/cat-eye.png`,
    hexagonal: `${OVERLAY_IMG_PATH}/special/hexagonal.png`,
    sport_wrap: `${OVERLAY_IMG_PATH}/special/sport-wrap.png`,
    blue_aviator: `${OVERLAY_IMG_PATH}/special/blue-aviator.png`,
    browline: `${OVERLAY_IMG_PATH}/special/browline.png`,
    clear_frame: `${OVERLAY_IMG_PATH}/special/clear-frame.png`,
    heart_shape: `${OVERLAY_IMG_PATH}/special/heart-shape.png`,
    wayfarer: `${OVERLAY_IMG_PATH}/special/wayfarer.png`,
    thin_metal: `${OVERLAY_IMG_PATH}/special/thin-metal.png`,
};
