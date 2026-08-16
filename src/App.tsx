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
import { HomeScreen } from './components/HomeScreen'
import { MyPageScreen } from './components/MyPageScreen'
import { OrdersScreen } from './components/OrdersScreen'
import { ProcessingScreen } from './components/ProcessingScreen'
import { SearchScreen } from './components/SearchScreen'
import { StatusBar } from './components/StatusBar'
import { SuccessScreen } from './components/SuccessScreen'
import { usePersistentState } from './hooks/usePersistentState'
import { productById, products } from './data/products'
import type { Address, CartItem, OrderSnapshot, PaymentMethod, Product, Screen } from './types'

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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit')
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [order, setOrder] = useState<OrderSnapshot | null>(orders[0] ?? null)

  const detailedItems = useMemo(() => cartItems.map((item) => ({ ...item, product: productById(item.productId) })), [cartItems])
  const subtotal = detailedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal + SHIPPING
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const navigate = (next: Screen) => {
    setPreviousScreen(screen)
    setScreen(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const selectProduct = (product: Product) => { setSelectedProduct(product); navigate('detail') }
  const addToCart = (product: Product, quantity: number) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === product.id)
      return existing ? current.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { productId: product.id, quantity }]
    })
    navigate('cart')
  }
  const changeQuantity = (productId: string, quantity: number) => { if (quantity >= 1) setCartItems((current) => current.map((item) => item.productId === productId ? { ...item, quantity } : item)) }
  const removeItem = (productId: string) => setCartItems((current) => current.filter((item) => item.productId !== productId))
  const toggleFavorite = () => setFavorites((current) => current.includes(selectedProduct.id) ? current.filter((id) => id !== selectedProduct.id) : [selectedProduct.id, ...current])

  const pay = () => {
    const defaultAddress = addresses.find((item) => item.isDefault) ?? addresses[0]
    const snapshot: OrderSnapshot = { orderId: `CN-AU-${new Date().getFullYear()}-${String(Date.now()).slice(-8)}`, items: detailedItems, itemCount: cartCount, subtotal, shipping: SHIPPING, total, paymentMethod, address: `${defaultAddress.prefecture}${defaultAddress.street} ${defaultAddress.building}`, paidAt: new Date().toISOString() }
    setOrder(snapshot); setOrders((current) => [snapshot, ...current]); navigate('processing')
    window.setTimeout(() => { setScreen('success'); setCartItems([]) }, 950)
  }

  const back = () => {
    if (screen === 'detail') navigate(previousScreen === 'detail' ? 'home' : previousScreen)
    else if (screen === 'checkout') navigate('cart')
    else if (screen === 'orders' || screen === 'favorites' || screen === 'addresses') navigate('mypage')
    else navigate('home')
  }

  const saveAddress = (address: Address) => {
    setAddresses((current) => editingAddress
      ? current.map((item) => item.id === address.id ? address : item)
      : [address, ...current.map((item) => ({ ...item, isDefault: false }))])
    setEditingAddress(null)
    navigate('addresses')
  }
  const setDefaultAddress = (id: string) => setAddresses((current) => current.map((item) => ({ ...item, isDefault: item.id === id })))
  const hasHeader = !['address-form', 'processing', 'success'].includes(screen)
  const hasStatus = !['address-form', 'processing'].includes(screen)

  return (
    <div className={`app app--${screen}`}>
      {hasStatus && <StatusBar />}
      {hasHeader && <Header screen={screen} cartCount={cartCount} onNavigate={navigate} onBack={back} />}
      {screen === 'home' && <HomeScreen onSelect={selectProduct} />}
      {screen === 'search' && <SearchScreen onSelect={selectProduct} onHome={() => navigate('home')} />}
      {screen === 'category' && <CategoryScreen onSelect={selectProduct} />}
      {screen === 'campaign' && <CampaignScreen onHome={() => navigate('home')} onSearch={() => navigate('search')} />}
      {screen === 'detail' && <DetailScreen product={selectedProduct} onAdd={addToCart} isFavorite={favorites.includes(selectedProduct.id)} onFavorite={toggleFavorite} />}
      {screen === 'favorites' && <FavoritesScreen products={favorites.map(productById)} onSelect={selectProduct} />}
      {screen === 'cart' && <CartScreen items={detailedItems} total={total} onQuantity={changeQuantity} onRemove={removeItem} onCheckout={() => navigate('checkout')} onContinue={() => navigate('home')} />}
      {screen === 'checkout' && <CheckoutScreen items={detailedItems} subtotal={subtotal} shipping={SHIPPING} total={total} payment={paymentMethod} address={addresses.find((item) => item.isDefault) ?? addresses[0]} onPayment={setPaymentMethod} onPay={pay} onAddress={() => navigate('addresses')} />}
      {screen === 'processing' && <ProcessingScreen />}
      {screen === 'success' && order && <SuccessScreen order={order} onHome={() => navigate('home')} onOrders={() => navigate('orders')} />}
      {screen === 'mypage' && <MyPageScreen favoritesCount={favorites.length} onNavigate={navigate} />}
      {screen === 'orders' && <OrdersScreen orders={orders} />}
      {screen === 'addresses' && <AddressListScreen addresses={addresses} onAdd={() => { setEditingAddress(null); navigate('address-form') }} onEdit={(address) => { setEditingAddress(address); navigate('address-form') }} onSetDefault={setDefaultAddress} />}
      {screen === 'address-form' && <AddressFormScreen initialAddress={editingAddress} onSave={saveAddress} />}
      <BottomNav screen={screen} cartCount={cartCount} onNavigate={navigate} />
    </div>
  )
}
