import React,{useState} from 'react'
import {Box, Button, HStack, Image, IconButton, Center} from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

import Spacer from './Spacer'

export default function ImageCarousel({images}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const toPrevSlide = () =>{

  }

  const toNextSlide = () =>{

  }

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev - 1) % images.length);
  };
  
  return (
    <Box>
      <Image
        src={`http://localhost:3065/${images[currentImageIndex].src}`}
        alt={images[currentImageIndex].src}
        width="100%"
        height="auto"
        mb={4}
      />
      <HStack justify="center" spacing={4}>
        <IconButton
          icon={<ArrowLeftIcon />}
          aria-label="Previous"
          onClick={toPrevSlide}
        />
        <IconButton
          icon={<ArrowRightIcon />}
          aria-label="Next"
          onClick={toNextSlide}
        />
      </HStack>
      <Spacer/>
      <Center>
        <HStack spacing={2}>
          {images.map((image, index) => (
            <Button
              key={index}
              size="sm"
              variant={index === currentImageIndex ? "solid" : "outline"}
              onClick={() => {
                // Set currentIndex to the clicked image index
              }}
            >
              {index + 1}
            </Button>
          ))}
        </HStack>
      </Center>
    </Box>
  );
}