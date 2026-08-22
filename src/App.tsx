import { useMemo, useState } from 'react'
import { AddressFormScreen, AddressListScreen } from './components/AddressScreens'
import { BottomNav } from './components/BottomNav'
import { CampaignScreen } from './components/CampaignScreen'
import { CartScreen } from './components/CartScreen'
import { CategoryScreen } from './components/CategoryScreen'
import { CheckoutScreen } from './components/CheckoutScreen'
import { DetailScreen } from './components/DetailScreen'
import { FavoritesScreen } from './components/FavoritesScreen'
import { Header } from './components/Header'
import { HistoryScreen } from './components/HistoryScreen'
import { HomeScreen } from './components/HomeScreen'
import { MyPageScreen } from './components/MyPageScreen'
import { OrdersScreen } from './components/OrdersScreen'
import { ProcessingScreen } from './components/ProcessingScreen'
import { QuickResultsScreen } from './components/QuickResultsScreen'
import { SearchScreen } from './components/SearchScreen'
import { StatusBar } from './components/StatusBar'
import { SuccessScreen } from './components/SuccessScreen'
import { usePersistentState } from './hooks/usePersistentState'
import { productById, products } from './data/products'
import { calculateCouponDiscount } from './data/coupons'
import type { Address, CartItem, OrderSnapshot, PaymentMethod, Product, QuickEntry, Screen } from './types'

const SHIPPING = 0
const defaultAddresses: Address[] = [
  { id: 'tokyo', name: '山田 太郎', phone: '090-1234-5678', postalCode: '163-1020', prefecture: '東京都', street: '新宿区西新宿3丁目7−1', building: '新宿パークタワー 20F', isDefault: true },
  { id: 'shibuya', name: '佐藤 美咲', phone: '080-3146-9285', postalCode: '150-0002', prefecture: '東京都', street: '渋谷区渋谷2丁目8−12', building: '渋谷レジデンス 503号室', isDefault: false, verified: true },
  { id: 'osaka', name: '中村 翔太', phone: '080-2497-6652', postalCode: '530-0003', prefecture: '大阪府', street: '大阪市北区堂島2丁目3−5', building: '堂島プライムレジデンス 702', isDefault: false, verified: true },
]

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [previousScreen, setPreviousScreen] = useState<Screen>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0])
  const [cartItems, setCartItems] = usePersistentState<CartItem[]>('seal-cart', [])
  const [favorites, setFavorites] = usePersistentState<string[]>('seal-favorites', [])
  const [addresses, setAddresses] = usePersistentState<Address[]>('seal-addresses', defaultAddresses)
  const [orders, setOrders] = usePersistentState<OrderSnapshot[]>('seal-orders', [])
  const [viewedProductIds, setViewedProductIds] = usePersistentState<string[]>('seal-viewed-products', [])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit')
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [order, setOrder] = useState<OrderSnapshot | null>(orders[0] ?? null)
  const [quickEntry, setQuickEntry] = useState<QuickEntry>('人気商品')
  const [addressReturnTo, setAddressReturnTo] = useState<'mypage' | 'checkout'>('mypage')
  const [checkoutProductIds, setCheckoutProductIds] = useState<string[]>([])
  const [orderFilter, setOrderFilter] = useState('注文履歴')
  const [appliedCouponId, setAppliedCouponId] = useState<string | null>(null)

  const detailedItems = useMemo(() => cartItems.map((item) => ({ ...item, product: productById(item.productId) })), [cartItems])
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const checkoutItems = detailedItems.filter((item) => checkoutProductIds.includes(item.productId))
  const checkoutSubtotal = checkoutItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const couponDiscount = calculateCouponDiscount(appliedCouponId, checkoutItems, checkoutSubtotal, SHIPPING)
  const checkoutTotal = Math.max(0, checkoutSubtotal + SHIPPING - couponDiscount)

  const navigate = (next: Screen) => {
    setPreviousScreen(screen)
    setScreen(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
    window.requestAnimationFrame(() => document.querySelector<HTMLElement>('.app')?.scrollTo({ top: 0, behavior: 'instant' }))
  }

  const selectProduct = (product: Product) => {
    setSelectedProduct(product)
    if (products.some((item) => item.id === product.id)) {
      setViewedProductIds((current) => [product.id, ...current.filter((id) => id !== product.id)].slice(0, 12))
    }
    navigate('detail')
  }
  const openQuickEntry = (entry: QuickEntry) => { setQuickEntry(entry); navigate('quick-results') }
  const addToCart = (product: Product, quantity: number) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === product.id)
      return existing ? current.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { productId: product.id, quantity }]
    })
    navigate('cart')
  }
  const changeQuantity = (productId: string, quantity: number) => { if (quantity >= 1) setCartItems((current) => current.map((item) => item.productId === productId ? { ...item, quantity } : item)) }
  const removeItem = (productId: string) => setCartItems((current) => current.filter((item) => item.productId !== productId))
  const restoreItem = (productId: string, quantity: number) => setCartItems((current) => current.some((item) => item.productId === productId) ? current : [...current, { productId, quantity }])
  const repurchaseItem = (productId: string) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === productId)
      return existing ? current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { productId, quantity: 1 }]
    })
    navigate('cart')
  }
  const startCheckout = (productIds: string[]) => { setCheckoutProductIds(productIds); navigate('checkout') }
  const toggleFavorite = () => setFavorites((current) => current.includes(selectedProduct.id) ? current.filter((id) => id !== selectedProduct.id) : [selectedProduct.id, ...current])

  const pay = () => {
    const defaultAddress = addresses.find((item) => item.isDefault) ?? addresses[0]
    const checkoutItemCount = checkoutItems.reduce((sum, item) => sum + item.quantity, 0)
    const snapshot: OrderSnapshot = { orderId: `CN-AU-${new Date().getFullYear()}-${String(Date.now()).slice(-8)}`, items: checkoutItems, itemCount: checkoutItemCount, subtotal: checkoutSubtotal, shipping: SHIPPING, total: checkoutTotal, paymentMethod, address: `${defaultAddress.prefecture}${defaultAddress.street} ${defaultAddress.building}`, paidAt: new Date().toISOString() }
    setOrder(snapshot); setOrders((current) => [snapshot, ...current]); navigate('processing')
    window.setTimeout(() => { setScreen('success'); setCartItems([]); setCheckoutProductIds([]); setAppliedCouponId(null) }, 1800)
  }

  const back = () => {
    if (screen === 'detail') navigate(previousScreen === 'detail' ? 'home' : previousScreen)
    else if (screen === 'checkout') navigate('cart')
    else if (screen === 'addresses') navigate(addressReturnTo)
    else if (screen === 'orders' || screen === 'favorites' || screen === 'history') navigate('mypage')
    else if (screen === 'quick-results') navigate('home')
    else navigate('home')
  }

  const saveAddress = (address: Address) => {
    setAddresses((current) => {
      const updated = editingAddress
        ? current.map((item) => item.id === address.id ? address : item)
        : [address, ...current]
      return address.isDefault ? updated.map((item) => ({ ...item, isDefault: item.id === address.id })) : updated
    })
    setEditingAddress(null)
    navigate(addressReturnTo === 'checkout' ? 'checkout' : 'addresses')
  }
  const setDefaultAddress = (id: string) => setAddresses((current) => current.map((item) => ({ ...item, isDefault: item.id === id })))
  const shellScreen: Screen = screen === 'address-form' ? 'addresses' : screen
  const hasHeader = !['processing', 'success'].includes(screen)
  const hasStatus = screen !== 'processing'

  return (
    <div className={`app app--${screen}`}>
      {hasStatus && <StatusBar />}
      {hasHeader && <Header screen={shellScreen} cartCount={cartCount} onNavigate={navigate} onBack={back} quickEntryTitle={quickEntry} />}
      {screen === 'home' && <HomeScreen onSelect={selectProduct} onQuickEntry={openQuickEntry} />}
      {screen === 'search' && <SearchScreen onSelect={selectProduct} onHome={() => navigate('home')} />}
      {screen === 'quick-results' && <QuickResultsScreen entry={quickEntry} onSelect={selectProduct} appliedCouponId={appliedCouponId} onApplyCoupon={setAppliedCouponId} />}
      {screen === 'category' && <CategoryScreen onSelect={selectProduct} onSearch={() => navigate('search')} />}
      {screen === 'campaign' && <CampaignScreen onHome={() => navigate('home')} onSearch={() => navigate('search')} />}
      {screen === 'detail' && <DetailScreen product={selectedProduct} onAdd={addToCart} isFavorite={favorites.includes(selectedProduct.id)} onFavorite={toggleFavorite} />}
      {screen === 'favorites' && <FavoritesScreen products={favorites.map(productById)} onSelect={selectProduct} />}
      {screen === 'history' && <HistoryScreen products={viewedProductIds.map((id) => products.find((product) => product.id === id)).filter((product): product is Product => Boolean(product))} onSelect={selectProduct} />}
      {screen === 'cart' && <CartScreen items={detailedItems} onQuantity={changeQuantity} onRemove={removeItem} onRestore={restoreItem} onCheckout={startCheckout} onContinue={() => navigate('home')} />}
      {screen === 'checkout' && <CheckoutScreen items={checkoutItems} subtotal={checkoutSubtotal} shipping={SHIPPING} couponDiscount={couponDiscount} total={checkoutTotal} payment={paymentMethod} address={addresses.find((item) => item.isDefault) ?? addresses[0]} onPayment={setPaymentMethod} onPay={pay} onAddress={() => { setAddressReturnTo('checkout'); navigate('addresses') }} />}
      {screen === 'processing' && <ProcessingScreen />}
      {screen === 'success' && order && <SuccessScreen order={order} onHome={() => navigate('home')} onOrders={() => navigate('orders')} />}
      {screen === 'mypage' && <MyPageScreen favoritesCount={favorites.length} onNavigate={(next) => { if (next === 'addresses') setAddressReturnTo('mypage'); navigate(next) }} onOrders={(filter) => { setOrderFilter(filter); navigate('orders') }} />}
      {screen === 'orders' && <OrdersScreen orders={orders} initialFilter={orderFilter} onRepurchase={repurchaseItem} />}
      {(screen === 'addresses' || screen === 'address-form') && <AddressListScreen addresses={addresses} onAdd={() => { setEditingAddress(null); navigate('address-form') }} onEdit={(address) => { setEditingAddress(address); navigate('address-form') }} onSetDefault={setDefaultAddress} />}
      {screen === 'address-form' && <div className="address-modal-backdrop" role="presentation" onPointerDown={(event) => { if (event.target === event.currentTarget) navigate('addresses') }}><AddressFormScreen initialAddress={editingAddress} onSave={saveAddress} /></div>}
      <BottomNav screen={screen} cartCount={cartCount} onNavigate={navigate} />
    </div>
  )
}
