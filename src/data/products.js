import { reactive } from 'vue'

export const products = reactive([
  {
    id: 1,
    name: 'BMW M4 Competition',
    description:
      'A high-performance sports coupe combining luxury, aggressive styling, and thrilling driving dynamics.',
    imgUrl:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1000',
    price: 78000,
    discount: 10,
    badge: 'Best Seller',
    tags: ['BMW', 'Sports', 'Luxury'],
    stock: 5,
    category: 'Sports Cars'
  },

  {
    id: 2,
    name: 'Mercedes-Benz C-Class',
    description:
      'A premium sedan offering elegant design, advanced technology, and exceptional comfort.',
    imgUrl:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1000',
    price: 62000,
    discount: 5,
    badge: 'Popular',
    tags: ['Mercedes', 'Sedan', 'Luxury'],
    stock: 4,
    category: 'Sedans'
  },

  {
    id: 3,
    name: 'Audi R8',
    description:
      'An iconic performance car with a powerful engine, sharp handling, and unmistakable design.',
    imgUrl:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1000',
    price: 145000,
    discount: 15,
    badge: 'Limited',
    tags: ['Audi', 'Supercar', 'Performance'],
    stock: 2,
    category: 'Sports Cars'
  },

  {
    id: 4,
    name: 'Porsche 911',
    description:
      'A legendary sports car delivering outstanding performance with timeless German engineering.',
    imgUrl:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000',
    price: 120000,
    discount: 0,
    badge: '',
    tags: ['Porsche', 'Sports', 'Premium'],
    stock: 3,
    category: 'Sports Cars'
  },

  {
    id: 5,
    name: 'Range Rover Velar',
    description:
      'A sophisticated luxury SUV combining premium comfort, modern technology, and off-road capability.',
    imgUrl:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1000',
    price: 95000,
    discount: 8,
    badge: 'Featured',
    tags: ['Range Rover', 'SUV', 'Luxury'],
    stock: 6,
    category: 'SUVs'
  },

  {
    id: 6,
    name: 'Tesla Model S',
    description:
      'A modern electric sedan offering impressive acceleration, advanced technology, and long-range performance.',
    imgUrl:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1000',
    price: 88000,
    discount: 12,
    badge: 'Electric',
    tags: ['Tesla', 'Electric', 'Sedan'],
    stock: 5,
    category: 'Electric Cars'
  }
])