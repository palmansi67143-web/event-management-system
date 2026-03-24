from flask import Blueprint, render_template, request, redirect, url_for, flash, session, current_app, jsonify
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
import os, time,re
from .models import Admin, Contact, EventPackage, Event, Venue, Service, Transport, Gallery, Blog, Booking, Client, Payment
from slugify import slugify
from functools import wraps
from . import db
from datetime import datetime, date, timedelta
import pandas as pd
from io import BytesIO
from io import StringIO
from reportlab.platypus import SimpleDocTemplate, Table
from sqlalchemy import extract
from flask import make_response

auth = Blueprint('auth', __name__)

# ✅ YEH ADD KARO - har template mein admin automatically available hoga
@auth.context_processor
def inject_admin():
    admin = None
    if session.get('admin_logged_in') and session.get('admin_id'):
        admin = Admin.query.get(session['admin_id'])
    return dict(admin=admin)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# ================== DECORATORS ==================

def user_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('user_id'):
            flash("Please login first", "error")
            return redirect(url_for('auth.user_login'))  # ✅ FIX: user_login pe redirect
        return f(*args, **kwargs)
    return decorated_function

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin_logged_in'):
            flash("Please login as admin first", "error")
            return redirect(url_for('auth.admin_login'))  # ✅ admin_login pe redirect
        return f(*args, **kwargs)
    return decorated_function


# ================== ADMIN PROTECTION (Before Request) ==================

@auth.before_app_request
def protect_admin_panel():
    """
    /admin/* routes ko protect karo.
    Sirf /admin (login page) ko allow karo bina session ke.
    """
    if request.path.startswith('/admin'):
        # ✅ FIX: Exact '/admin' path (login page) ko allow karo
        # Baaki sab /admin/* routes ke liye session check karo
        if request.path == '/admin' or request.path == '/admin/':
            return None  # Login page freely accessible hai
        
        if not session.get('admin_logged_in'):
            flash("Admin access required. Please login.", "error")
            return redirect(url_for('auth.admin_login'))


# ================== USER AUTH ==================

@auth.route('/register', methods=['GET', 'POST'])
def register():
    # ✅ FIX: Agar admin logged in hai to register page mat dikhao
    if session.get('admin_logged_in'):
        return redirect(url_for('auth.dashboard'))
    
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        phone = request.form.get('phone')
        address = request.form.get('address')

        if Client.query.filter_by(email=email).first():
            flash("Email already exists", "error")
            return redirect(url_for('auth.register'))

        hashed_password = generate_password_hash(password)
        user = Client(name=name, email=email, password=hashed_password, phone=phone, address=address)
        db.session.add(user)
        db.session.commit()
        flash("Registration Successful. Please Login", "success")
        return redirect(url_for('auth.user_login'))
    return render_template("user/register.html")


@auth.route('/login', methods=['GET', 'POST'])
def user_login():
    # ✅ FIX: Agar admin logged in hai to user login page mat dikhao
    if session.get('admin_logged_in'):
        return redirect(url_for('auth.dashboard'))
    
    # Agar user already logged in hai
    if session.get('user_id'):
        return redirect(url_for('auth.event'))

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = Client.query.filter_by(email=email).first()

        if user and check_password_hash(user.password, password):
            # ✅ FIX: Session clear karo pehle (admin session remove ho jaye)
            session.clear()
            session['user_id'] = user.id
            session['user_name'] = user.name
            flash("Login Successful", "success")
            return redirect(url_for('auth.event'))
        else:
            flash("Invalid Email or Password", "error")

    return render_template("user/login.html")


@auth.route('/logout')
def user_logout():
    # ✅ Sirf user session clear karo, admin session nahi
    session.pop('user_id', None)
    session.pop('user_name', None)
    flash("Logged out successfully", "success")
    return redirect(url_for('auth.user_login'))  # ✅ User login page pe jao


@auth.route('/client_profile', methods=['GET', 'POST'])
@user_required
def client_profile():
    user = Client.query.get(session['user_id'])
    if request.method == 'POST':
        user.name = request.form.get('name')
        user.email = request.form.get('email')
        user.phone = request.form.get('phone')
        user.address = request.form.get('address')
        file = request.files.get('image')
        if file and allowed_file(file.filename):
            upload_dir = os.path.join(current_app.root_path, 'static', 'user', 'image')
            os.makedirs(upload_dir, exist_ok=True)
            filename = f"{int(time.time())}_{secure_filename(file.filename)}"
            file.save(os.path.join(upload_dir, filename))
            user.image = filename
        db.session.commit()
        flash("Profile Updated Successfully", "success")
        return redirect(url_for('auth.client_profile'))
    return render_template("user/client_profile.html", user=user)


@auth.route('/booking_history')
@user_required
def booking_history():
    user = Client.query.get(session['user_id'])
    bookings = Booking.query.filter_by(user_email=user.email).order_by(Booking.booking_date.desc()).all()
    return render_template("user/booking_history.html", bookings=bookings, user=user)


@auth.route('/event_package')
def event_package():
    packages = EventPackage.query.all()
    return render_template("user/event_package.html", packages=packages)


@auth.route('/event', methods=['GET', 'POST'])
def event():
    events = Event.query.all()
    return render_template("user/event.html", events=events, boolean=True)


@auth.route('/Blogs', methods=['GET', 'POST'])
def Blogs():
    blogs = Blog.query.order_by(Blog.blog_date.desc()).all()
    return render_template("user/Blogs.html", boolean=True, blogs=blogs)


@auth.route('/about', methods=['GET', 'POST'])
def about():
    return render_template("user/about.html", boolean=True)


@auth.route('/gallery')
def gallery():
    galleries = Gallery.query.all()
    return render_template('user/gallery.html', galleries=galleries)


@auth.route('/venue')
def venue():
    venues = Venue.query.all()
    return render_template('user/venue.html', venues=venues)


@auth.route('/Contact', methods=['GET', 'POST'])
def contact_form():
    if request.method == 'POST':
        firstname = request.form.get('firstname', '')
        email = request.form.get('email', '')
        mobile_no = request.form.get('MobileNo', '')
        message = request.form.get('message', '')
        event_type = request.form.get('event_type', '')
        event_date = request.form.get('event_date', '')

        if len(firstname) < 2:
            flash('First name must be at least 2 characters', 'error')
        elif len(mobile_no) < 10:
            flash('Mobile number too short', 'error')
        elif '@' not in email:
            flash('Invalid email address', 'error')
        else:
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
                flash('Form submitted successfully!', 'success')
                return redirect(url_for('auth.contact_form'))
            except Exception as e:
                db.session.rollback()
                flash(f"Database error: {e}", 'error')

    return render_template("user/Contact.html")


@auth.route('/service', methods=['GET', 'POST'])
def service():
    services = Service.query.all()
    return render_template("user/service.html", services=services, boolean=True)


@auth.route('/transportation')
def transportation():
    transports = Transport.query.all()
    return render_template('user/transportation.html', transports=transports)


@auth.route('/blog/<slug>')
def blog_detail(slug):
    blog = Blog.query.filter_by(slug=slug).first_or_404()
    blogs = Blog.query.order_by(Blog.blog_date.desc()).limit(8).all()
    return render_template('user/blog_detail.html', blog=blog, blogs=blogs)


# ================== ADMIN AUTH ==================

@auth.route('/admin', methods=['GET', 'POST'])
def admin_login():
    # ✅ FIX: Agar admin already logged in hai to dashboard pe bhejo
    if session.get('admin_logged_in'):
        return redirect(url_for('auth.dashboard'))

    # ✅ FIX: Agar koi user logged in hai to uska session clear karo
    # (Admin aur user ek saath logged in nahi ho sakte)
    if session.get('user_id'):
        session.clear()

    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        admin = Admin.query.filter_by(name=username).first()

        if admin and check_password_hash(admin.password, password):
            session.clear()  # ✅ Pehle sab clear karo
            session['admin_logged_in'] = True
            session['admin_id'] = admin.id
            session['admin_name'] = admin.name
            flash("Admin Login Successful", "success")
            return redirect(url_for('auth.dashboard'))
        else:
            flash("Invalid Admin Credentials", "error")

    return render_template("admin/panel.html")


@auth.route('/admin/logout')
@admin_required
def admin_logout():
    # ✅ FIX: Sirf admin session clear karo aur ADMIN login pe redirect karo
    session.clear()
    flash("Admin Logged Out Successfully", "success")
    return redirect(url_for('auth.admin_login'))  # ✅ /admin pe jao, /login nahi


@auth.route('/dashboard')
@admin_required
def dashboard():
    admin = Admin.query.get(session['admin_id'])

    total_clients = Client.query.count()
    total_bookings = Booking.query.count()
    total_events = Event.query.count()
    total_venues = Venue.query.count()
    total_services = Service.query.count()
    total_transports = Transport.query.count()
    total_packages = EventPackage.query.count()
    total_gallery = Gallery.query.count()
    total_blogs = Blog.query.count()
   


     # Current month/year
    now = datetime.now()
    current_year = now.year
    current_month = now.month

    # Monthly counts
    # Events based on EventPackage creation date
    monthly_events = EventPackage.query.filter(
        extract('year', EventPackage.created_at) == current_year,
        extract('month', EventPackage.created_at) == current_month
    ).count()

    # Bookings based on booking_date (when the booking was made)
    monthly_bookings = Booking.query.filter(
        extract('year', Booking.booking_date) == current_year,
        extract('month', Booking.booking_date) == current_month
    ).count()

    

    return render_template(
        "admin/dashboard.html",
        admin=admin,
        total_clients=total_clients,
        total_bookings=total_bookings,
        total_events=total_events,
        total_venues=total_venues,
        total_services=total_services,
        total_transports=total_transports,
        total_packages=total_packages,
        total_gallery=total_gallery,
        total_blogs=total_blogs,
 
        monthly_events=monthly_events,
        monthly_bookings=monthly_bookings,
        current_year=current_year,    
        current_month=current_month  
    )


@auth.route('/edit-profile', methods=['GET', 'POST'])
@admin_required
def edit_profile():
    admin = Admin.query.first()

    if not admin:
        admin = Admin(name='', email='', phone='', image=None)
        db.session.add(admin)
        db.session.commit()

    if request.method == 'POST':
        name = request.form.get('name', admin.name)
        email = request.form.get('email', admin.email)
        phone = request.form.get('phone', admin.phone)

        admin.name = name
        admin.email = email
        admin.phone = phone

        file = request.files.get('image')
        if file and file.filename != '' and allowed_file(file.filename):
            upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
            os.makedirs(upload_dir, exist_ok=True)
            filename = f"{int(time.time())}_{secure_filename(file.filename)}"
            file_path = os.path.join(upload_dir, filename)
            file.save(file_path)
            admin.image = filename

        try:
            db.session.commit()
            flash("Profile Updated Successfully", "success")
        except Exception as e:
            db.session.rollback()
            flash(f"Error updating profile: {e}", "error")

        return redirect(url_for('auth.profile'))

    return render_template('admin/edit_profile.html', admin=admin)


@auth.route('/admin/manage_user')
@admin_required
def manage_user():
    contacts = Contact.query.order_by(Contact.created_at.desc()).all()
    admin = Admin.query.first()
    return render_template('admin/manage_user.html', contacts=contacts, admin=admin)


@auth.route('/admin/manage_package', methods=['GET', 'POST'])
@admin_required
def manage_package():
    admin = Admin.query.first()

    if request.method == 'POST':
        try:
            name = request.form.get('name')
            category = request.form.get('category')
            file = request.files.get('image')

            filename = None
            if file and file.filename != '':
                upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
                os.makedirs(upload_dir, exist_ok=True)
                filename = f"{int(time.time())}_{secure_filename(file.filename)}"
                file.save(os.path.join(upload_dir, filename))

            new_package = EventPackage(name=name, category=category, image=filename)
            db.session.add(new_package)
            db.session.commit()

            return {"success": True, "package": {
                "id": new_package.id,
                "name": new_package.name,
                "category": new_package.category,
                "image": new_package.image
            }}
        except Exception as e:
            db.session.rollback()
            return {"success": False, "error": str(e)}

    packages = EventPackage.query.all()
    return render_template('admin/manage_package.html', admin=admin, packages=packages)


@auth.route('/admin/get_package/<int:id>')
@admin_required
def get_package(id):
    pkg = EventPackage.query.get_or_404(id)
    return {"id": pkg.id, "name": pkg.name, "category": pkg.category, "image": pkg.image}


@auth.route('/admin/edit_package', methods=['POST'])
@admin_required
def edit_package():
    try:
        pkg = EventPackage.query.get(request.form.get('id'))
        pkg.name = request.form.get('name')
        pkg.category = request.form.get('category')

        file = request.files.get('image')
        if file and file.filename != '':
            upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
            os.makedirs(upload_dir, exist_ok=True)
            filename = f"{int(time.time())}_{secure_filename(file.filename)}"
            file.save(os.path.join(upload_dir, filename))
            pkg.image = filename

        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/delete_package/<int:id>', methods=['POST'])
@admin_required
def delete_package(id):
    try:
        pkg = EventPackage.query.get_or_404(id)
        db.session.delete(pkg)
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/manage_event', methods=['GET', 'POST'])
@admin_required
def manage_event():
    admin = Admin.query.first()

    if request.method == 'POST':
        try:
            new_event = Event(
                name=request.form.get('name'),
                price=request.form.get('price'),
                food_type=request.form.get('food_type'),
                pax=request.form.get('pax'),
                room=request.form.get('room'),
                city=request.form.get('city'),
                venue_id=request.form.get('venue_id'),
                package_id=request.form.get('package_id'),
                category=request.form.get('category'),
                image=None
            )

            file = request.files.get('image')
            if file and file.filename != '':
                upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
                os.makedirs(upload_dir, exist_ok=True)
                filename = f"{int(time.time())}_{secure_filename(file.filename)}"
                file.save(os.path.join(upload_dir, filename))
                new_event.image = filename

            db.session.add(new_event)
            db.session.commit()
            return {"success": True}

        except Exception as e:
            db.session.rollback()
            return {"success": False, "error": str(e)}

    events = Event.query.all()
    venues = Venue.query.all()
    packages = EventPackage.query.all()

    return render_template('admin/manage_event.html', admin=admin, events=events, venues=venues, packages=packages)


@auth.route('/admin/get_event/<int:id>')
@admin_required
def get_event(id):
    ev = Event.query.get_or_404(id)
    return {
        "id": ev.id, "name": ev.name, "price": ev.price,
        "food_type": ev.food_type, "pax": ev.pax, "room": ev.room,
        "city": ev.city, "venue_id": ev.venue_id,
        "package_id": ev.package_id, "category": ev.category, "image": ev.image
    }


@auth.route('/admin/edit_event', methods=['POST'])
@admin_required
def edit_event():
    try:
        ev = Event.query.get(request.form.get('id'))
        ev.name = request.form.get('name')
        ev.price = request.form.get('price')
        ev.food_type = request.form.get('food_type')
        ev.pax = request.form.get('pax')
        ev.room = request.form.get('room')
        ev.city = request.form.get('city')
        ev.venue_id = request.form.get('venue_id')
        ev.package_id = request.form.get('package_id')
        ev.category = request.form.get('category')

        file = request.files.get('image')
        if file and file.filename != '':
            upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
            os.makedirs(upload_dir, exist_ok=True)
            filename = f"{int(time.time())}_{secure_filename(file.filename)}"
            file.save(os.path.join(upload_dir, filename))
            ev.image = filename

        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/delete_event/<int:id>', methods=['POST'])
@admin_required
def delete_event(id):
    try:
        ev = Event.query.get_or_404(id)
        db.session.delete(ev)
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/manage_venue', methods=['GET', 'POST'])
@admin_required
def manage_venue():
    admin = Admin.query.first()

    if request.method == 'POST':
        try:
            name = request.form.get('name')
            location = request.form.get('location')
            price = request.form.get('price')
            file = request.files.get('image')

            filename = None
            if file and file.filename != '':
                upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
                os.makedirs(upload_dir, exist_ok=True)
                filename = f"{int(time.time())}_{secure_filename(file.filename)}"
                file.save(os.path.join(upload_dir, filename))

            new_venue = Venue(name=name, location=location, price=price, image=filename)
            db.session.add(new_venue)
            db.session.commit()

            return {"success": True, "venue": {
                "id": new_venue.id, "name": new_venue.name,
                "location": new_venue.location, "price": new_venue.price, "image": new_venue.image
            }}
        except Exception as e:
            db.session.rollback()
            return {"success": False, "error": str(e)}

    venues = Venue.query.all()
    return render_template('admin/manage_venue.html', admin=admin, venues=venues)


@auth.route('/admin/get_venue/<int:id>')
@admin_required
def get_venue(id):
    v = Venue.query.get_or_404(id)
    return {"id": v.id, "name": v.name, "location": v.location, "price": v.price, "image": v.image}


@auth.route('/admin/edit_venue', methods=['POST'])
@admin_required
def edit_venue():
    try:
        v = Venue.query.get(request.form.get('id'))
        v.name = request.form.get('name')
        v.location = request.form.get('location')
        v.price = request.form.get('price')

        file = request.files.get('image')
        if file and file.filename != '':
            upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
            os.makedirs(upload_dir, exist_ok=True)
            filename = f"{int(time.time())}_{secure_filename(file.filename)}"
            file.save(os.path.join(upload_dir, filename))
            v.image = filename

        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/delete_venue/<int:id>', methods=['POST'])
@admin_required
def delete_venue(id):
    try:
        v = Venue.query.get_or_404(id)
        db.session.delete(v)
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/manage_service', methods=['GET', 'POST'])
@admin_required
def manage_service():
    admin = Admin.query.first()

    if request.method == 'POST':
        try:
            name = request.form.get('name')
            file = request.files.get('image')

            filename = None
            if file and file.filename != '':
                upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
                os.makedirs(upload_dir, exist_ok=True)
                filename = f"{int(time.time())}_{secure_filename(file.filename)}"
                file.save(os.path.join(upload_dir, filename))

            new_service = Service(name=name, image=filename)
            db.session.add(new_service)
            db.session.commit()

            return {"success": True, "service": {"id": new_service.id, "name": new_service.name, "image": new_service.image}}
        except Exception as e:
            db.session.rollback()
            return {"success": False, "error": str(e)}

    services = Service.query.all()
    return render_template('admin/manage_service.html', admin=admin, services=services)


@auth.route('/admin/get_service/<int:id>')
@admin_required
def get_service(id):
    s = Service.query.get_or_404(id)
    return {"id": s.id, "name": s.name, "image": s.image}


@auth.route('/admin/edit_service', methods=['POST'])
@admin_required
def edit_service():
    try:
        s = Service.query.get(request.form.get('id'))
        s.name = request.form.get('name')

        file = request.files.get('image')
        if file and file.filename != '':
            upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
            os.makedirs(upload_dir, exist_ok=True)
            filename = f"{int(time.time())}_{secure_filename(file.filename)}"
            file.save(os.path.join(upload_dir, filename))
            s.image = filename

        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/delete_service/<int:id>', methods=['POST'])
@admin_required
def delete_service(id):
    try:
        s = Service.query.get_or_404(id)
        db.session.delete(s)
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/manage_transportation', methods=['GET', 'POST'])
@admin_required
def manage_transport():
    admin = Admin.query.first()

    if request.method == 'POST':
        try:
            vehicle = request.form.get('vehicle')
            file = request.files.get('image')

            filename = None
            if file and file.filename != '':
                upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
                os.makedirs(upload_dir, exist_ok=True)
                filename = f"{int(time.time())}_{secure_filename(file.filename)}"
                file.save(os.path.join(upload_dir, filename))

            new_transport = Transport(vehicle=vehicle, image=filename)
            db.session.add(new_transport)
            db.session.commit()

            return {"success": True, "transport": {"id": new_transport.id, "vehicle": new_transport.vehicle, "image": new_transport.image}}
        except Exception as e:
            db.session.rollback()
            return {"success": False, "error": str(e)}

    transports = Transport.query.all()
    return render_template('admin/manage_transportation.html', admin=admin, transports=transports)


@auth.route('/admin/get_transport/<int:id>')
@admin_required
def get_transport(id):
    t = Transport.query.get_or_404(id)
    return {"id": t.id, "vehicle": t.vehicle, "image": t.image}


@auth.route('/admin/edit_transport', methods=['POST'])
@admin_required
def edit_transport():
    try:
        t = Transport.query.get(request.form.get('id'))
        t.vehicle = request.form.get('vehicle')

        file = request.files.get('image')
        if file and file.filename != '':
            upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
            os.makedirs(upload_dir, exist_ok=True)
            filename = f"{int(time.time())}_{secure_filename(file.filename)}"
            file.save(os.path.join(upload_dir, filename))
            t.image = filename

        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/delete_transport/<int:id>', methods=['POST'])
@admin_required
def delete_transport(id):
    try:
        t = Transport.query.get_or_404(id)
        db.session.delete(t)
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/manage_gallery', methods=['GET', 'POST'])
@admin_required
def manage_gallery():
    admin = Admin.query.first()

    if request.method == 'POST':
        try:
            file = request.files.get('image')

            filename = None
            if file and file.filename != '':
                upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
                os.makedirs(upload_dir, exist_ok=True)
                filename = f"{int(time.time())}_{secure_filename(file.filename)}"
                file.save(os.path.join(upload_dir, filename))

            new_gallery = Gallery(image=filename)
            db.session.add(new_gallery)
            db.session.commit()

            return {"success": True, "gallery": {"id": new_gallery.id, "image": new_gallery.image}}
        except Exception as e:
            db.session.rollback()
            return {"success": False, "error": str(e)}

    galleries = Gallery.query.all()
    return render_template('admin/manage_gallery.html', admin=admin, galleries=galleries)


@auth.route('/admin/get_gallery/<int:id>')
@admin_required
def get_gallery(id):
    g = Gallery.query.get_or_404(id)
    return {"id": g.id, "image": g.image}


@auth.route('/admin/edit_gallery', methods=['POST'])
@admin_required
def edit_gallery():
    try:
        g = Gallery.query.get(request.form.get('id'))

        file = request.files.get('image')
        if file and file.filename != '':
            upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
            os.makedirs(upload_dir, exist_ok=True)
            filename = f"{int(time.time())}_{secure_filename(file.filename)}"
            file.save(os.path.join(upload_dir, filename))
            g.image = filename

        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/delete_gallery/<int:id>', methods=['POST'])
@admin_required
def delete_gallery(id):
    try:
        g = Gallery.query.get_or_404(id)
        db.session.delete(g)
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/manage_blog', methods=['GET', 'POST'])
@admin_required
def manage_blog():
    admin = Admin.query.first()

    if request.method == 'POST':
        try:
            title = request.form.get('title')
            short_description = request.form.get('short_description')
            content = request.form.get('content')
            file = request.files.get('image')

            filename = None
            if file and file.filename != '':
                upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
                os.makedirs(upload_dir, exist_ok=True)
                filename = f"{int(time.time())}_{secure_filename(file.filename)}"
                file.save(os.path.join(upload_dir, filename))

            slug = slugify(title)

            new_blog = Blog(
                title=title, slug=slug,
                short_description=short_description,
                content=content, image=filename
            )
            db.session.add(new_blog)
            db.session.commit()
            return {"success": True}
        except Exception as e:
            db.session.rollback()
            return {"success": False, "error": str(e)}

    blogs = Blog.query.order_by(Blog.blog_date.desc()).all()
    return render_template('admin/manage_blog.html', admin=admin, blogs=blogs)


@auth.route('/admin/get_blog/<int:id>')
@admin_required
def get_blog(id):
    b = Blog.query.get_or_404(id)
    return {
        "id": b.id, "title": b.title,
        "short_description": b.short_description,
        "content": b.content, "image": b.image
    }


@auth.route('/admin/edit_blog', methods=['POST'])
@admin_required
def edit_blog():
    try:
        b = Blog.query.get(request.form.get('id'))
        b.title = request.form.get('title')
        b.short_description = request.form.get('short_description')
        b.content = request.form.get('content')

        file = request.files.get('image')
        if file and file.filename != '':
            upload_dir = os.path.join(current_app.root_path, 'static', 'admin', 'image')
            os.makedirs(upload_dir, exist_ok=True)
            filename = f"{int(time.time())}_{secure_filename(file.filename)}"
            file.save(os.path.join(upload_dir, filename))
            b.image = filename

        b.slug = slugify(b.title)
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/delete_blog/<int:id>', methods=['POST'])
@admin_required
def delete_blog(id):
    try:
        b = Blog.query.get_or_404(id)
        db.session.delete(b)
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/manage_booking')
@admin_required
def manage_booking():
    admin = Admin.query.first()
    bookings = Booking.query.order_by(Booking.booking_date.desc()).all()
    return render_template('admin/manage_booking.html', admin=admin, bookings=bookings)


@auth.route('/admin/confirm_booking/<int:id>', methods=['POST'])
@admin_required
def confirm_booking(id):
    try:
        b = Booking.query.get_or_404(id)
        b.status = "Confirmed"
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/cancel_booking/<int:id>', methods=['POST'])
@admin_required
def cancel_booking(id):
    try:
        b = Booking.query.get_or_404(id)
        b.status = "Cancelled"
        db.session.commit()
        return {"success": True}
    except Exception as e:
        db.session.rollback()
        return {"success": False, "error": str(e)}


@auth.route('/admin/pending_booking/<int:id>', methods=['POST'])
@admin_required
def pending_booking(id):
    booking = Booking.query.get(id)
    if not booking:
        return jsonify({"success": False, "error": "Booking not found"})
    booking.status = "Pending"
    db.session.commit()
    return jsonify({"success": True})


@auth.route('/profile')
@admin_required
def profile():
    admin = Admin.query.get(session['admin_id'])
    return render_template("admin/profile.html", admin=admin)


@auth.route('/book_event', methods=['GET', 'POST'])
def book_event():
    if not session.get('user_id'):
        flash("Please login first to book event", "error")
        return redirect(url_for('auth.user_login'))  # ✅ FIX: user_login

    event_id = request.args.get('event_id')
    event = Event.query.get(event_id)
    venue = Venue.query.get(event.venue_id) if event else None

    services = Service.query.all()
    transports = Transport.query.all()

    min_date = date.today() + timedelta(days=1)

    if request.method == 'POST':
        booking = Booking(
            user_name=request.form.get('user_name'),
            user_email=request.form.get('user_email'),
            user_phone=request.form.get('user_phone'),
            event_id=request.form.get('event_id'),
            venue_id=request.form.get('venue_id'),
            service_id=request.form.get('service_id') or None,
            transport_id=request.form.get('transport_id') or None,
            event_date=request.form.get('event_date')
        )

        db.session.add(booking)
        db.session.commit()

        flash("Booking Successful. Please complete payment.", "success")
        return redirect(url_for('auth.payment', booking_id=booking.id))

    return render_template(
        "user/book_event.html",
        event=event, venue=venue,
        services=services, transports=transports,
        min_date=min_date
    )


@auth.route('/payment/<int:booking_id>', methods=['GET', 'POST'])
def payment(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    event = Event.query.get(booking.event_id)

    if request.method == 'POST':
        method = request.form.get('payment_method')
        amount = int(event.price.replace(",", ""))

        payment = Payment(
            booking_id=booking.id,
            amount=amount,
            payment_method=method,
            payment_status="Completed"
        )

        booking.status = "Confirmed"
        db.session.add(payment)
        db.session.commit()

        flash("Payment Successful", "success")
        return redirect(url_for('auth.event'))

    return render_template("user/payment.html", booking=booking, event=event)


@auth.route('/admin/manage_payment')
@admin_required
def manage_payment():
    admin = Admin.query.first()
    payments = Payment.query.order_by(Payment.payment_date.desc()).all()
    return render_template("admin/manage_payment.html", admin=admin, payments=payments)


@auth.route('/admin/manage_client')
@admin_required
def manage_client():
    admin = Admin.query.first()
    clients = Client.query.all()
    return render_template("admin/manage_client.html", admin=admin, clients=clients)



@auth.route('/admin/report', methods=['GET'])
@admin_required
def generate_report():

    report_type = request.args.get('report_type')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    status = request.args.get('status')
    format_type = request.args.get('format', 'html')

    admin = Admin.query.first()
    report_data = []

    try:

        # ================= CLIENT REPORT =================
        if report_type == "users":

            clients = Client.query.order_by(Client.created_at.desc()).all()

            report_data = [{
                "id": c.id,
                "user_name": c.name,
                "user_email": c.email,
                "user_phone": c.phone,
                "event_date": c.created_at,
                "status": "Registered User"
            } for c in clients]

        # ================= BOOKING REPORT =================
        else:

            query = Booking.query

            # Date filter
            if start_date and end_date:
                try:
                    start_date_obj = datetime.strptime(start_date, "%Y-%m-%d").date()
                    end_date_obj = datetime.strptime(end_date, "%Y-%m-%d").date()

                    query = query.filter(
                        Booking.event_date.between(start_date_obj, end_date_obj)
                    )

                except ValueError:
                    flash("Invalid date format. Use YYYY-MM-DD", "danger")

            # Status filter
            if status:
                query = query.filter_by(status=status)

            bookings = query.order_by(Booking.booking_date.desc()).all()

            report_data = [{
                "id": b.id,
                "user_name": b.user_name,
                "user_email": b.user_email,
                "user_phone": b.user_phone,
                "event_date": b.event_date,
                "status": b.status
            } for b in bookings]

    except Exception as e:
        flash(f"Error generating report: {e}", "danger")

    # ================= DATAFRAME =================

    df = pd.DataFrame(report_data)

    # ================= PDF EXPORT =================

    if format_type == "pdf":

        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer)

        if df.empty:
            data = [["No Data Available"]]
        else:
            data = [df.columns.tolist()] + df.values.tolist()

        table = Table(data)
        doc.build([table])

        pdf = buffer.getvalue()
        buffer.close()

        response = make_response(pdf)
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = f'attachment; filename={report_type}_report.pdf'

        return response

    # ================= EXCEL EXPORT =================

    elif format_type == "excel":

        output = BytesIO()

        with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
            df.to_excel(writer, index=False, sheet_name='Report')

        response = make_response(output.getvalue())
        response.headers["Content-Disposition"] = f"attachment; filename={report_type}_report.xlsx"
        response.headers["Content-Type"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        return response

    # ================= HTML VIEW =================

    now = datetime.now()
    current_year = now.year
    current_month = now.month

    return render_template(
        "admin/dashboard.html",
        admin=admin,
        report_data=report_data,
        current_year=current_year,
        current_month=current_month
    )


@auth.route('/admin/monthly_summary/<int:year>/<int:month>')
def monthly_summary(year, month):
    # Users registered this month
    users_registered = Client.query.filter(
        extract('year', Client.created_at) == year,
        extract('month', Client.created_at) == month
    ).count()

    # Events = confirmed events scheduled in this month
    events = Booking.query.filter(
        extract('year', Booking.booking_date) == year,
        extract('month', Booking.booking_date) == month,
        Booking.status == "Confirmed"
    ).count()

    # Bookings = all bookings made this month
    bookings = Booking.query.filter(
        extract('year', Booking.booking_date) == year,
        extract('month', Booking.booking_date) == month
    ).count()

    # Contacts created this month
    contacts = Contact.query.filter(
        extract('year', Contact.created_at) == year,
        extract('month', Contact.created_at) == month
    ).count()



    return jsonify({
        "users_registered": users_registered,
        "events": events,        # confirmed events scheduled
        "bookings": bookings,    # all bookings created
        "contacts": contacts
    })