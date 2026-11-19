import React from 'react';
import ContactCTA from '../components/ContactCTA';
import '../styles/about.css';

export default function About() {
  return (
    <div className="about-page-root">
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1> About us </h1>
          <p>
            “Our project was developed by a passionate team of three developers who combined
            creativity and technical expertise to bring this event management website to life.”
          </p>
        </div>
      </section>

      <div className="about-container">
        <div className="abimage-container">
          <img
            src="https://cdn0.weddingwire.in/article/8163/3_2/1280/jpg/113618-cover-image-.jpeg"
            alt="Event Company Image"
          />
        </div>

        <div className="content-container">
          <h2>OUR VISION</h2>
          <p>
            We believe every event should be unique. Our team constantly explores fresh ideas,
            innovative designs, and personalized touches to ensure that no two celebrations feel
            the same. From planning to execution, we strive for perfection. Attention to detail,
            flawless coordination, and high-quality standards define our approach, ensuring that
            every event exceeds expectations. Trust is the foundation of our relationships.
          </p>
        </div>
      </div>

      <div className="about-container reverse">
        <div className="content-container">
          <h2>Our Mission</h2>
          <p>
            We strive to deliver exceptional experiences by blending creativity with precision. Our
            mission is to make every event memorable and impactful. With a dedicated team of
            professionals, we transform ideas into extraordinary realities, ensuring that every
            detail reflects your vision. From concept development to flawless execution, we bring
            innovation, passion, and expertise to every stage of planning.
          </p>
        </div>

        {/* Image second */}
        <div className="image-container1">
          <img
            src="https://www.vancopayments.com/hs-fs/hubfs/A%20group%20of%20non-profit%20event%20management%20employees%20discussing%20their%20next%20event.jpeg?width=1470&height=1103&name=A%20group%20of%20non-profit%20event%20management%20employees%20discussing%20their%20next%20event.jpeg"
            alt="Mission Image"
          />
        </div>
      </div>

      <div className="about-content">
        <b>
          <h1> DREAM EVENT</h1>
        </b>
        <p>
          At Dream Event Company, we believe every event tells a story and we’re here to make yours
          unforgettable. As a full-service event management company, we specialize in creating
          experiences that inspire, connect, and leave lasting impressions. From weddings and social
          celebrations to corporate functions, our team brings creativity, precision, and passion
          to every detail. With a commitment to excellence, we transform ordinary occasions into
          extraordinary memories by blending innovative design, seamless coordination, and
          personalized touches that reflect your unique vision. Our clients trust us to handle
          every aspect of planning with professionalism and care, ensuring a stress-free journey
          from the first consultation to the final applause. Whether it’s an intimate gathering or a
          grand celebration, we pride ourselves on delivering events that not only meet expectations
          but exceed them leaving guests with moments they’ll cherish for a lifetime.
        </p>
      </div>

      <div className="developer-section">
        <div className="dev-head">
          <b>
            <h1>DEVELOPERS</h1>
          </b>
        </div>
        <div className="developers">
          <div className="developer-card">
            <img
              src="https://imgproxy.attic.sh/LzcFLNsuSZQv90MWhNUjU4G6-U5qp0EMVyrcKFGo67k/rs:fit:768:768:1:1/t:1:FF00FF:false:false/pngo:false:true:256/aHR0cHM6Ly9hdHRp/Yy5zaC90YTJpZGNx/dGx1MWk1eWptZ2Q1/cm40bDBtbGJj.png"
              alt="Developer 1"
            />
            <h3>Rangrej Ayan</h3>
            <p>
              “Frontend Developer specializing in crafting responsive, user‑friendly interfaces with
              modern web technologies.” “Experienced in translating design concepts into
              interactive, accessible, and high‑performance applications.” Proficient in HTML, CSS,
              JavaScript, and frameworks.
            </p>
          </div>
          <div className="developer-card">
            <img
              src="https://imgproxy.attic.sh/LzcFLNsuSZQv90MWhNUjU4G6-U5qp0EMVyrcKFGo67k/rs:fit:768:768:1:1/t:1:FF00FF:false:false/pngo:false:true:256/aHR0cHM6Ly9hdHRp/Yy5zaC90YTJpZGNx/dGx1MWk1eWptZ2Q1/cm40bDBtbGJj.png"
              alt="Developer 2"
            />
            <h3>Shaikh Samir</h3>
            <p>
              Backend Developer specializing in scalable systems and robust application
              architecture. “Backend Developer specializing in building scalable systems and robust
              application architectures.” “Experienced in designing APIs, managing databases, and
              optimizing server-side performance.”
            </p>
          </div>
          <div className="developer-card">
            <img
              src="https://imgproxy.attic.sh/LzcFLNsuSZQv90MWhNUjU4G6-U5qp0EMVyrcKFGo67k/rs:fit:768:768:1:1/t:1:FF00FF:false:false/pngo:false:true:256/aHR0cHM6Ly9hdHRp/Yy5zaC90YTJpZGNx/dGx1MWk1eWptZ2Q1/cm40bDBtbGJj.png"
              alt="Developer 3"
            />
            <h3>Reyyan Qureshi</h3>
            <p>
              “Specializing in creating clear, structured, and user‑friendly documentation that
              simplifies complex systems.” “Transforming technical knowledge into accessible
              guides, manuals, and reference materials for diverse audiences.” Ensuring every
              document not only informs but empowers users.
            </p>
          </div>
        </div>
      </div>

      <ContactCTA />
    </div>
  );
}

