import React from "react";
import dislike from "../../assets/img/dislike.png";
import like from "../../assets/img/like.png";
import star from "../../assets/img/star.png";
import axios from "../../utils/baseurl.js";
import { useParams } from "react-router-dom";
import noavatar from "../../assets/img/noavatar.jpeg";
import { useQuery } from "@tanstack/react-query";

import "./Review.scss";

function Review({ review }) {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      axios.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <>
      <div className="review">
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="user">
            <img
              className="pp"
              src={data.img || noavatar}
              alt=""
            />
            <div className="info">
              <span>{data.username}</span>
              <div className="country">
                <span>{data.country}</span>
              </div>
            </div>
          </div>
        )}
        <div className="stars">
          {Array(review.star)
            .fill()
            .map((item, i) => (
              <img src={star} alt="" key={i} />
            ))}
          <span>{review.star}</span>
        </div>
        <p>{review.desc}</p>
        <div className="helpful">
          <span>Helpful?</span>
          <img src={like} alt="" />
          <span>Yes</span>
          <img src={dislike} alt="" />
          <span>No</span>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Review;
