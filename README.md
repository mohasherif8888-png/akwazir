# Al Wazir Optics - Project Structure

Welcome to the Al Wazir Optics project! This file explains how to manage the images for the website.

## Image Folder Structure

All images for the website are located in the `public/images` directory. This directory is organized into subfolders to keep everything tidy. When you receive the project files, this structure will already be created for you.

Here is an overview of the structure:

```
public/
└── images/
    ├── pages/
    │   └── home/  (Images for the home page, like the main banner)
    │
    ├── products/
    │   ├── men-sunglasses/
    │   ├── men-medical/
    │   ├── women-sunglasses/
    │   ├── women-medical/
    │   ├── kids-sunglasses/
    │   ├── kids-medical/
    │   └── lenses/
    │
    └── overlays/
        ├── men-sunglasses/
        ├── men-medical/
        ├── women-sunglasses/
        ├── women-medical/
        ├── kids/
        └── special/
```

### How to Add Images

1.  **Navigate to the correct folder:** Based on the type of image you want to add, go to the corresponding folder inside `public/images`.
    *   For a new men's sunglasses product, go to `public/images/products/men-sunglasses/`.
    *   For a virtual try-on overlay for women's medical glasses, go to `public/images/overlays/women-medical/`.

2.  **Add your image files:** Place your `.jpg` or `.png` image files directly into the folder.

The website is already configured to find and display these images automatically. You do not need to change any code.

---

## هيكل مجلدات الصور

أهلاً بك في مشروع الوزير للبصريات! هذا الملف يشرح كيفية إدارة صور الموقع.

### تنظيم المجلدات

جميع صور الموقع موجودة في مجلد `public/images`. هذا المجلد مقسم إلى مجلدات فرعية للحفاظ على التنظيم. عند استلامك لملفات المشروع، ستجد هذا الهيكل قد تم إنشاؤه لك بالفعل.

هنا نظرة عامة على الهيكل:

```
public/
└── images/
    ├── pages/
    │   └── home/  (صور الصفحة الرئيسية، مثل البانر الرئيسي)
    │
    ├── products/
    │   ├── men-sunglasses/ (صور نظارات شمسية رجالي)
    │   ├── men-medical/    (صور نظارات طبية رجالي)
    │   ├── women-sunglasses/
    │   ├── women-medical/
    │   ├── kids-sunglasses/
    │   ├── kids-medical/
    │   └── lenses/         (صور العدسات اللاصقة)
    │
    └── overlays/           (صور التجربة الافتراضية)
        ├── men-sunglasses/
        ├── men-medical/
        ├── women-sunglasses/
        ├── women-medical/
        ├── kids/
        └── special/
```

### كيفية إضافة الصور

١. **اذهب إلى المجلد الصحيح:** بناءً على نوع الصورة التي تريد إضافتها، اذهب إلى المجلد المناسب داخل `public/images`.
    *   لإضافة منتج نظارة شمسية رجالي جديد، اذهب إلى `public/images/products/men-sunglasses/`.
    *   لإضافة صورة تجربة افتراضية لنظارة طبية نسائي، اذهب إلى `public/images/overlays/women-medical/`.

٢. **أضف ملفات الصور:** ضع ملفات الصور الخاصة بك (بامتداد `.jpg` أو `.png`) مباشرة في المجلد.

الموقع مبرمج بالفعل للبحث عن الصور في هذه المجلدات وعرضها تلقائيًا. لا تحتاج إلى تعديل أي كود.