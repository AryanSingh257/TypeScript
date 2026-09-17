const contents = {
    '1': `
    <p>Welcome to our store</p>
    <p>Explore our latest collection</p>
    <div class="card">Featured Product</div>
    <p>Free shipping available</p>
  `,
    '2': `
    <p>New arrivals are here</p>
    <p>Check out our newest designs</p>
    <p>Limited stock available</p>
  `,
    '3': `
    <p>Today's special offer</p>
    <div class="card">Special Offer Card</div>
    <p>Valid until Sunday</p>
  `,
    '4': `
    <p>Thank you for visiting</p>
    <p>Come back soon!</p>
  `
};
const content = document.querySelector("#content");
const tabs = document.querySelectorAll(".tabs");
let currentTab = 0;
tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        currentTab = index;
        content.innerHTML = contents[(index + 1).toString()];
        tabs.forEach((tab, i) => {
            tab.classList.toggle("active", i === currentTab);
            tab.classList.toggle("disabled", i !== currentTab);
        });
    });
});
// Show first tab initially
content.innerHTML = contents["1"];
