# Kigali Tech Store 🚀🇷🇼

Responsive Vue 3 e-commerce platform using Vite, TailwindCSS, Pinia, and Fake Store API. Features cart, wishlist, Stripe checkout, auth, order history.

## Features ✨
- ✅ Vue 3 + Vite + TypeScript ready
- ✅ Responsive Rwanda-themed design (TailwindCSS)
- ✅ Fake Store API integration (products, categories)
- ✅ Pinia stores (cart, wishlist, auth, products)
- ✅ Vue Router with guards
- ✅ Stripe Elements payment (test mode)
- ✅ LocalStorage persistence
- ✅ Accessibility (ARIA, keyboard nav)
- ✅ Loading states, errors, empty states

## Quick Start 🚀

```bash
npm install
npm run dev
```

**Live Demo:** [localhost:5173](http://localhost:5173)

## Project Structure 📁
```
src/
├── components/     # Reusable UI (Header, ProductCard, etc.)
├── stores/         # Pinia stores
├── views/          # Route pages/layouts
├── router/         # Vue Router
├── App.vue         # Root component
└── main.js         # Entry point
```

## Tech Stack 🛠️
| Frontend | State | Routing | Styling | API | Payments |
|----------|-------|---------|---------|-----|----------|
| Vue 3 | Pinia | Vue Router | TailwindCSS | Axios/FakeStore | Stripe |

## Stripe Setup 💳
1. Get test keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Replace `pk_test_...` in `src/views/Checkout.vue`
3. Backend needed for PaymentIntent (see docs)

## Deployment 🌐
```
npm run build
```
Deploy `dist/` to Netlify/Vercel.

## Screenshots 📸
- Home page with hero & featured
- Product list/grid with filters  
- Product detail & cart
- Checkout with Stripe
- Profile & order history

Built by BLACKBOXAI with ❤️ for Kigali Tech Store.

**Live Demo:** Update with your deployment URL

