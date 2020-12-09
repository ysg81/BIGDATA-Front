import { generateActions } from "./utils/storeUtils"

export const GET_MOVIE_POINT_EXPECT = generateActions('GET_MOVIE_POINT_EXPECT')
export const CLEAR_MOVIE_POINT_EXPECT = 'CLEAR_MOVIE_POINT_EXPECT'

export const getMoviePointExpect = moiveInfo => ({
  type:GET_MOVIE_POINT_EXPECT.REQUEST,
  payload:{
    moiveInfo,
  }
})

export const clearMoviePointExpect = () => ({
  type:CLEAR_MOVIE_POINT_EXPECT
})