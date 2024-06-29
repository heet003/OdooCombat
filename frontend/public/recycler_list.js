document.addEventListener("DOMContentLoaded", () => { const recyclerData = {
name: "Ahmedabad E-Waste Recyclers", city: "Ahmedabad", customer_rating: 4.7,
pricing_per_kg: 14 }; document.getElementById("name").innerText =
recyclerData.name; document.getElementById("city").innerText =
`${recyclerData.city}`; document.getElementById("price").innerText =
`₹${recyclerData.pricing_per_kg}`; document.getElementById('rating').textContent
= recyclerData.customer_rating; const starRating =
document.getElementById('star-rating'); starRating.innerHTML =
generateStars(recyclerData.customer_rating); function generateStars(rating) {
const fullStar = '<i class="fas fa-star"></i>'; const halfStar = '<i
  class="fas fa-star-half-alt"
></i
>'; const emptyStar = '<i class="far fa-star"></i>'; let stars = ''; for (let i
= 1; i <= 5; i++) { if (rating >= i) { stars += fullStar; } else if (rating >= i
- 0.5) { stars += halfStar; } else { stars += emptyStar; } } return stars; } });
