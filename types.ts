
export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  numericPrice: number;
  discountPrice?: string;
  numericDiscountPrice?: number;
  image: string;
  specs: string[];
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NavItem {
  label: string;
  href: string;
  isRed?: boolean;
  view?: ViewType;
}

export type ViewType = 'home' | 'categories' | 'bestsellers' | 'contact' | 'checkout' | 'confirmation' | 'product-detail' | 'wishlist';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
