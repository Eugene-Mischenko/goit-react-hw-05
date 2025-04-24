const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGQyYzBjZTkwOTk5NGYzN2FmMTg0MDc4ZGJmN2Y0NiIsIm5iZiI6MTczMTIzNTg4OC42NzUsInN1YiI6IjY3MzA5MDMwM2MxMDRkODhiZGM1YmUxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.30Shi7wDExdPZoBNRbjNL8i_hhgDb-i5w8Vpf6FGhC8";

export const fetchTrendingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await response.json();
  return data.results;
};
