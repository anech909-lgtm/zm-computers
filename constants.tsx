
import { NavItem, Product } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#', view: 'home' },
  { label: 'Collections', href: '#collections', view: 'categories' },
  { label: 'Best Sellers', href: '#best-sellers', view: 'bestsellers' },
  { label: 'Inventory Sale', href: '#sale', isRed: true, view: 'bestsellers' },
  { label: 'Contact Support', href: '#contact', view: 'contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Zenith Pro X1',
    category: 'Laptops',
    price: 'Rs. 699,000',
    numericPrice: 699000,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i9-13980HX', '64GB DDR5 RAM', 'RTX 4090 16GB'],
    isNew: true,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Matrix G7 Enterprise',
    category: 'Desktops',
    price: 'Rs. 980,000',
    numericPrice: 980000,
    discountPrice: 'Rs. 890,000',
    numericDiscountPrice: 890000,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800',
    specs: ['AMD Ryzen 9 7950X', '128GB ECC RAM', 'Dual RTX 4080'],
    isSale: true
  },
  {
    id: '3',
    name: 'Nano Core Ultra',
    category: 'Workstations',
    price: 'Rs. 360,000',
    numericPrice: 360000,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800',
    specs: ['Apple M3 Max Chip', '32GB Unified Memory', '1TB NVMe'],
    isNew: true,
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Elysium S-Series 8K',
    category: 'Monitors',
    price: 'Rs. 240,000',
    numericPrice: 240000,
    discountPrice: 'Rs. 185,000',
    numericDiscountPrice: 185000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
    specs: ['32" 8K OLED Display', 'ProMotion 120Hz', '99.9% DCI-P3'],
    isSale: true
  },
  {
    id: '5',
    name: 'Vanguard Blade 14',
    category: 'Laptops',
    price: 'Rs. 550,000',
    numericPrice: 550000,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    specs: ['Intel Core i7 13th Gen', '32GB RAM', 'RTX 4070 Laptop GPU'],
    isBestSeller: true
  },
  {
    id: '6',
    name: 'Titan Server Node V2',
    category: 'Workstations',
    price: 'Rs. 1,650,000',
    numericPrice: 1650000,
    discountPrice: 'Rs. 1,480,000',
    numericDiscountPrice: 1480000,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    specs: ['Dual Xeon Platinum 8480+', '512GB ECC DDR5', 'U.2 NVMe RAID'],
    isSale: true
  },
  {
    id: '7',
    name: 'Quantum Hub 5',
    category: 'Accessories',
    price: 'Rs. 45,000',
    numericPrice: 45000,
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800',
    specs: ['Thunderbolt 4 Certified', '10-in-1 Connectivity', '100W Power Delivery'],
    isNew: true
  },
  {
    id: '8',
    name: 'Apex Mechanical G-1',
    category: 'Accessories',
    price: 'Rs. 65,000',
    numericPrice: 65000,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
    specs: ['Opto-Mechanical Switches', 'Full Aluminum Body', 'Wireless 2.4GHz'],
    isBestSeller: true
  }
];
