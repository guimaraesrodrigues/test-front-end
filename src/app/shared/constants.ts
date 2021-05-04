export const APIUrls = {
    FACTS: {
        GET_RANDOM: 'https://api.chucknorris.io/jokes/random',
        GET_WITH_QUERY: (query: string) =>
          `https://api.chucknorris.io/jokes/search?query=${query}`
      }
}