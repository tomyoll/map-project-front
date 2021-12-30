import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ImageSlider({ images }) {
  return (
    <Carousel
      showThumbs={false}
      statusFormatter={(current, total) => `${current} / ${total}`}
    >
      {images.map((image) => (
        <div key={Math.random().toString() + Date.now()}>
          <img
            src={image}
            alt=""
          />
        </div>
      ))}
    </Carousel>
  );
}
