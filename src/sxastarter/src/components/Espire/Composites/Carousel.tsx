import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Field, Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps, EditMode } from 'lib/component-props';
import Slider from 'react-slick';

type CarouselProps = ComponentProps & {
  params: { [key: string]: string };
  fields: {
    Title: Field<string>;
    Slide: Slide[];
  };
};
type Slide = {
  fields: {
    [key: string]: {
      [key: string]: {
        [key: string]: string;
      };
    };
  };
};
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};
export const Carousel = (props: CarouselProps): JSX.Element => {
  return (
    <div className={`carousel ${props.params.styles}`}>
      <Text field={props?.fields?.Title} />
      <Slider {...settings}>
        {props?.fields?.Slide?.map((slide, index) => {
          console.log(slide?.fields?.Image?.value?.src);
          return (
            <div key={index}>
              <img
                src={slide?.fields?.Image?.value?.src}
                alt={slide?.fields?.Image?.value?.alt as string}
              ></img>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default withDatasourceCheck()<CarouselProps>(Carousel);
