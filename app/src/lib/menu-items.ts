export interface MenuItem {
    title: string
    href: string
    children?: {
      title: string
      description?: string
      href: string
    }[]
  }
  
  export const menuItems: MenuItem[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Categories",
      href: "/categories",
      children: [
        {
          title: "Electronics",
          description: "Latest gadgets and electronic devices",
          href: "/categories/electronics",
        },
        {
          title: "Clothing",
          description: "Fashion and apparel for all",
          href: "/categories/clothing",
        },
        {
          title: "Books",
          description: "Digital and physical books collection",
          href: "/categories/books",
        },
        {
          title: "Home & Garden",
          description: "Everything for your home",
          href: "/categories/home-garden",
        },
      ],
    },
    {
      title: "Deals",
      href: "/deals",
      children: [
        {
          title: "Today's Deals",
          description: "Best offers of the day",
          href: "/deals/today",
        },
        {
          title: "Clearance",
          description: "Discounted items",
          href: "/deals/clearance",
        },
      ],
    },
    {
      title: "What's New",
      href: "/new",
      children: [
        {
          title: "New Arrivals",
          description: "Just landed products",
          href: "/new/arrivals",
        },
        {
          title: "Trending",
          description: "Popular items this week",
          href: "/new/trending",
        },
      ],
    },
    {
      title: "Delivery",
      href: "/delivery",
      children: [
        {
          title: "Shipping Options",
          description: "Choose your delivery method",
          href: "/delivery/options",
        },
        {
          title: "Track Order",
          description: "Check your order status",
          href: "/delivery/track",
        },
      ],
    },
  ]
  
  