import {
  initialPackages,
  initialVenues,
  initialServices,
  initialTransports,
  initialEvents,
  initialBlogs,
  initialGalleries,
  initialBookings,
} from '../data/mockData';

// Helper to get stored items or seed from mock
const getStored = (key, fallback) => {
  try {
    const data = localStorage.getItem(`event_${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = (key, value) => {
  try {
    localStorage.setItem(`event_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export const apiService = {
  async getPackages() {
    try {
      const res = await fetch('/api/packages');
      if (res.ok) return await res.json();
    } catch {}
    return getStored('packages', initialPackages);
  },

  async getVenues() {
    try {
      const res = await fetch('/api/venues');
      if (res.ok) return await res.json();
    } catch {}
    return getStored('venues', initialVenues);
  },

  async getServices() {
    try {
      const res = await fetch('/api/services');
      if (res.ok) return await res.json();
    } catch {}
    return getStored('services', initialServices);
  },

  async getTransports() {
    try {
      const res = await fetch('/api/transports');
      if (res.ok) return await res.json();
    } catch {}
    return getStored('transports', initialTransports);
  },

  async getEvents(category = null) {
    let events = [];
    try {
      const url = category ? `/api/events?type=${encodeURIComponent(category)}` : '/api/events';
      const res = await fetch(url);
      if (res.ok) events = await res.json();
    } catch {}
    if (!events.length) {
      events = getStored('events', initialEvents);
    }
    if (category) {
      return events.filter((e) => e.category === category);
    }
    return events;
  },

  async getEventById(id) {
    const events = await this.getEvents();
    return events.find((e) => String(e.id) === String(id));
  },

  async getBlogs() {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) return await res.json();
    } catch {}
    return getStored('blogs', initialBlogs);
  },

  async getBlogBySlug(slug) {
    const blogs = await this.getBlogs();
    return blogs.find((b) => b.slug === slug);
  },

  async getGalleries() {
    try {
      const res = await fetch('/api/galleries');
      if (res.ok) return await res.json();
    } catch {}
    return getStored('galleries', initialGalleries);
  },

  async submitContact(formData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) return await res.json();
    } catch {}

    const contacts = getStored('contacts', []);
    contacts.push({ id: Date.now(), ...formData, created_at: new Date().toISOString() });
    setStored('contacts', contacts);
    return { success: true };
  },

  async createBooking(bookingData) {
    try {
      const res = await fetch('/api/book_event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      if (res.ok) return await res.json();
    } catch {}

    const bookings = getStored('bookings', initialBookings);
    const newId = bookings.length ? Math.max(...bookings.map((b) => b.id)) + 1 : 101;
    const newBooking = {
      id: newId,
      ...bookingData,
      status: 'Pending',
      booking_date: new Date().toISOString(),
    };
    bookings.push(newBooking);
    setStored('bookings', bookings);
    return { success: true, booking_id: newId };
  },

  async getBookingById(id) {
    try {
      const res = await fetch(`/api/booking/${id}`);
      if (res.ok) return await res.json();
    } catch {}
    const bookings = getStored('bookings', initialBookings);
    return bookings.find((b) => String(b.id) === String(id));
  },

  async processPayment(bookingId, paymentMethod, amount) {
    try {
      const res = await fetch(`/api/payment/${bookingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_method: paymentMethod, amount }),
      });
      if (res.ok) return await res.json();
    } catch {}

    const bookings = getStored('bookings', initialBookings);
    const idx = bookings.findIndex((b) => String(b.id) === String(bookingId));
    if (idx !== -1) {
      bookings[idx].status = 'Confirmed';
      setStored('bookings', bookings);
    }
    return { success: true };
  },

  async getUserBookings(email) {
    try {
      const res = await fetch(`/api/user_bookings?email=${encodeURIComponent(email)}`);
      if (res.ok) return await res.json();
    } catch {}
    const bookings = getStored('bookings', initialBookings);
    if (!email) return bookings;
    return bookings.filter(
      (b) => (b.user_email && b.user_email.toLowerCase() === email.toLowerCase())
    );
  },
};

