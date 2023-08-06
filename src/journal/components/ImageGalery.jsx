import { ImageList, ImageListItem } from "@mui/material";
import { PropTypes } from "prop-types";

export const ImageGalery = ({ images }) => {
  return (
    <ImageList sx={{ width: '100%', height: 'auto', '::-webkit-scrollbar': { display: 'none' } }} cols={4} rowHeight='auto'>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt='Imagen de la nota'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

ImageGalery.propTypes = {
  images: PropTypes.array
};
