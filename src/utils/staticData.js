const productBucketURL = process.env.NEXT_PUBLIC_SUPABASE_PRODUCTS_BUCKET_URL;
// Product data
export const productData = [
  {
    key: 1,
    name: "Roses",
    description:
      "A bouquet of red roses is a classic symbol of love and affection. Give them to someone special to show how much you care.",
    main_image: "https://s.net.vn/trsP",
    sub_images: [
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
    ],
    price: 25.99,
    promotionPrice: 19.99,
  },
  {
    key: 2,
    name: "Lilies",
    description:
      "A bouquet of white lilies is a beautiful and elegant way to express sympathy, honor a loved one, or celebrate a special occasion.",
    main_image: "https://s.net.vn/trsP",
    sub_images: [
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
    ],
    price: 35.99,
    promotionPrice: 29.99,
  },
  {
    key: 3,
    name: "Tulips",
    description:
      "A bouquet of colorful tulips is a cheerful and uplifting way to brighten someone's day.",
    main_image: "https://s.net.vn/trsP",
    sub_images: [
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
    ],
    price: 19.99,
    promotionPrice: 14.99,
  },
  {
    key: 4,
    name: "Sunflowers",
    description:
      "A bouquet of sunflowers is a bold and cheerful way to bring a little sunshine into someone's life.",
    main_image: "https://s.net.vn/trsP",
    sub_images: [
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
      "https://s.net.vn/trsP",
    ],
    price: 29.99,
    promotionPrice: 24.99,
  },
];

// Table Header name
export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Main Image",
    dataIndex: "main_image",
    key: "main_image",
    render: (text, record) => {
      const imageLink = productBucketURL + text;
      return (
        <img src={imageLink} alt={record.name} style={{ maxWidth: 100 }} />
      );
    },
  },
  {
    title: "Sub Images",
    dataIndex: "sub_images",
    key: "sub_images",
    render: (sub_images) => (
      <ul style={{ listStyle: "none", display: "flex", gap: "5px" }}>
        {sub_images.map((subImage, index) => (
          <li key={index}>
            <img
              src={`${productBucketURL}${subImage}`}
              alt={`Sub Image ${index}`}
              style={{ maxWidth: 100 }}
            />
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Promotion Price",
    dataIndex: "promo_price",
    key: "promo_price",
  },
];
