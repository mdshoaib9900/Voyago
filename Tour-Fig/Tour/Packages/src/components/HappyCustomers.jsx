import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Dummy data
const testimonials = [
  {
    id: 1,
    name: 'Lyod Gomez',
    quote:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
  {
    id: 2,
    name: 'Lyod Gomez',
    quote:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Lyod Gomez',
    quote:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    id: 4,
    name: 'Lyod Gomez',
    quote:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.',
    avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
];

// Styled components
const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  gap: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  minWidth: '50%',
  maxWidth: '50%',
  scrollSnapAlign: 'start',
  borderRadius: '20px',
  boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
  padding: theme.spacing(5),
  position: 'relative',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
}));

const QuoteMark = styled('div')(({ position }) => ({
  position: 'absolute',
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#fdebd0',
  fontFamily: 'serif',
  ...(position === 'topLeft' && {
    top: 20,
    left: 20,
  }),
  ...(position === 'bottomRight' && {
    bottom: 20,
    right: 20,
  }),
}));

const NavigationButton = styled(IconButton)(({ active }) => ({
  backgroundColor: active ? 'orange' : '#eee',
  color: '#fff',
  width: 40,
  height: 40,
  '&:hover': {
    backgroundColor: active ? '#e69500' : '#ccc',
  },
}));

const HappyCustomer = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box sx={{ px: 3, pt: 8, pb: 5, backgroundColor: '#fff', maxWidth: '1280px', mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            fontFamily: 'Oswald, sans-serif',
            textTransform: 'uppercase',
          }}
        >
          Happy Customers Says
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <NavigationButton onClick={() => scroll('left')} active={canScrollLeft ? 1 : 0}>
            <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
          </NavigationButton>
          <NavigationButton onClick={() => scroll('right')} active={canScrollRight ? 1 : 0}>
            <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
          </NavigationButton>
        </Box>
      </Box>

      <ScrollContainer ref={scrollRef}>
        {testimonials.map((t) => (
          <TestimonialCard key={t.id}>
            <QuoteMark position="topLeft">“</QuoteMark>
            <Avatar
              src={t.avatar}
              alt={t.name}
              sx={{ width: 64, height: 64, mx: 'auto', mb: 2 }}
            />
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {t.name}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#444' }}>
              {t.quote}
            </Typography>
            <QuoteMark position="bottomRight">”</QuoteMark>
          </TestimonialCard>
        ))}
      </ScrollContainer>
    </Box>
  );
};

export default HappyCustomer;
