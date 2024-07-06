import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import { fetchImages } from "./VacationHandler";
import { Text, Card } from "@mantine/core";

const ImageCard = ({ item }) => {
  return (
    <Card
      className="carousel-card"
      p="lg"
      shadow="lg"
      radius="md"
      component="a"
      href={`${item.imageUrl}`}
      target="_blank"
    >
      <div
        className="image-carousel"
        style={{
          backgroundImage: `url(${item.imageUrl})`,
        }}
      />{" "}
      <div className={"carousel-content"}>
        <Text size="lg" className={"image-title"} fw={500}>
          {item.title}{" "}
        </Text>
      </div>
    </Card>
  );
};

const ImagesCarousel = (props) => {
  const [images, setImages] = useState(props.images);
  const [imageError, setImageError] = useState(false);
  // fetching images of the attraction\ restaurant sent
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const fetchedImages = await fetchImages(setImages, props.q);
  //       setImages(fetchedImages);
  //     } catch (error) {}
  //   };

  //   fetchData();
  // }, [props.q]);

  return (
    <Carousel
      w={`${props.width}`}
      withIndicators
      className="carousel"
      slideSize={{ base: "100%" }}
      align="start"
      controlSize={40}
      classNames={{ control: "carousel-control" }}
    >
      {images && images.images ? (
        images.images.map((item, index) => (
          <Carousel.Slide key={[item, index]}>
            <ImageCard
              item={item}
              setImageError={setImageError}
              imageError={imageError}
            />
          </Carousel.Slide>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </Carousel>
  );
};

export default ImagesCarousel;
