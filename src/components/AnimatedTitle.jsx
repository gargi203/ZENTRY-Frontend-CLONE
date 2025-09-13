import React,{useRef,useEffect} from 'react';
import gsap from 'gsap';
import About from './About.jsx';
const AnimatedTitle = ({ title, containerClass }) => {
    const containerRef=useRef(null);
    useEffect(()=>{
        const ctx=gsap.context(()=>{
            const titleAnimation=gsap.timeline({scrollTrigger:{
                trigger:containerRef.current,
                start:'100 bottom',
                end:'center bottom',
                toggleActions:'play none none reverse'//if you want an animation to play once when scrolling forward and never get reset or replayed we use toggleActions
            }});
            titleAnimation.to('.animated-word',{
                opacity:1,
                transform:'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
                ease:'power2.inOut',
                stagger:0.02,
            })
        },containerRef)
        return ()=>ctx.revert();// Clean up on unmount


    },[]);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass || ''}`}>
      {title.split('<br/>').map((line, index) => (
        <div key={index} className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3">
          {line.split(' ').map((word, i) => (
            <span key={i} className="animated-word" dangerouslySetInnerHTML={{ __html: word }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
