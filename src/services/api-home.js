import axios from "axios";

const postService = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: "992077ad7a114ae4ce553bc055aefd4f",
    
  
  }   
})

export const getPost = async () => {
  const { data } = await postService.get('trending/all/day')
  return data.results
}
