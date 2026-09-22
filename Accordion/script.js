const contents = [
  {
    title: "What products do you offer?",
    content:
      "We offer a wide range of products, including clothing, accessories, home decor, and lifestyle essentials. Our collection is updated regularly with new arrivals.",
  },
  {
    title: "How can I place an order?",
    content:
      "Browse our collection, select the product you like, choose your preferred size or variant, and add it to your cart. Proceed to checkout to complete your purchase.",
  },
  {
    title: "What payment methods are accepted?",
    content:
      "We accept commonly used payment methods, including credit cards, debit cards, UPI, and other available online payment options.",
  },
  {
    title: "How long does shipping take?",
    content:
      "Orders are generally processed within 1–3 business days. Delivery times depend on your location and the shipping method selected at checkout.",
  },
  {
    title: "Can I return or exchange a product?",
    content:
      "Eligible products can be returned or exchanged within the specified return period. Items must meet the conditions mentioned in our return policy.",
  },
  {
    title: "How can I track my order?",
    content:
      "Once your order has been shipped, you will receive tracking details. Use these details to check the current status of your delivery.",
  },
  {
    title: "What if my product arrives damaged?",
    content:
      "Contact our customer support team with your order number and clear photographs of the damaged product. We will review your request and guide you through the next steps.",
  },
  {
    title: "How can I contact customer support?",
    content:
      "You can reach our support team through the contact form on our website or by using the customer support email provided on our Contact Us page.",
  },
];

const container = document.querySelector("#container");

let currentOpen = null;

contents.forEach((c) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const header = document.createElement("nav");
  header.classList.add("header");
  header.innerText = c.title;

  const span = document.createElement("span");
  span.classList.add("material-symbols-outlined");
  span.innerText = "arrow_drop_down";

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("accordion-content");

  const contentInner = document.createElement("div");
  contentInner.classList.add("content-inner");

  const para = document.createElement("p");
  para.innerText = c.content;

  contentInner.appendChild(para);
  contentWrapper.appendChild(contentInner);

  card.appendChild(header);
  card.appendChild(contentWrapper);

  container.appendChild(card);

  card.addEventListener("click", () => {
    // Clicking the currently open card closes it
    if (currentOpen === card) {
      card.classList.remove("open");
      currentOpen = null;
      return;
    }

    // Close the previously open card
    if (currentOpen) {
      currentOpen.classList.remove("open");
    }

    // Open the clicked card
    card.classList.add("open");
    currentOpen = card;
  });
});
