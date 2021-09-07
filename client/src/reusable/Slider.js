import React from 'react'
import Slider from "react-slick";
import SliderImage from './SliderImage';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SERVER_API } from 'src/actions/actionTypes';

function ImageSlider({ images, setCoverImage, removeProductImage, CoverImage, selections }) {

    console.log("CHec", images)

    const silderRef = React.useRef()
    var settings = {
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }


    function SliderArrow(props) {
        const { onClick, direction } = props;
        return (
            <div
                style={{ display: "block", color: "#3399ff", border: "25px", }}
                onClick={onClick}
            >
                {direction === 'next' ? <i onClick={onClick} class="fas carousel-arrow-right fa-2x fa-arrow-circle-right"></i> : <i onClick={onClick} class="fas carousel-arrow-left fa-2x fa-arrow-circle-left"></i>}
            </div>
        );
    }

    return (
        <div>
            <Slider
                {...settings}
                ref={silderRef}
                rows={1}
                dotsClass={"slick-dots slick-thumb"}
                dots={true}
                arrows={true}
                slidesToShow={3}
                slidesToScroll={2}
                infinite={false}
                speed={500}
                nextArrow={<SliderArrow direction="next" onClick={() => silderRef.current.slickNext()} />}
                prevArrow={<SliderArrow direction="left" onClick={() => silderRef.current.slickPrev()} />}
                responsive={[
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            initialSlide: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]}
            >
                {images?.map((image, idx) => (
                    <SliderImage
                        CoverImage={CoverImage}
                        removeProductImage={removeProductImage}
                        setCoverImage={setCoverImage}
                        selections={selections}
                        imageStyles={{
                            width: "300px",
                            height: "300px",
                            objectFit: "contain",
                            display: "block"
                        }}
                        containerStyles={{ margin: "0 auto", position: "relative" }}
                        src={image?.filePath ? image.filePath : `${SERVER_API}${image.image_path}`}
                        image={image}
                        alt={image.fileName}
                        key={idx}
                    />
                ))}
            </Slider>
        </div >
    )
}

export default ImageSlider
