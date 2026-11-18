from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash
from .models import EventPackage, Service, Blog, Venue, Gallery, Event, Transport, Booking, Contact, Client, Admin, Payment
from . import db
from datetime import datetime, date, timedelta

api = Blueprint('api', __name__)

@api.route('/packages', methods=['GET'])
def get_packages():
    try:
        pkgs = EventPackage.query.all()
        return jsonify([{
            'id': p.id,
            'name': p.name,
            'category': p.category,
            'image': p.image
        } for p in pkgs])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/venues', methods=['GET'])
def get_venues():
    try:
        venues = Venue.query.all()
        return jsonify([{
            'id': v.id,
            'name': v.name,
            'location': v.location,
            'price': v.price,
            'image': v.image
        } for v in venues])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/services', methods=['GET'])
def get_services():
    try:
        services = Service.query.all()
        return jsonify([{
            'id': s.id,
            'name': s.name,
            'image': s.image
        } for s in services])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/transports', methods=['GET'])
def get_transports():
    try:
        transports = Transport.query.all()
        return jsonify([{
            'id': t.id,
            'vehicle': t.vehicle,
            'image': t.image
        } for t in transports])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/events', methods=['GET'])
def get_events():
    try:
        category = request.args.get('type')
        query = Event.query
        if category:
            query = query.filter_by(category=category)
        events = query.all()
        return jsonify([{
            'id': ev.id,
            'name': ev.name,
            'price': ev.price,
            'food_type': ev.food_type,
            'pax': ev.pax,
            'room': ev.room,
            'city': ev.city,
            'category': ev.category,
            'image': ev.image,
            'venue_id': ev.venue_id,
            'venue': {'name': ev.venue.name} if ev.venue else None
        } for ev in events])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/blogs', methods=['GET'])
def get_blogs():
    try:
        blogs = Blog.query.order_by(Blog.blog_date.desc()).all()
        return jsonify([{
            'id': b.id,
            'title': b.title,
            'slug': b.slug,
            'short_description': b.short_description,
            'content': b.content,
            'image': b.image,
            'blog_date': b.blog_date.strftime("%Y-%m-%d") if b.blog_date else None
        } for b in blogs])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/galleries', methods=['GET'])
def get_galleries():
    try:
        galleries = Gallery.query.all()
        return jsonify([{
            'id': g.id,
            'image': g.image
        } for g in galleries])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/contact', methods=['POST'])
def contact():
    data = request.get_json() or request.form
    firstname = data.get('firstname', '')
    email = data.get('email', '')
    mobile_no = data.get('MobileNo', '')
    message = data.get('message', '')
    event_type = data.get('event_type', '')
    event_date = data.get('event_date', '')

    try:
        new_contact = Contact(
            firstname=firstname,
            email=email,
            mobile_no=mobile_no,
            message=message,
            event_type=event_type,
            event_date=event_date if event_date else None
        )
        db.session.add(new_contact)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Message sent successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@api.route('/book_event', methods=['POST'])
def book_event():
    data = request.get_json() or request.form
    try:
        booking = Booking(
            user_name=data.get('user_name'),
            user_email=data.get('user_email'),
            user_phone=data.get('user_phone'),
            event_id=data.get('event_id'),
            venue_id=data.get('venue_id'),
            service_id=data.get('service_id') or None,
            transport_id=data.get('transport_id') or None,
            event_date=data.get('event_date')
        )
        db.session.add(booking)
        db.session.commit()
        return jsonify({'success': True, 'booking_id': booking.id})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@api.route('/booking/<int:booking_id>', methods=['GET'])
def get_booking(booking_id):
    try:
        b = Booking.query.get_or_404(booking_id)
        return jsonify({
            'id': b.id,
            'user_name': b.user_name,
            'user_email': b.user_email,
            'user_phone': b.user_phone,
            'event_id': b.event_id,
            'venue_id': b.venue_id,
            'service_id': b.service_id,
            'transport_id': b.transport_id,
            'event_date': b.event_date.strftime("%Y-%m-%d") if b.event_date else None,
            'status': b.status
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@api.route('/payment/<int:booking_id>', methods=['POST'])
def process_payment(booking_id):
    data = request.get_json() or request.form
    try:
        booking = Booking.query.get_or_404(booking_id)
        method = data.get('payment_method')
        amount = int(str(data.get('amount', 0)).replace(',', ''))

        payment = Payment(
            booking_id=booking.id,
            amount=amount,
            payment_method=method,
            payment_status="Completed"
        )
        booking.status = "Confirmed"
        db.session.add(payment)
        db.session.commit()
        return jsonify({'success': True})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@api.route('/user_bookings', methods=['GET'])
def get_user_bookings():
    email = request.args.get('email')
    try:
        query = Booking.query
        if email:
            query = query.filter_by(user_email=email)
        bookings = query.order_by(Booking.booking_date.desc()).all()
        return jsonify([{
            'id': b.id,
            'user_name': b.user_name,
            'user_email': b.user_email,
            'event_id': b.event_id,
            'event': {'name': b.event.name} if b.event else None,
            'venue_id': b.venue_id,
            'venue': {'name': b.venue.name} if b.venue else None,
            'service_id': b.service_id,
            'service': {'name': b.service.name} if b.service else None,
            'transport_id': b.transport_id,
            'transport': {'vehicle': b.transport.vehicle} if b.transport else None,
            'event_date': b.event_date.strftime("%Y-%m-%d") if b.event_date else None,
            'status': b.status
        } for b in bookings])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json() or request.form
    email = data.get('email')
    password = data.get('password')
    try:
        user = Client.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            session['user_name'] = user.name
            return jsonify({
                'success': True,
                'user': {
                    'id': user.id,
                    'name': user.name,
                    'email': user.email,
                    'phone': user.phone,
                    'address': user.address,
                    'image': user.image
                }
            })
        return jsonify({'success': False, 'error': 'Invalid Email or Password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json() or request.form
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')
    address = data.get('address')
    try:
        if Client.query.filter_by(email=email).first():
            return jsonify({'success': False, 'error': 'Email already exists'}), 400
        hashed = generate_password_hash(password)
        new_client = Client(name=name, email=email, password=hashed, phone=phone, address=address)
        db.session.add(new_client)
        db.session.commit()
        return jsonify({'success': True})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@api.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json() or request.form
    username = data.get('username')
    password = data.get('password')
    try:
        admin = Admin.query.filter_by(name=username).first()
        if admin and check_password_hash(admin.password, password):
            session['admin_logged_in'] = True
            session['admin_id'] = admin.id
            session['admin_name'] = admin.name
            return jsonify({
                'success': True,
                'admin': {
                    'id': admin.id,
                    'name': admin.name,
                    'email': admin.email,
                    'phone': admin.phone,
                    'image': admin.image
                }
            })
        return jsonify({'success': False, 'error': 'Invalid Admin Credentials'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500