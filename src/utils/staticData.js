// Product data
export const productData = [
  {
    key: 1,
    name: "Roses",
    description:
      "A bouquet of red roses is a classic symbol of love and affection. Give them to someone special to show how much you care.",
    mainImage: "https://s.net.vn/trsP",
    subImages: [
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
    mainImage: "https://s.net.vn/trsP",
    subImages: [
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
    mainImage: "https://s.net.vn/trsP",
    subImages: [
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
    mainImage: "https://s.net.vn/trsP",
    subImages: [
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
    dataIndex: "mainImage",
    key: "mainImage",
    render: (text, record) => {
      // console.log(record, text);
      return (
        <img
          src={record.mainImage}
          alt={record.name}
          style={{ maxWidth: 100 }}
        />
      );
    },
  },
  {
    title: "Sub Images",
    dataIndex: "subImages",
    key: "subImages",
    render: (subImages) => (
      <ul style={{listStyle:'none', display:'flex', gap:'5px'}}>
        {subImages.map((subImage, index) => (
          <li key={index}>
            <img
              src={subImage}
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
    dataIndex: "promotionPrice",
    key: "promotionPrice",
  },
];
