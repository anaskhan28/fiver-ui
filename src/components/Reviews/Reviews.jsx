import React from 'react'
import dislike from '../../assets/img/dislike.png'
import like from '../../assets/img/like.png'
import star from '../../assets/img/star.png'
import axios from '../../utils/baseurl.js'
import { useParams } from 'react-router-dom'
import noavatar from '../../assets/img/noavatar.jpeg';
import './Reviews.scss';
import Review from '../Review/Review'
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';


function Reviews({gigId}) {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['reviews'],
    queryFn: () =>
      axios.get(`/reviews/${gigId}`).then(
        (res) => {return res.data}
      )
      
  })

  const mutation = useMutation({
    mutationFn: (review) => {
      return axios.post('/reviews', review)
    },
    onSuccess:() => {
      queryClient.invalidateQueries(["reviews"])
    }
  })


  const handleSubmit = (e) =>{
    e.preventDefault();
    const desc = e.target[0].value
    const star = e.target[1].value
    mutation.mutate({gigId, desc, star})
  }

  return (
    <div>
           <div className="reviews">
            <h2>Reviews</h2>
            {isLoading? "Loading..." : error ? "Something went wrong!": 
            data.map((review) =>   <Review key={review._id} review={review} />)}

            <div className="add">
              <h3>Add a review</h3>
              <form className='addForm' action="" onSubmit={handleSubmit}>
                <input type="text" placeholder='write your opinion' />
                <select name="" id="">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                <button>Send</button>
              </form>
            </div>
          </div>
    </div>
  )
}

export default Reviews