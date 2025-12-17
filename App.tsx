


import React, { useState, useEffect, Suspense, lazy } from 'react';
import { products as initialProducts, doctors as initialDoctors } from './data.ts';
import { User, Product, Doctor, Page, LensSize, QualityOption, DurationOption, LoyaltyConfig, UISettings, MainCategory, CelebrationSettings } from './types.ts';
import { authService } from './services/authService.ts';
import { syncService } from './services/syncService.ts';
import { useAppStore } from './store/useAppStore.ts';

// Components
import Header from './components/Header.tsx';
import MobileBottomNav from './components/MobileBottomNav.tsx';
import HomePage from './components/HomePage.tsx';
import ProductCard from './components/ProductCard.tsx';
import ProductDetailPage from './components/ProductDetailPage.tsx';
import DoctorsPage from './components/DoctorsPage.tsx';
import AppointmentPage from './components/AppointmentPage.tsx';
import WishlistPage from './components/WishlistPage.tsx';
import StyleAdvisor from './components/StyleAdvisor.tsx';
import PrescriptionAnalyzer from './components/PrescriptionAnalyzer.tsx';
import GoogleStudio from './components/GoogleStudio.tsx';
import ColorAnalyzer from './components/ColorAnalyzer.tsx';
import StyleWallPage from './components/StyleWallPage.tsx';
import LoyaltyHub from './components/LoyaltyHub.tsx';
import EyeCareCorner from './components/EyeCareCorner.tsx';
import GlobalChat from './components/GlobalChat.tsx';
import LiveShoppingPage from './components/LiveShoppingPage.tsx';
import EyeCinemaPage from './components/EyeCinemaPage.tsx';
import WazirAuctionPage from './components/WazirAuctionPage.tsx';
import GroupTryOnPage from './components/GroupTryOnPage.tsx';
import MoodShopperPage from './components/MoodShopperPage.tsx';
import AISizeAdvisorPage from './components/AISizeAdvisorPage.tsx';
import OpenLensesPage from './components/OpenLensesPage.tsx';
import WazirArcadePage from './components/WazirArcadePage.tsx';
import WheelPage from './components/WheelPage.tsx';
import VipClubPage from './components/VipClubPage.tsx';
import ComparePage from './components/ComparePage.tsx';
import VirtualTryOn from './components/VirtualTryOn.tsx';
import Marquee from './components/Marquee.tsx';
import FilterSidebar from './components/FilterSidebar.tsx';
import SideMenu from './components/SideMenu.tsx';
import ServerDrivenWidget from './components/ServerDrivenWidget.tsx'; // NEW
import AdminDynamicUiManager from './components/AdminDynamicUiManager.tsx'; // NEW

// Modals & Overlays
import CartModal from './components/CartModal.tsx';
import LoginModal from './components/LoginModal.tsx';
import AdminLoginModal from './components/AdminLoginModal.tsx';
import UserProfileModal from './components/UserProfileModal.tsx';
import NotificationBanner from './components/NotificationBanner.tsx';
import IncomingTransmissionModal from './components/IncomingTransmissionModal.tsx';
import WelcomeDigestModal from './components/WelcomeDigestModal.tsx';
import UpdateManagerModal from './components/UpdateManagerModal.tsx';
import AdminToolbar from './components/AdminToolbar.tsx';
import PhoneFrame from './components/PhoneFrame.tsx';
import HolographicCardViewer from './components/HolographicCardViewer.tsx';
import ScratchCardViewer from './components/ScratchCardViewer.tsx';
import PermissionOnboardingModal from './components/PermissionOnboardingModal.tsx';
import CelebrationOverlay from './components/CelebrationOverlay.tsx';
import BackToTopButton from './components/BackToTopButton.tsx';
import PaymentModal from './components/PaymentModal.tsx';
import ComparisonTray from './components/ComparisonTray.tsx';
import OrderTrackingModal from './components/OrderTrackingModal.tsx';
import SystemUtilsModal from './components/SystemUtilsModal.tsx';
import FullDashboardModal from './components/FullDashboardModal.tsx';
import CustomFAB from './components/CustomFAB.tsx';
import PrivateChatWindow from './components/PrivateChatWindow.tsx';

// Loading Spinner for Suspense
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-transparent text-cyan-500">
    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
    <p className="animate-pulse font-bold">جاري التحميل...</p>
  </div>
);

export const App = () => {
  // Store
  const { 
    cart, addToCart, removeFromCart, updateCartQuantity, clearCart, 
    wishlist, addToWishlist, removeFromWishlist, 
    user, setUser,
    isCartOpen, toggleCart,
    isSideMenuOpen, toggleSideMenu,
    isFilterSidebarOpen, toggleFilterSidebar,
    featureGates, setFeatureGates
  } = useAppStore();

  // State
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [doctors] = useState<Doctor[]>(initialDoctors);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  // Auth & Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // UI State
  const [notification, setNotification] = useState<{ message: string; type: 'cart' | 'wishlist' | 'alert' } | null>(null);
  const [incomingMessage, setIncomingMessage] = useState<{ senderName: string, lastMessage: string, senderId: string } | null>(null);
  const [activeChatTarget, setActiveChatTarget] = useState<string | null>(null);
  const [isDigestOpen, setIsDigestOpen] = useState(false);
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [uiSettings, setUiSettings] = useState<UISettings | null>(null);
  const [celebrationSettings, setCelebrationSettings] = useState<CelebrationSettings | null>(null);
  const [isCelebrationEditing, setIsCelebrationEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAutoSync, setIsAutoSync] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState<{ enabled: boolean; version: string; message: string; downloadUrl?: string } | null>(null);
  
  // Modals State
  const [isUpdateManagerOpen, setIsUpdateManagerOpen] = useState(false);
  const [isSystemUtilsOpen, setIsSystemUtilsOpen] = useState(false);
  const [isFullDashboardOpen, setIsFullDashboardOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isVirtualTryOnOpen, setIsVirtualTryOnOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isDynamicUiManagerOpen, setIsDynamicUiManagerOpen] = useState(false); // NEW
  
  // Data State
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<MainCategory>('all');
  const [loyaltyConfig, setLoyaltyConfig] = useState<LoyaltyConfig>({ points_per_egp: 1, points_for_discount: 1000, discount_percentage: 10, vip_discount_percentage: 15, vip_points_multiplier: 2 });
  const [flashDealIds, setFlashDealIds] = useState<Set<number>>(new Set());
  const [newProductIds, setNewProductIds] = useState<Set<number>>(new Set());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFrameSizes, setSelectedFrameSizes] = useState<string[]>([]);
  
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string, discount: number } | null>(null);
  const [aiEnabled, setAiEnabled] = useState(true);

  // Load initial data
  useEffect(() => {
    const init = async () => {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
            const profile = await authService.getProfile(storedUser.id);
            setUser(profile);
            
            // Initial check for unread messages on app load
            if (profile) {
                 const unreadMsg = await syncService.fetchUnreadMessages(profile.id);
                 if (unreadMsg) {
                     setIncomingMessage(unreadMsg);
                 } else {
                     // If no unread messages, maybe show digest
                     // setIsDigestOpen(true); // Can uncomment if we want auto digest
                 }
            }
        }
        
        const data = await syncService.fetchData();
        if (data) {
            setProducts(data.products);
            setFilteredProducts(data.products);
            setFlashDealIds(new Set(data.flashDealIds));
            setNewProductIds(new Set(data.newArrivalIds));
            if(data.loyaltyConfig) setLoyaltyConfig(data.loyaltyConfig);
            setAiEnabled(data.global_ai_enabled !== false);
        }

        const ui = await syncService.fetchUiSettings();
        setUiSettings(ui);

        const celebrations = await syncService.fetchCelebrationSettings();
        setCelebrationSettings(celebrations);
        
        const gates = await syncService.fetchFeatureGates();
        setFeatureGates(gates);

        const update = await syncService.checkAppVersion();
        if (update && update.enabled) {
             setUpdateAvailable(update);
        }
    };
    init();

    // Subscriptions
    const unsubUi = syncService.subscribeToUiSettings((s) => setUiSettings(s));
    const unsubCel = syncService.subscribeToCelebrationSettings((c) => setCelebrationSettings(c));
    const unsubGates = syncService.subscribeToFeatureGates((g) => setFeatureGates(g));
    const unsubChanges = syncService.subscribeToChanges(() => init());

    // Update scroll handler to target the new scroll wrapper (the main element)
    const handleScroll = () => {
      const container = document.querySelector('#scroll-wrapper');
      if (container) {
          setShowScrollTop(container.scrollTop > 300);
      }
    };
    // Attach to main container via ID once mounted
    // We use a small timeout to ensure the element is in the DOM
    setTimeout(() => {
        const mainContainer = document.querySelector('#scroll-wrapper');
        if (mainContainer) mainContainer.addEventListener('scroll', handleScroll);
    }, 500);

    return () => {
        unsubUi();
        unsubCel();
        unsubGates();
        unsubChanges();
        const mainContainer = document.querySelector('#scroll-wrapper');
        if (mainContainer) mainContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    let result = products;
    
    // Category Filter (Strict Logic)
    if (activeCategory !== 'all') {
         result = result.filter(p => {
             if (activeCategory === 'men') return p.gender === 'men';
             if (activeCategory === 'women') return p.gender === 'women';
             if (activeCategory === 'kids') return p.gender === 'kids';
             if (activeCategory === 'contact') return p.category === 'contact'; // Specifically for Contact Lenses
             if (activeCategory === 'oppen') return p.category === 'oppen'; // Specifically for Open Lenses
             return false;
         });
    }

    // Sidebar Filters
    if(priceRange[0] > 0 || priceRange[1] < 10000) {
        result = result.filter(p => (p.price || 0) >= priceRange[0] && (p.price || 0) <= priceRange[1]);
    }
    if (selectedColors.length > 0) result = result.filter(p => p.color && selectedColors.includes(p.color));
    if (selectedFrameSizes.length > 0) result = result.filter(p => p.frameSize && selectedFrameSizes.some(s => p.frameSize?.includes(s)));
    
    setFilteredProducts(result);
  }, [products, priceRange, selectedColors, selectedFrameSizes, activeCategory]);

  // Handlers
  const handleLoginSuccess = async (loggedInUser: User) => { 
      setUser(loggedInUser); 
      setIsLoginOpen(false); 
      setNotification({ message: `مرحباً بك ${loggedInUser.name}!`, type: 'alert' }); 
      
      const unreadMsg = await syncService.fetchUnreadMessages(loggedInUser.id);
      if (unreadMsg) {
          setIncomingMessage({ 
              senderName: unreadMsg.senderName, 
              lastMessage: unreadMsg.lastMessage,
              senderId: unreadMsg.senderId 
          }); 
      } else {
          setIsDigestOpen(true); 
      }
  };

  const handleLogout = async () => { 
      await authService.logout(); 
      setUser(null); 
      setNotification({ message: 'تم تسجيل الخروج.', type: 'alert' }); 
      setIsProfileOpen(false); 
      setIsAdmin(false); 
      setIsEditMode(false); 
  };

  const handleAdminLogin = (password: string) => { 
      if (password === '12345') {
          setIsAdmin(true); 
          setIsAdminLoginOpen(false); 
          setNotification({ message: 'تم تفعيل وضع الأدمن.', type: 'alert' }); 
          return true; 
      } 
      return false; 
  };

  const handleAddToCart = (product: Product, lensSize?: LensSize, quality?: QualityOption, duration?: DurationOption, isSubscription?: boolean, giftMessage?: string, giftRecipientName?: string) => {
      addToCart(product, { selectedLensSize: lensSize, selectedQuality: quality, selectedDuration: duration, isSubscription, giftMessage, giftRecipientName });
      setNotification({ message: 'تمت الإضافة للسلة', type: 'cart' });
  };

  const handleNavigate = (page: Page) => {
      setCurrentPage(page);
      if (page !== 'productDetail') setSelectedProduct(null);
      if (page !== 'appointment') setSelectedDoctor(null);
      
      // Scroll to top of the new wrapper
      const mainContainer = document.querySelector('#scroll-wrapper');
      if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToProducts = (category: MainCategory) => {
      setActiveCategory(category);
      setCurrentPage('products');
  };

  const handleProductSelect = (product: Product) => {
      setSelectedProduct(product);
      handleNavigate('productDetail');
  };

  const handleDoctorSelect = (doctor: Doctor) => {
      setSelectedDoctor(doctor);
      handleNavigate('appointment');
  };

  const handleSync = async () => {
      setIsSyncing(true);
      await syncService.syncData({ 
          products, 
          flashDealIds: Array.from(flashDealIds), 
          newArrivalIds: Array.from(newProductIds), 
          lastUpdated: Date.now(), 
          loyaltyConfig 
      });
      setIsSyncing(false);
      setNotification({ message: 'تمت المزامنة بنجاح', type: 'alert' });
  };

  const handleUpdateProduct = (id: number, details: Partial<Product>) => {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...details } : p));
  };

  const handleUpdateProductImage = (id: number, index: number, url: string) => {
      setProducts(prev => prev.map(p => {
          if (p.id !== id) return p;
          const newImages = [...p.imageUrls];
          newImages[index] = url;
          return { ...p, imageUrls: newImages };
      }));
  };

  const handleAddProductImages = (id: number, urls: string[]) => {
      setProducts(prev => prev.map(p => {
          if (p.id !== id) return p;
          return { ...p, imageUrls: [...p.imageUrls, ...urls] };
      }));
  };

  const handleDeleteProductImage = (id: number, index: number) => {
      setProducts(prev => prev.map(p => {
          if (p.id !== id) return p;
          return { ...p, imageUrls: p.imageUrls.filter((_, i) => i !== index) };
      }));
  };

  const handleReorderProductImages = (id: number, urls: string[]) => {
      setProducts(prev => prev.map(p => p.id === id ? { ...p, imageUrls: urls } : p));
  };

  const handleAddProduct = (product: Product) => {
      setProducts(prev => [...prev, product]);
  };

  const handleToggleFlashDeal = (id: number) => {
      setFlashDealIds(prev => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id); else next.add(id);
          return next;
      });
  };

  const handleToggleNewArrival = (id: number) => {
      setNewProductIds(prev => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id); else next.add(id);
          return next;
      });
  };

  const handleOpenTransmission = () => {
      if (incomingMessage) {
          setActiveChatTarget(incomingMessage.senderId);
          setIncomingMessage(null); // Close modal
          // Logic to mark as read is handled inside PrivateChatWindow when loaded
      }
  };

  // Helper to open chat (passed to GlobalChat)
  const handleOpenChat = (targetId: string) => {
      setActiveChatTarget(targetId);
  };

  const featuredProducts = products.filter(p => newProductIds.has(p.id));
  const flashDealProducts = products.filter(p => flashDealIds.has(p.id));
  const bestSellers = products.filter(p => (p.salesCount || 0) > 50);

  const getCategoryTitle = () => {
      switch(activeCategory) {
          case 'men': return 'نظارات رجالي';
          case 'women': return 'نظارات نسائي';
          case 'kids': return 'نظارات أطفال';
          case 'contact': return 'عدسات لاصقة';
          case 'oppen': return 'عدسات أوبن (Open)';
          default: return 'جميع المنتجات';
      }
  };

  const renderPageContent = () => {
      switch (currentPage) {
        case 'home':
            return (
                <HomePage 
                    featuredProducts={featuredProducts} 
                    bestSellerProducts={bestSellers} 
                    flashDealProducts={flashDealProducts} 
                    onNavigate={handleNavigate} 
                    onNavigateToProducts={handleNavigateToProducts}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleProductSelect}
                    onAddToCompare={(p) => setCompareList([...compareList, p])}
                    onTryOn={(p) => { setSelectedProduct(p); setIsVirtualTryOnOpen(true); }}
                    wishlist={wishlist}
                    doctors={doctors}
                    onBookAppointment={handleDoctorSelect}
                    isAdmin={isAdmin}
                    isEditMode={isEditMode}
                    onUpdateProductImage={handleUpdateProductImage}
                    onUpdateProductDetails={handleUpdateProduct}
                    newProductIds={newProductIds}
                    flashDealIds={flashDealIds}
                    onToggleFlashDeal={handleToggleFlashDeal}
                    onToggleNewArrival={handleToggleNewArrival}
                    onTrackOrderClick={() => setIsOrderTrackingOpen(true)}
                    user={user}
                    products={products}
                    aiEnabled={aiEnabled}
                    uiSettings={uiSettings || { theme: 'holographic_blue', primary_neon_color: '#22d3ee', section_order: [], section_visibility: {}, fab_settings: { enabled: false } } as any}
                />
            );
        case 'products':
            return (
                <div className="p-4">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">{getCategoryTitle()}</h2>
                        <button onClick={toggleFilterSidebar} className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm border border-slate-700">تصفية</button>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map(p => (
                            <ProductCard 
                                key={p.id}
                                product={p}
                                onAddToCart={handleAddToCart}
                                onViewDetails={handleProductSelect}
                                onAddToCompare={(p) => setCompareList([...compareList, p])}
                                onTryOn={(p) => { setSelectedProduct(p); setIsVirtualTryOnOpen(true); }}
                                isAdmin={isAdmin}
                                isEditMode={isEditMode}
                                onUpdateProductImage={handleUpdateProductImage}
                                onUpdateProductDetails={handleUpdateProduct}
                                isNew={newProductIds.has(p.id)}
                            />
                        ))}
                     </div>
                </div>
            );
        case 'productDetail':
             return selectedProduct ? (
                <ProductDetailPage 
                    product={selectedProduct}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleProductSelect}
                    onAddToCompare={(p) => setCompareList([...compareList, p])}
                    onTryOn={(p) => { setSelectedProduct(p); setIsVirtualTryOnOpen(true); }}
                    onBackToProducts={() => handleNavigate('home')}
                    wishlist={wishlist}
                    onAddToWishlist={addToWishlist}
                    onRemoveFromWishlist={removeFromWishlist}
                    isAdmin={isAdmin}
                    isEditMode={isEditMode}
                    onUpdateProductImage={handleUpdateProductImage}
                    onUpdateProductDetails={handleUpdateProduct}
                    onAddProductImages={handleAddProductImages}
                    onDeleteProductImage={handleDeleteProductImage}
                    onReorderProductImages={handleReorderProductImages}
                    aiEnabled={aiEnabled}
                />
             ) : null;
        case 'appointment': 
             return <AppointmentPage doctors={doctors} selectedDoctor={selectedDoctor} onBookingConfirmed={() => { setNotification({message: 'تم حجز الموعد!', type: 'alert'}); handleNavigate('home'); }} />;
        case 'doctors': 
             return <DoctorsPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} onBookAppointment={handleDoctorSelect} />;
        case 'wishlist': 
             return <WishlistPage wishlist={wishlist} onNavigateToProducts={() => handleNavigate('home')} onAddToCart={handleAddToCart} onViewDetails={handleProductSelect} onAddToCompare={(p) => setCompareList([...compareList, p])} onTryOn={(p) => { setSelectedProduct(p); setIsVirtualTryOnOpen(true); }} isAdmin={isAdmin} isEditMode={isEditMode} onUpdateProductImage={handleUpdateProductImage} onUpdateProductDetails={handleUpdateProduct} newProductIds={newProductIds} />;
        case 'compare':
             return <ComparePage products={compareList} onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))} onAddToCart={handleAddToCart} onViewDetails={handleProductSelect} onNavigateToProducts={() => handleNavigate('home')} isAdmin={isAdmin} isEditMode={isEditMode} onUpdateProductImage={handleUpdateProductImage} onUpdateProductDetails={handleUpdateProduct} aiEnabled={aiEnabled} />;
        case 'styleAdvisor':
             return <StyleAdvisor products={products} onAddToCart={handleAddToCart} onViewDetails={handleProductSelect} onAddToCompare={(p) => setCompareList([...compareList, p])} onTryOn={(p) => { setSelectedProduct(p); setIsVirtualTryOnOpen(true); }} wishlist={wishlist} isAdmin={isAdmin} isEditMode={isEditMode} onUpdateProductImage={handleUpdateProductImage} onUpdateProductDetails={handleUpdateProduct} newProductIds={newProductIds} />;
        case 'prescriptionAnalyzer':
             return <PrescriptionAnalyzer products={products} onAddToCart={handleAddToCart} onViewDetails={handleProductSelect} onAddToCompare={(p) => setCompareList([...compareList, p])} onTryOn={(p) => { setSelectedProduct(p); setIsVirtualTryOnOpen(true); }} wishlist={wishlist} isAdmin={isAdmin} isEditMode={isEditMode} onUpdateProductImage={handleUpdateProductImage} onUpdateProductDetails={handleUpdateProduct} />;
        case 'colorAnalyzer':
             return <ColorAnalyzer products={products} onAddToCart={handleAddToCart} onViewDetails={handleProductSelect} onAddToCompare={(p) => setCompareList([...compareList, p])} onTryOn={(p) => { setSelectedProduct(p); setIsVirtualTryOnOpen(true); }} wishlist={wishlist} isAdmin={isAdmin} isEditMode={isEditMode} onUpdateProductImage={handleUpdateProductImage} onUpdateProductDetails={handleUpdateProduct} />;
        case 'styleWall':
             return <StyleWallPage user={user} onViewDetails={handleProductSelect} isAdmin={isAdmin} products={products} />;
        case 'loyaltyHub':
             return user ? <LoyaltyHub user={user} loyaltyConfig={loyaltyConfig} onChallengeComplete={() => { if(user) authService.getProfile(user.id).then(setUser); }} /> : <div className="text-center p-20 text-white">يرجى تسجيل الدخول.</div>;
        case 'eyeCareCorner':
             return <EyeCareCorner aiEnabled={aiEnabled} products={products} onNavigate={handleNavigate} onViewDetails={handleProductSelect} />;
        case 'globalChat':
             return user ? <GlobalChat user={user} onOpenPrivateChat={handleOpenChat} /> : <div className="text-center p-20 text-white">يرجى تسجيل الدخول للمشاركة.</div>;
        case 'liveShopping':
             return <LiveShoppingPage isAdmin={isAdmin} products={products} onAddToCart={handleAddToCart} onViewDetails={handleProductSelect} onAddToCompare={(p) => setCompareList([...compareList, p])} onTryOn={(p) => { setSelectedProduct(p); setIsVirtualTryOnOpen(true); }} wishlist={wishlist} onAddToWishlist={addToWishlist} onRemoveFromWishlist={removeFromWishlist} />;
        case 'eyeCinema':
             return <EyeCinemaPage products={products} onViewDetails={handleProductSelect} />;
        case 'wazirAuction':
             return <WazirAuctionPage user={user} products={products} onAddToCart={handleAddToCart} />;
        case 'groupTryOn':
             return <GroupTryOnPage products={products} />;
        case 'moodShopper':
             return <MoodShopperPage products={products} onViewDetails={handleProductSelect} onAddToCart={handleAddToCart} />;
        case 'aiSizeAdvisor':
             return <AISizeAdvisorPage products={products} onViewDetails={handleProductSelect} onAddToCart={handleAddToCart} />;
        case 'openLenses':
             return <OpenLensesPage products={products} onViewDetails={handleProductSelect} onAddToCart={handleAddToCart} />;
        case 'wazirArcade':
             return <WazirArcadePage />;
        case 'wheel':
             return <WheelPage user={user} onPrizeWon={() => { if(user) authService.getProfile(user.id).then(setUser); }} />;
        case 'vipClub':
             return user ? <VipClubPage user={user} onUpgradeSuccess={() => { if(user) authService.getProfile(user.id).then(setUser); setNotification({message:'تم الاشتراك في VIP بنجاح!', type: 'alert'}); }} /> : <div className="text-center p-20 text-white">يرجى تسجيل الدخول.</div>;
        case 'googleStudio':
             return <GoogleStudio onExecuteCommand={() => {}} />;
        default:
            return null;
      }
  };

  return (
    <PhoneFrame uiSettings={uiSettings || undefined}>
        <PermissionOnboardingModal />
        <CelebrationOverlay 
            settings={celebrationSettings} 
            isEditing={isCelebrationEditing} 
            onUpdateItems={(items) => setCelebrationSettings(prev => prev ? {...prev, items} : null)}
            onSave={() => { if(celebrationSettings) syncService.updateCelebrationSettings(celebrationSettings); setIsCelebrationEditing(false); }}
        />
        
        {/* SERVER DRIVEN WIDGET (Dynamic UI) */}
        <ServerDrivenWidget />

        {notification && <NotificationBanner message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        
        {/* Incoming Transmission Modal */}
        {incomingMessage && (
            <IncomingTransmissionModal 
                senderName={incomingMessage.senderName} 
                messagePreview={incomingMessage.lastMessage} 
                onOpen={handleOpenTransmission} 
                onDismiss={() => setIncomingMessage(null)} 
            />
        )}
        
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
        <AdminLoginModal isOpen={isAdminLoginOpen} onClose={() => setIsAdminLoginOpen(false)} onLogin={handleAdminLogin} />
        
        <CartModal 
            isOpen={isCartOpen} 
            onClose={() => toggleCart()} 
            cartItems={cart} 
            onRemove={removeFromCart} 
            onUpdateQuantity={updateCartQuantity} 
            onCheckout={() => { toggleCart(); setIsPaymentOpen(true); }}
            onApplyCoupon={(d, c) => { setAppliedCoupon({code: c, discount: d}); }}
            appliedDiscount={appliedCoupon?.discount || 0}
            appliedCouponCode={appliedCoupon?.code || ''}
            loyaltyConfig={loyaltyConfig}
            user={user}
            onRefreshData={async () => { if(user) setUser(await authService.getProfile(user.id)); }}
        />
        
        <PaymentModal 
            isOpen={isPaymentOpen} 
            onClose={() => setIsPaymentOpen(false)} 
            totalAmount={(() => {
                const sub = cart.reduce((acc, item) => {
                    let price = item.price || 0;
                    if(item.selectedQuality) price += item.selectedQuality.priceModifier;
                    if(item.selectedDuration) price += item.selectedDuration.priceModifier;
                    return acc + (price * item.quantity);
                }, 0);
                const vip = user?.vip_status === 'active' ? (loyaltyConfig.vip_discount_percentage || 0) : 0;
                const coupon = appliedCoupon?.discount || 0;
                return sub * (1 - (vip + coupon) / 100);
            })()}
            onOrderSuccess={(points) => { clearCart(); setAppliedCoupon(null); setIsPaymentOpen(false); setNotification({message: `تم الطلب بنجاح! +${points} نقطة`, type: 'alert'}); if(user) authService.getProfile(user.id).then(setUser); }}
            cartItems={cart}
            user={user}
            loyaltyConfig={loyaltyConfig}
            couponCode={appliedCoupon?.code}
            discountPercentage={appliedCoupon?.discount}
        />

        {user && <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} onLogout={handleLogout} onNavigate={handleNavigate} updateAvailable={updateAvailable} onOpenUpdateModal={() => setIsUpdateManagerOpen(true)} onOpenChat={(id) => { setIsProfileOpen(false); handleOpenChat(id); }} onRefreshUser={async () => { if(user) setUser(await authService.getProfile(user.id)); }} />}
        {user && <WelcomeDigestModal isOpen={isDigestOpen} onClose={() => setIsDigestOpen(false)} user={user} updateAvailable={updateAvailable} products={products} flashDealProducts={flashDealProducts} onViewDetails={handleProductSelect} onNavigate={handleNavigate} onOpenUpdateModal={() => setIsUpdateManagerOpen(true)} />}
        
        {isAdmin && (
            <>
                <AdminToolbar 
                    isEditMode={isEditMode} 
                    setIsEditMode={setIsEditMode} 
                    onSync={handleSync} 
                    isSyncing={isSyncing} 
                    onOpenDashboard={() => {}} 
                    onOpenFullDashboard={() => setIsFullDashboardOpen(true)}
                    onOpenSystemUtils={() => setIsSystemUtilsOpen(true)}
                    onOpenUpdateManager={() => setIsUpdateManagerOpen(true)}
                    isCelebrationEditing={isCelebrationEditing}
                    onToggleCelebrationEdit={setIsCelebrationEditing}
                    onAddCelebrationItem={(item) => setCelebrationSettings(prev => prev ? {...prev, items: [...prev.items, { ...item, id: Date.now().toString() }]} : { enabled: true, items: [{ ...item, id: Date.now().toString() }] })}
                    onSaveCelebration={() => { if(celebrationSettings) syncService.updateCelebrationSettings(celebrationSettings); }}
                    products={products}
                    isAutoSync={isAutoSync}
                    setIsAutoSync={setIsAutoSync}
                    onResetData={() => {}}
                    onChangeTheme={(theme) => {
                         document.body.classList.remove('theme-ocean', 'theme-gold', 'theme-nebula', 'theme-emerald');
                         if (theme !== 'default') document.body.classList.add(theme);
                    }}
                    connectionStatus="connected" // Placeholder
                    checkConnection={() => {}}
                />
                
                {/* Admin Modals */}
                <UpdateManagerModal isOpen={isUpdateManagerOpen} onClose={() => setIsUpdateManagerOpen(false)} />
                <SystemUtilsModal isOpen={isSystemUtilsOpen} onClose={() => setIsSystemUtilsOpen(false)} />
                <FullDashboardModal isOpen={isFullDashboardOpen} onClose={() => setIsFullDashboardOpen(false)} loyaltyConfig={loyaltyConfig} onUpdateLoyaltyConfig={(c) => { setLoyaltyConfig(c); syncService.updateLoyaltyConfig(c); }} products={products} onAddProduct={handleAddProduct} />
                
                {/* Button for Dynamic UI Manager is in AdminToolbar now (via Command Center) */}
            </>
        )}

        <HolographicCardViewer user={user} />
        <ScratchCardViewer user={user} onClaimPoints={() => { if(user) authService.getProfile(user.id).then(setUser); }} onAddCouponToAccount={async (c, d) => { if(user) await syncService.addCouponToUser(user.id, c, d); }} />
        <OrderTrackingModal isOpen={isOrderTrackingOpen} onClose={() => setIsOrderTrackingOpen(false)} />

        {/* --- MAIN SCROLL WRAPPER --- */}
        {/* Header moved INSIDE this main wrapper to allow scrolling with content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar pb-24 relative h-full" id="scroll-wrapper">
             
             {/* Header is now part of the scroll flow */}
             <Header 
                currentPage={currentPage} 
                onNavigate={handleNavigate} 
                onCartClick={() => toggleCart()} 
                onSideMenuClick={() => toggleSideMenu()}
                cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
                wishlistItemCount={wishlist.length}
                products={products}
                doctors={doctors}
                onProductSelect={handleProductSelect}
                onDoctorSelect={handleDoctorSelect}
                isAdmin={isAdmin}
                onLoginClick={() => setIsLoginOpen(true)}
                onAdminLoginClick={() => setIsAdminLoginOpen(true)}
                onLogoutClick={handleLogout}
                loyaltyPoints={user?.points || 0}
                user={user}
                onUserIconClick={() => user ? setIsProfileOpen(true) : setIsLoginOpen(true)}
                onTrackOrderClick={() => setIsOrderTrackingOpen(true)}
                onNavigateToProducts={handleNavigateToProducts}
                aiEnabled={aiEnabled}
                showUpdateIndicator={!!updateAvailable}
                onOpenUpdateModal={() => setIsUpdateManagerOpen(true)}
                uiSettings={uiSettings}
                celebrationSettings={celebrationSettings}
            />

             {uiSettings?.marquee_settings.enabled && currentPage === 'home' && (
                <div className="pt-2">
                    <Suspense fallback={null}>
                        <Marquee 
                            text={uiSettings.marquee_settings.text} 
                            color={uiSettings.marquee_settings.color} 
                            speed={uiSettings.marquee_settings.speed} 
                            text_enabled={uiSettings.marquee_settings.text_enabled} 
                        />
                    </Suspense>
                </div>
            )}

            <Suspense fallback={<LoadingSpinner />}>
                {renderPageContent()}
            </Suspense>
            
            {/* New: Private Chat Window when user clicks "Open" from notification */}
            {activeChatTarget && user && (
                <PrivateChatWindow 
                    currentUser={user}
                    targetUserId={activeChatTarget}
                    // We might not know the name yet if it's a new contact, fallback to ID
                    targetUserName={incomingMessage?.senderId === activeChatTarget ? incomingMessage.senderName : undefined} 
                    onClose={() => setActiveChatTarget(null)}
                />
            )}
        </main>

        <MobileBottomNav currentPage={currentPage} onNavigate={handleNavigate} onNavigateToProducts={() => handleNavigateToProducts('all')} onUserClick={() => user ? setIsProfileOpen(true) : setIsLoginOpen(true)} />
        <BackToTopButton isVisible={showScrollTop} />
        {compareList.length > 0 && <ComparisonTray items={compareList} onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))} onCompare={() => handleNavigate('compare')} onViewDetails={handleProductSelect} />}
        
        <SideMenu 
            isOpen={isSideMenuOpen} 
            onClose={toggleSideMenu} 
            onNavigate={handleNavigate} 
            onNavigateToProducts={handleNavigateToProducts} 
            aiEnabled={aiEnabled} 
            onOpenWheel={() => handleNavigate('wheel')} 
        />

        <FilterSidebar 
            isOpen={isFilterSidebarOpen} 
            onClose={toggleFilterSidebar} 
            priceRange={priceRange} setPriceRange={setPriceRange} maxPrice={10000} 
            availableColors={['أسود', 'فضي', 'بني', 'أزرق', 'ذهبي', 'رمادي', 'أزرق تيفاني', 'شفاف']} 
            selectedColors={selectedColors} setSelectedColors={setSelectedColors} 
            availableFrameSizes={['52mm', '54mm', '58mm', '60mm']} 
            selectedFrameSizes={selectedFrameSizes} setSelectedFrameSizes={setSelectedFrameSizes} 
            resetFilters={() => { setPriceRange([0, 10000]); setSelectedColors([]); setSelectedFrameSizes([]); }} 
        />
        
        {uiSettings?.fab_settings.enabled && (
             <CustomFAB 
                settings={uiSettings.fab_settings} 
                onClick={(type, val) => {
                    if (type === 'navigate') handleNavigate(val as Page);
                    if (type === 'filter_category') handleNavigateToProducts(val as MainCategory);
                }} 
            />
        )}
    </PhoneFrame>
  );
};