import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import '../../styles/manage_booking.css';
import '../../styles/manage_package.css';
import '../../styles/manage_event.css';
import '../../styles/manage_venue.css';
import '../../styles/manage_service.css';
import '../../styles/manage_transportation.css';
import '../../styles/manage_gallery.css';
import '../../styles/manage_blog.css';
import '../../styles/manage_user.css';

export default function AdminManagePage() {
  const location = useLocation();
  const path = location.pathname;
  const { showFlash } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Determine which management view is active
  let resource = 'user';
  let title = 'Manage Inquiries';
  if (path.includes('manage_package')) {
    resource = 'package';
    title = 'Manage Packages';
  } else if (path.includes('manage_event')) {
    resource = 'event';
    title = 'Manage Events';
  } else if (path.includes('manage_venue')) {
    resource = 'venue';
    title = 'Manage Venues';
  } else if (path.includes('manage_service')) {
    resource = 'service';
    title = 'Manage Services';
  } else if (path.includes('manage_transportation')) {
    resource = 'transportation';
    title = 'Manage Transportation';
  } else if (path.includes('manage_gallery')) {
    resource = 'gallery';
    title = 'Manage Gallery';
  } else if (path.includes('manage_blog')) {
    resource = 'blog';
    title = 'Manage Blogs';
  } else if (path.includes('manage_booking')) {
    resource = 'booking';
    title = 'Manage Bookings';
  } else if (path.includes('manage_payment')) {
    resource = 'payment';
    title = 'Manage Payments';
  } else if (path.includes('manage_client')) {
    resource = 'client';
    title = 'Manage Clients';
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (resource === 'package') {
        const pkgs = await apiService.getPackages();
        setData(pkgs);
      } else if (resource === 'event') {
        const evts = await apiService.getEvents();
        setData(evts);
      } else if (resource === 'venue') {
        const vns = await apiService.getVenues();
        setData(vns);
      } else if (resource === 'service') {
        const srvs = await apiService.getServices();
        setData(srvs);
      } else if (resource === 'transportation') {
        const trns = await apiService.getTransports();
        setData(trns);
      } else if (resource === 'gallery') {
        const gals = await apiService.getGalleries();
        setData(gals);
      } else if (resource === 'blog') {
        const blgs = await apiService.getBlogs();
        setData(blgs);
      } else if (resource === 'booking') {
        const bkgs = await apiService.getUserBookings();
        setData(bkgs);
      } else if (resource === 'payment') {
        setData([
          { id: 1, booking_id: 101, amount: 250000, payment_method: 'UPI', payment_status: 'Completed', payment_date: '2026-10-15' },
          { id: 2, booking_id: 102, amount: 75000, payment_method: 'Card', payment_status: 'Completed', payment_date: '2026-10-22' }
        ]);
      } else if (resource === 'client') {
        setData([
          { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', address: 'Jaipur, Rajasthan' },
          { id: 2, name: 'Pooja Verma', email: 'pooja@example.com', phone: '9123456789', address: 'Jaipur, Rajasthan' }
        ]);
      } else {
        // Contacts / Inquiries
        setData([
          { id: 1, firstname: 'Aarav Gupta', email: 'aarav@gmail.com', mobile_no: '9876543211', event_type: 'Wedding', event_date: '2026-12-15', message: 'Looking for a royal palace venue' },
          { id: 2, firstname: 'Simran Kaur', email: 'simran@gmail.com', mobile_no: '9811223344', event_type: 'Corporate Event', event_date: '2026-11-20', message: 'Annual conference inquiry' }
        ]);
      }
      setLoading(false);
    }
    load();
  }, [resource]);

  const handleBookingAction = (id, newStatus) => {
    setData((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    showFlash(`Booking #${id} marked as ${newStatus}`, 'success');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>{title}</h2>

      {loading ? (
        <p>Loading records...</p>
      ) : (
        <div style={{ background: '#fff', borderRadius: '8px', padding: '15px', overflowX: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          {resource === 'booking' && (
            <table className="table table-bordered table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Event Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.user_name}</td>
                    <td>{b.user_email}</td>
                    <td>{b.event?.name || '-'}</td>
                    <td>{b.event_date}</td>
                    <td>
                      <span className={`badge badge-${b.status === 'Confirmed' ? 'success' : b.status === 'Cancelled' ? 'danger' : 'warning'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        style={{ marginRight: '5px' }}
                        onClick={() => handleBookingAction(b.id, 'Confirmed')}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        style={{ marginRight: '5px' }}
                        onClick={() => handleBookingAction(b.id, 'Cancelled')}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleBookingAction(b.id, 'Pending')}
                      >
                        Pending
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {resource === 'package' && (
            <table className="table table-bordered table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Package Name</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {data.map((pkg) => (
                  <tr key={pkg.id}>
                    <td>{pkg.id}</td>
                    <td>
                      <img
                        src={`/static/admin/image/${pkg.image}`}
                        alt={pkg.name}
                        width="60"
                        height="40"
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                        onError={(e) => { e.currentTarget.src = '/static/user/image/gallery20.jpg'; }}
                      />
                    </td>
                    <td>{pkg.name}</td>
                    <td>{pkg.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {resource === 'event' && (
            <table className="table table-bordered table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Food</th>
                  <th>Pax</th>
                  <th>City</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {data.map((ev) => (
                  <tr key={ev.id}>
                    <td>{ev.id}</td>
                    <td>{ev.name}</td>
                    <td>₹ {ev.price}</td>
                    <td>{ev.food_type}</td>
                    <td>{ev.pax}</td>
                    <td>{ev.city}</td>
                    <td>{ev.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {resource === 'venue' && (
            <table className="table table-bordered table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.name}</td>
                    <td>{v.location}</td>
                    <td>₹ {v.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {resource === 'service' && (
            <table className="table table-bordered table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {data.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {resource === 'transportation' && (
            <table className="table table-bordered table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vehicle Name</th>
                </tr>
              </thead>
              <tbody>
                {data.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.vehicle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {resource === 'gallery' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px' }}>
              {data.map((g) => (
                <div key={g.id} style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
                  <img
                    src={`/static/user/image/${g.image}`}
                    alt="Gallery item"
                    style={{ width: '100%', height: '110px', objectFit: 'cover' }}
                    onError={(e) => { e.currentTarget.src = '/static/user/image/gallery1.jpg'; }}
                  />
                  <div style={{ padding: '6px', textAlign: 'center', fontSize: '12px' }}>
                    #{g.id}
                  </div>
                </div>
              ))}
            </div>
          )}

          {resource === 'blog' && (
            <table className="table table-bordered table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Slug</th>
                </tr>
              </thead>
              <tbody>
                {data.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.title}</td>
                    <td>{b.blog_date}</td>
                    <td>{b.slug}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {resource === 'payment' && (
            <table className="table table-bordered table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Booking ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>#{p.booking_id}</td>
                    <td>₹ {p.amount}</td>
                    <td>{p.payment_method}</td>
                    <td><span className="badge badge-success">{p.payment_status}</span></td>
                    <td>{p.payment_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {resource === 'client' && (
            <table className="table table-bordered table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {data.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {resource === 'user' && (
            <table className="table table-bordered table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Event Type</th>
                  <th>Date</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {data.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.firstname}</td>
                    <td>{u.email}</td>
                    <td>{u.mobile_no}</td>
                    <td>{u.event_type}</td>
                    <td>{u.event_date || '-'}</td>
                    <td>{u.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

