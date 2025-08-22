import React, { useState } from "react";
import { Grid, Card, CardMedia } from "@mui/material";
import mainImageDefault from "../assets/Rectangle39.png";
import image1 from "../assets/Rectangle40.png";
import image2 from "../assets/Rectangle41.png";
import image3 from "../assets/Rectangle42.png";

const ImageGallery = () => {
  const [mainImage, setMainImage] = useState(mainImageDefault);
  const [thumbnails, setThumbnails] = useState([image1, image2, image3]);

  const handleThumbnailClick = (clickedImage, index) => {
    const newThumbnails = [...thumbnails];
    newThumbnails[index] = mainImage;
    setMainImage(clickedImage);
    setThumbnails(newThumbnails);
  };

  return (
    <>
      <Card sx={{ borderRadius: 1 }}>
        <CardMedia
          component="img"
          image={mainImage}
          alt="Main"
          sx={{
            height: 550,
            objectFit: "cover",
            width: "100%",
          }}
        />
      </Card>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {thumbnails.map((img, idx) => (
          <Grid item xs={4} key={idx}>
            <Card
              sx={{
                borderRadius: 2,
                cursor: "pointer",
              }}
              onClick={() => handleThumbnailClick(img, idx)}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`thumb-${idx}`}
                sx={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ImageGallery;
