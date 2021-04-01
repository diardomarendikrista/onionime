import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import FavouriteCard from '../components/FavouriteCard.jsx'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Container } from 'react-bootstrap';

import {
  setLoading,
} from '../store/actions/page'


export default function Home () {
  const baseURL = useSelector(state => state.anime.baseURL);
  const animeFavourite = useSelector(state => state.favourite.animeFavourite);
  const loading = useSelector(state => state.page.loading);
  const error = useSelector(state => state.page.error);

  const dispatch = useDispatch(); 
  const history = useHistory();

  useEffect( _ => {
    document.title = 'OnioNime - Favourite';
  }, [])

  useEffect( () => {
    dispatch(setLoading(false));
  // eslint-disable-next-line
  }, [baseURL])

  const goToHome = () => {
    history.push('/')
  }

  const emptyFavourite = () => {
    return (
      <div className="favourite-empty text-center">
        <h2 className="text-secondary">Oh noo...</h2>
        <h3 className="text-secondary">your favourite list is still empty</h3>
        <button onClick={() => goToHome()} className="btn btn-outline-secondary">get some favourite anime</button>
      </div>
    )
  }

  return (
    <Container className="text-center">
      <div>
        {loading ? <Loading /> : ''}
        {error ?  <Error /> : ''}
      </div>
      <hr />
      <div>
        <p className="text-left favourite-title">Your Favourite Anime</p>
      </div>
      {animeFavourite.length < 1 ? emptyFavourite() : ''}
      <div className="d-flex flex-wrap favourite-list">
        {
          animeFavourite.map(anime => (
            <FavouriteCard anime={anime} key={anime.id} />
          ))
        }
      </div>
    </Container>
  )
}
