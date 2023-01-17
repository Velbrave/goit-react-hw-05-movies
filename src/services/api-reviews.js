import axios from "axios";

const postService = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: "992077ad7a114ae4ce553bc055aefd4f",
    language: 'en-US',
    page: 1,
   
    
  
  }   
})

export const getPostReviews = async (movieId) => {
  const { data } = await postService.get(`movie/${movieId}/reviews`)
  return data.results
}