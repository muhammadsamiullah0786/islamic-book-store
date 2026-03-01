// =====================
// Product Data Store
// =====================

const productsData = [
  {
    id: 1,
    title: "Riyad-us-Saliheen",
    author: "Imam Nawawi",
    category: "Hadith",
    price: 3499,
    rating: 4.9,
    reviews: 156,
    image: "assets/book-1.jpg",
    description: "A famous compilation of hadith focusing on ethics, manners, worship, and character building. This authentic collection is essential for every Muslim household.",
    inStock: true,
    featured: true,
    dateAdded: "2026-02-15"
  },
  {
    id: 2,
    title: "Sahih Al-Bukhari",
    author: "Imam Bukhari",
    category: "Hadith",
    price: 5999,
    rating: 5.0,
    reviews: 243,
    image: "assets/book-2.jpg",
    description: "The most authentic collection of hadith after the Qur'an. Complete collection with Arabic text and translations.",
    inStock: true,
    featured: true,
    dateAdded: "2026-01-20"
  },
  {
    id: 3,
    title: "Tafsir Ibn Kathir",
    author: "Ibn Kathir",
    category: "Tafsir",
    price: 4799,
    rating: 4.8,
    reviews: 189,
    image: "assets/book-3.jpg",
    description: "One of the most comprehensive and authentic Quranic commentaries. Essential for understanding the Quran deeply.",
    inStock: true,
    featured: false,
    dateAdded: "2026-02-01"
  },
  {
    id: 4,
    title: "Sealed Nectar",
    author: "Safiur Rahman Mubarakpuri",
    category: "Seerah",
    price: 2999,
    rating: 4.9,
    reviews: 312,
    image: "assets/book-1.jpg",
    description: "The best biography of the Prophet Muhammad (PBUH). Winner of multiple awards for historical accuracy and engaging narrative.",
    inStock: true,
    featured: true,
    dateAdded: "2026-01-10"
  },
  {
    id: 5,
    title: "40 Hadith Nawawi",
    author: "Imam Nawawi",
    category: "Hadith",
    price: 1499,
    rating: 4.7,
    reviews: 198,
    image: "assets/book-2.jpg",
    description: "Forty essential hadiths that cover the fundamentals of Islam. Perfect for memorization and daily reflection.",
    inStock: true,
    featured: false,
    dateAdded: "2026-02-10"
  },
  {
    id: 6,
    title: "Fortress of the Muslim",
    author: "Sa'id bin Wahf Al-Qahtani",
    category: "Fiqh",
    price: 899,
    rating: 4.9,
    reviews: 421,
    image: "assets/book-3.jpg",
    description: "Pocket-sized collection of authentic du'as and adhkar for daily life. Essential for every Muslim.",
    inStock: true,
    featured: true,
    dateAdded: "2026-02-20"
  },
  {
    id: 7,
    title: "Stories of the Prophets",
    author: "Ibn Kathir",
    category: "Seerah",
    price: 3299,
    rating: 4.8,
    reviews: 267,
    image: "assets/book-1.jpg",
    description: "Authentic stories of all the prophets from Adam to Muhammad (PBUH). Great for family reading and education.",
    inStock: true,
    featured: false,
    dateAdded: "2026-01-25"
  },
  {
    id: 8,
    title: "Fiqh Us-Sunnah",
    author: "Sayyid Sabiq",
    category: "Fiqh",
    price: 4299,
    rating: 4.7,
    reviews: 145,
    image: "assets/book-2.jpg",
    description: "Comprehensive guide to Islamic jurisprudence based on the Sunnah. Covers all aspects of worship and daily life.",
    inStock: true,
    featured: false,
    dateAdded: "2026-02-05"
  },
  {
    id: 9,
    title: "The Noble Quran",
    author: "Multiple Translators",
    category: "Quran",
    price: 2499,
    rating: 5.0,
    reviews: 523,
    image: "assets/book-3.jpg",
    description: "Premium hardcover Quran with English translation. Beautiful typography and clear Arabic text.",
    inStock: true,
    featured: true,
    dateAdded: "2026-01-01"
  },
  {
    id: 10,
    title: "My First Quran",
    author: "Various",
    category: "Kids",
    price: 1799,
    rating: 4.8,
    reviews: 287,
    image: "assets/book-1.jpg",
    description: "Beautifully illustrated Quran stories for children. Perfect for introducing young ones to Islamic teachings.",
    inStock: true,
    featured: false,
    dateAdded: "2026-02-12"
  },
  {
    id: 11,
    title: "Islamic Stories for Kids",
    author: "Various Authors",
    category: "Kids",
    price: 1299,
    rating: 4.6,
    reviews: 198,
    image: "assets/book-2.jpg",
    description: "Collection of moral stories based on Islamic values. Engaging illustrations and age-appropriate lessons.",
    inStock: true,
    featured: false,
    dateAdded: "2026-02-18"
  },
  {
    id: 12,
    title: "Journey to the Hereafter",
    author: "Ibn Rajab Al-Hanbali",
    category: "Fiqh",
    price: 2799,
    rating: 4.9,
    reviews: 167,
    image: "assets/book-3.jpg",
    description: "Comprehensive guide to death, the grave, and the Day of Judgment. Essential reading for spiritual preparation.",
    inStock: true,
    featured: false,
    dateAdded: "2026-01-30"
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { productsData };
}
