import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import VenueCard from '../components/VenueCard';
import PackageCard from '../components/PackageCard';
import ServiceCard from '../components/ServiceCard';
import BlogCard from '../components/BlogCard';
import EventCard from '../components/EventCard';
import ContactCTA from '../components/ContactCTA';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [venues, setVenues] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [events, setEvents] = useState([]);

  // Gallery slider state
  const [slideIndex, setSlideIndex] = useState(0);

  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    async function loadData() {
      const [pkgs, vns, srvs, blgs, gals, evts] = await Promise.all([
        apiService.getPackages(),
        apiService.getVenues(),
        apiService.getServices(),
        apiService.getBlogs(),
        apiService.getGalleries(),
        apiService.getEvents(),
      ]);
      setPackages(pkgs.slice(0, 9));
      setVenues(vns.slice(0, 8));
      setServices(srvs.slice(0, 8));
      setBlogs(blgs.slice(0, 3));
      setGalleries(gals.slice(0, 24));
      setEvents(evts.slice(0, 12));
    }
    loadData();
  }, []);

  // Gallery auto-slide
  useEffect(() => {
    if (!galleries.length) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % galleries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [galleries.length]);

  const nextSlide = () => {
    if (!galleries.length) return;
    setSlideIndex((prev) => (prev + 1) % galleries.length);
  };

  const prevSlide = () => {
    if (!galleries.length) return;
    setSlideIndex((prev) => (prev - 1 + galleries.length) % galleries.length);
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const faqs = [
    {
      question: 'What makes Dream Events different from other wedding planners?',
      answer:
        'We bring a blend of creativity, local expertise, and personal care. Many call us the best wedding planners in Udaipur because we focus on making the process stress-free and deeply personal.',
    },
    {
      question: 'Can you suggest the best wedding venues in Jaipur?',
      answer:
        'Yes. Jaipur is full of incredible options-heritage hotels, luxury resorts, and palaces. We help couples shortlist the finest wedding venues in Jaipur that suit their guest numbers, budget, and style.',
    },
    {
      question: 'Do you plan weddings at venues in Jodhpur?',
      answer:
        'Yes. We have planned weddings in some of the best wedding venues in Jodhpur, from spectacular forts and stunning palaces, to luxury heritage hotels and private villas, anywhere that can bring the royal Rajasthani vibe to life.',
    },
    {
      question: 'What makes you choose Udaipur as a wedding destination?',
      answer:
        'Udaipur is known as the “City of Lakes” for a reason. The beautiful palaces and lakeside venues make it one of the most romantic wedding locations in the world. As the best wedding planner in Udaipur, we can provide you with access to hidden gems and exclusive spaces.',
    },
    {
      question: 'Will you plan weddings in Chandigarh?',
      answer:
        'Yes-we work with couples to find the best wedding venues in Chandigarh and incorporate a combination of modern elegance and the charm of tradition for weddings that feel both beautiful and like home.',
    },
  ];

  return (
    <div className="home-page-root">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1> Manage Your Events Easily </h1>
          <p> Wedding | Parties | Conferences </p>
        </div>
      </section>

      {/* ABOUT SPLIT */}
      <section className="about-split">
        <div className="about-left">
          <img src="/static/user/image/gallery1.jpg" alt="Event Image" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="about-right">
          <div className="about-text">
            <h2>Dream Event Management</h2>
            <p>
              Putting all the beautiful pieces together and crafting one-of-a-kind wedding,
              concerts and corporate event experiences of all shapes and sizes, we at Dream Events
              are known as the best event management . As the best event management, we have
              designed and produced events across the globe, ranging from an intimate wedding,
              corporate, birthday and social for many people to a grand-scale wedding for more than
              thousands. As the best event management, we take pride in being the architects of
              your most momentous life event. Renowned for our exceptional craftsmanship, we have
              earned the esteemed title of the best event management. And the results are nothing
              less than MAGIC!
            </p>
          </div>
        </div>
      </section>

      {/* BLOG CTA CARD */}
      <section className="blog-cta">
        <div className="blog-cta-container">
          <div className="blog-cta-text">
            <h2>Explore Our Event Stories</h2>
            <p>
              Get inspired by real weddings, grand celebrations and corporate events we’ve
              beautifully crafted. Discover trends, ideas and behind-the-scenes moments in our
              blogs.
            </p>
            <div className="blog-action">
              <a
                className="blog-btn"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/Blogs');
                }}
              >
                Read Our Blogs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VENUES */}
      <section className="venues">
        <h2>Our Venues</h2>
        <div className="venue-wrapper">
          {venues.map((v) => (
            <VenueCard key={v.id} venue={v} />
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="packages-section">
        <h2>Our Packages</h2>
        <div className="packages-wrapper">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} variant="home" />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <div className="services-header">
          <div className="services-left">
            <h2>
              <span className="experience">The Experience</span>
              <br />
              <span className="explore">Explore</span>
              <span className="services">Services</span>
            </h2>
          </div>

          <div className="services-right">
            <p>
              We offer a wide range of high-quality services to meet your unique needs. Our
              dedicated team ensures each project is handled with professionalism and attention
              to detail, delivering the best results every time.
            </p>
          </div>
        </div>
        <div className="swiper-wrapper">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* DREAM EVENT */}
      <section className="dream-event">
        <div className="dream-overlay"></div>
        <div className="dream-container">
          <div className="dream-text-box">
            <h2>
              Unforgettable Moments : Your Dream Event Starts Here with The West Event Planner !
            </h2>

            <p>
              At The West Event Planner, we believe that every celebration tells a story, and every
              story deserves to be unforgettable. From intimate gatherings to grand celebrations,
              we turn your vision into reality with creativity and care.
            </p>

            <p>
              Our experienced team manages every detail, from planning and decor to coordination
              and execution, ensuring your event flows seamlessly. We focus on elegance,
              precision, and memorable experiences.
            </p>

            <p>
              Whether it’s a wedding, corporate event, or personal celebration, we work closely
              with you to understand your dreams and deliver beyond expectations.
            </p>

            <p>
              With trusted vendors, innovative ideas, and a passion for excellence, The West Event
              Planner creates moments you and your guests will cherish forever.
            </p>
          </div>
        </div>
      </section>

      {/* BLOG LIST */}
      <section className="blog-page">
        <div className="blog-heading">
          <h3>Latest Blogs</h3>
        </div>
        <div className="blog-wrapper">
          {blogs.map((b) => (
            <BlogCard key={b.id} blog={b} linkToSlug={false} />
          ))}
        </div>
      </section>

      {/* EVENT GALLERY SECTION */}
      <section className="gallery-section">
        <h2 className="gallery-title">Our Event Gallery</h2>
        <p className="gallery-subtitle">Real moments from our recent events</p>

        <div className="slider">
          <button className="nav prev" onClick={prevSlide}>
            &#10094;
          </button>

          <div
            className="gallery-slider-container"
            style={{
              transform: `translateX(-${slideIndex * 100}%)`,
              transition: 'transform 0.5s ease-in-out',
            }}
          >
            {galleries.map((g) => {
              const src = g.image.startsWith('/')
                ? g.image
                : (g.image.startsWith('gallery')
                    ? `/static/user/image/${g.image}`
                    : `/static/admin/image/${g.image}`);
              return (
                <div className="gallery-slide" key={g.id}>
                  <img
                    src={src}
                    alt="Gallery Image"
                    onError={(e) => {
                      e.currentTarget.src = '/static/user/image/gallery1.jpg';
                    }}
                  />
                </div>
              );
            })}
          </div>

          <button className="nav next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>

        {/* Dots */}
        <div className="slider-dots">
          {galleries.map((_, i) => (
            <span
              key={i}
              className={i === slideIndex ? 'active' : ''}
              onClick={() => setSlideIndex(i)}
            ></span>
          ))}
        </div>
      </section>

      {/* CONTACT CTA */}
      <ContactCTA />

      {/* EVENT CARDS */}
      <div className="card-wrapper">
        {events.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>

      {/* FAQ SECTION */}
      <div className="faq-page">
        <div className="faq-heading">
          <h1>FAQs About The Best Event Management</h1>
        </div>
        <div className="faq-container">
          {faqs.map((faq, idx) => (
            <div className="faq-item" key={idx}>
              <div
                className="faq-question"
                onClick={() => toggleFaq(idx)}
                style={{ cursor: 'pointer' }}
              >
                {faq.question}
                <span className="faq-icon">{activeFaq === idx ? '-' : '+'}</span>
              </div>
              <div className={`faq-answer ${activeFaq === idx ? 'show' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WORKFLOW ZIGZAG */}
      <div className="workflow-zigzag">
        <div className="icon-head">
          <b>HOW DO WE WORK</b>
          <h3>6 Easy Steps to a hassle-free perfection</h3>
        </div>

        <div className="icons">
          <div className="zig-step top">
            <div className="step-desc">
              <p>We understand your needs and discuss the project goals.</p>
            </div>
            <div className="fa-solid ">
              <img src="/static/user/image/huawei-meetime-svgrepo-com (1).svg" alt="Meet" />
            </div>
            <span>Meet</span>
            <div className="arrow-line"></div>
          </div>

          <div className="zig-step bottom">
            <div className="fa-solid ">
              <img
                src="/static/user/image/concept-creation-creative-svgrepo-com.svg"
                alt="Concept"
              />
            </div>
            <span>Concept</span>
            <div className="step-desc">
              <p>Creative ideas and planning for perfect execution.</p>
            </div>
            <div className="arrow-line"></div>
          </div>

          <div className="zig-step top">
            <div className="step-desc">
              <p>Detailed planning to ensure smooth workflow.</p>
            </div>
            <div className="fa-solid ">
              <img src="/static/user/image/schedule-svgrepo-com.svg" alt="Plan" />
            </div>
            <span>Plan</span>
            <div className="arrow-line"></div>
          </div>

          <div className="zig-step bottom">
            <div className="fa-solid ">
              <img
                src="/static/user/image/schedule-calendar-svgrepo-com.svg"
                alt="Schedule"
              />
            </div>
            <span>Schedule</span>
            <div className="step-desc">
              <p>Timely scheduling for flawless execution.</p>
            </div>
            <div className="arrow-line"></div>
          </div>

          <div className="zig-step top">
            <div className="step-desc">
              <p>Professional execution with full dedication.</p>
            </div>
            <div className="fa-solid ">
              <img src="/static/user/image/execute-svgrepo-com.svg" alt="Execute" />
            </div>
            <span>Execute</span>
            <div className="arrow-line"></div>
          </div>

          <div className="zig-step bottom">
            <div className="fa-solid ">
              <img
                src="/static/user/image/success-filled-svgrepo-com.svg"
                alt="Success"
              />
            </div>
            <span>Success</span>
            <div className="step-desc">
              <p>Delivering perfection and client satisfaction.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

