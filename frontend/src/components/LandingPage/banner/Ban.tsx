import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppSelector } from '../../../hooks/useAppDispatch';
import './image.css'

const ImageReveal: React.FC = () => {
  const revealRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token.token);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1.15, ease: 'power3.inOut' } });

    if (revealRef.current && imgRef.current && titleRef.current) {
      const reveal = revealRef.current;
      const img = imgRef.current;
      const title = titleRef.current;

      tl.to(reveal, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' })
        .to(reveal, { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' })
        .to(reveal, { clipPath: 'polygon(100% 0%, 0% 0%, 0% 0%, 100% 0%)', duration: 0 }, '>')
        .to(img, { scale: 1.2, duration: 0 }, '>')
        .to(reveal, { clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)' })
        .to(img, { scale: 1 }, '<')
        .to(title, { opacity: 1, y: 0, duration: 1.2, ease: 'Power4.inOut' }, '-=.8');
    }
  }, []);

  return (
    <div className="img-reveal" ref={revealRef}>
      <img
        src="https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="herobanner"
        ref={imgRef}
      />
      <div className="content-wrapper">
        <h1 className="img-reveal__title" ref={titleRef}>
         Your Own Advent Calendar
        </h1>
        <h2 className='img-reveal__subtitle'>Immerse yourself in the magic of the season as you design and personalize each day's surprise, tailored to delight and inspire.</h2>

        {!token ? (
          <Link to="/login" className='bannerbutton'>
            <Button color="inherit">Login</Button>
          </Link>
        ) : (
          <Link to="/panel" className='bannerbutton'>
            <Button color="inherit">Create calendar</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ImageReveal;