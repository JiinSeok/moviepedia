export async function getReviews(order = "createdAt") {
  const query = `order=${order}`;
  const response = await fetch(
    `https://learn.codeit.kr/0220/film-reviews/?${query}`
  );
  const body = response.json();
  return body;
}
