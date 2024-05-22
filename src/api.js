export async function getReviews() {
  const response = await fetch("https://learn.codeit.kr/0220/film-reviews/");
  const body = response.json();
  return body;
}
