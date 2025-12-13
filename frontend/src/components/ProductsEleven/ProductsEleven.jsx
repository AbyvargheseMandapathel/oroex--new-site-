import React, { useEffect, useRef, useState } from 'react';
import './ProductsEleven.css';
import productsData from '../../data/products.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/*
  GSAP Horizontal Loop Helper
  (Standard helper function for seamless looping)
*/
function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
        totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    gsap.set(items, {
        xPercent: (i, el) => {
            let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
            return xPercents[i];
        }
    });
    gsap.set(items, { x: 0 });
    totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
            .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }
    tl.next = vars => toIndex(curIndex + 1, vars);
    tl.previous = vars => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
    }
    return tl;
}

const ProductsEleven = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const [activeVideo, setActiveVideo] = useState(null);
    const videoRefs = useRef({});

    // Duplicate data to ensure smooth loop
    const loopedData = [...productsData, ...productsData];

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const cards = gsap.utils.toArray('.p11-card');

        let loop;
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
            // Create the seamless loop ONLY on desktop
            loop = horizontalLoop(cards, {
                repeat: -1,
                paddingRight: 50
            });

            // Link loop to scroll
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "+=4000", // Increased distance for slower feel
                pin: true,
                scrub: 1,
                onUpdate: self => {
                    // Reduced speed multiplier to 0.5 for very smooth/slow control
                    loop.time(self.progress * loop.duration() * 0.5);
                }
            });

            // 3D Effect Logic
            const update3D = () => {
                const centerX = window.innerWidth / 2;

                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.left + rect.width / 2;
                    const dist = cardCenter - centerX;
                    const maxDist = window.innerWidth / 2;

                    let progress = 1 - Math.abs(dist) / maxDist;
                    progress = gsap.utils.clamp(0, 1, progress);

                    const scale = gsap.utils.interpolate(0.8, 1.1, progress);
                    const opacity = gsap.utils.interpolate(0.5, 1, progress);
                    const z = gsap.utils.interpolate(-100, 0, progress);
                    const rotateY = (dist / maxDist) * -45;

                    gsap.set(card, {
                        scale: scale,
                        opacity: opacity,
                        z: z,
                        rotationY: rotateY,
                        filter: `blur(${(1 - progress) * 4}px)`
                    });
                });
            };

            gsap.ticker.add(update3D);

            return () => {
                gsap.ticker.remove(update3D);
                if (loop) loop.kill();
            };
        });

        return () => {
            mm.revert();
        };
    }, []);

    const handlePlay = (id) => {
        setActiveVideo(id);
        setTimeout(() => {
            if (videoRefs.current[id]) {
                videoRefs.current[id].play();
            }
        }, 100);
    };

    const handleClose = () => {
        if (activeVideo && videoRefs.current[activeVideo]) {
            videoRefs.current[activeVideo].pause();
        }
        setActiveVideo(null);
    };

    return (
        <section className="products-eleven-section" ref={sectionRef}>
            <div className="p11-header">
                <h2>Infinite <span className="p11-accent">Loop</span></h2>
                <p>Seamless 3D Experience</p>
            </div>

            <div className="p11-viewport">
                <div className="p11-container" ref={containerRef}>
                    {loopedData.map((product, index) => (
                        <div key={`${product.id}-${index}`} className="p11-card">
                            <div className="p11-card-inner">
                                <div className="p11-media" onClick={() => handlePlay(product.id)}>
                                    <img src={product.image} alt={product.title} className="p11-img" />
                                    <div className="p11-overlay">
                                        <div className="p11-play-btn">
                                            <Play size={32} fill="currentColor" />
                                        </div>
                                        <span>VIEW DEMO</span>
                                    </div>
                                    <div className="p11-badge">{product.category}</div>
                                </div>

                                <div className="p11-content">
                                    <div className="p11-number">0{(index % productsData.length) + 1}</div>
                                    <h3 className="p11-title">{product.title}</h3>
                                    <p className="p11-desc">{product.description}</p>
                                    <div className="p11-footer">
                                        <span className="p11-price">{product.price}</span>
                                        <button className="p11-btn">
                                            <ArrowUpRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="p11-modal-overlay" onClick={handleClose}>
                    <div className="p11-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="p11-close-btn" onClick={handleClose}>
                            <X size={24} />
                        </button>
                        <video
                            ref={el => videoRefs.current[activeVideo] = el}
                            src={productsData.find(p => p.id === activeVideo)?.videoUrl}
                            controls
                            className="p11-modal-video"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductsEleven;
