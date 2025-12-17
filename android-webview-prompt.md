# تعليمات محدثة لبناء تطبيق أندرويد (Capacitor) لمتجر الوزير للبصريات

**الموضوع:** تحديث تعليمات بناء تطبيق أندرويد WebView/Capacitor لحل مشكلة الشاشة البيضاء بعد التحديثات الأخيرة.

**موجز المشكلة:**
التطبيق يعمل بنجاح في المتصفح، ولكن عند بنائه باستخدام Capacitor وتثبيته على أندرويد، فإنه يظهر شاشة بيضاء ولا يعمل. المشكلة تكمن في بيئة التشغيل داخل WebView التي لا تتمكن من الوصول إلى متغيرات البيئة (Environment Variables) المطلوبة للاتصال بـ Supabase.

**المتطلبات التقنية الجديدة والأساسية للحل:**

1.  **معالجة متغيرات البيئة (الأهم على الإطلاق):**
    *   مشروع الويب الخاص بنا يستخدم Vite ويعتمد على متغيرات `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` الموجودة في ملف `.env` للاتصال بقاعدة البيانات.
    *   **الحل:** عند بناء نسخة الويب للإنتاج (production build) قبل تجميعها في Capacitor، يجب التأكد من أن عملية البناء تقوم بتضمين هذه المتغيرات بشكل صحيح.
    *   **الخطوات المطلوبة منك:**
        1.  قبل تشغيل أمر `npx cap sync`، قم بإنشاء ملف اسمه `.env.production` في جذر مشروع الويب.
        2.  ضع بداخله المفاتيح المطلوبة بالصيغة التالية (استخدم نفس القيم من ملف `.env` الرئيسي):
            ```
            VITE_SUPABASE_URL=https://faevssqrdjqjipzsrnza.supabase.co
            VITE_SUPABASE_ANON_KEY=eyJhbGciOiJI...
            ```
        3.  قم بتشغيل أمر بناء الويب (`npm run build`). سيقوم Vite تلقائيًا بدمج هذه القيم في الكود النهائي.
        4.  بعد ذلك، قم بتشغيل `npx cap sync` و `npx cap open android` كالمعتاد.

2.  **تحديث سياسة CORS في Supabase:**
    *   اذهب إلى لوحة تحكم مشروع Supabase.
    *   من القائمة، اذهب إلى `Authentication` -> `URL Configuration`.
    *   في قسم `Redirect URLs`، تأكد من إضافة العناوين التالية:
        *   `capacitor://localhost`
        *   `http://localhost`
    *   اذهب إلى `API Settings` -> `CORS origins`.
    *   تأكد من أن `capacitor://localhost` و `http://localhost` مضافان هناك أيضاً.

3.  **فحص أذونات التطبيق (Permissions):**
    *   تأكد من أن `AndroidManifest.xml` وملفات Capacitor config تحتوي على الأذونات اللازمة لاستخدام الكاميرا والميكروفون والإنترنت.
    *   `android/app/src/main/AndroidManifest.xml` يجب أن يحتوي على:
        ```xml
        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-permission android:name="android.permission.RECORD_AUDIO" />
        <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
        ```

4.  **تصحيح الأخطاء (Debugging):**
    *   بعد بناء التطبيق وتشغيله على جهاز حقيقي أو محاكي، استخدم **Android Studio's Logcat** و **Chrome DevTools for remote debugging** لفحص أخطاء JavaScript التي تحدث داخل الـ WebView. هذا سيكشف أي خطأ يمنع التطبيق من العمل. ابحث عن أخطاء مثل "Supabase client is not initialized" أو "fetch failed due to CORS".

**ملخص للمبرمج:**
المشكلة ليست في الواجهة بل في إعدادات بيئة التشغيل. التركيز يجب أن يكون على حقن متغيرات البيئة بشكل صحيح أثناء عملية البناء، وتحديث إعدادات CORS، والتأكد من وجود الأذونات الصحيحة. استخدام أدوات تصحيح الأخطاء عن بعد ضروري لتشخيص أي مشكلة متبقية.
