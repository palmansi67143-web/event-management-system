from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from datetime import datetime



class Admin(db.Model, UserMixin):

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100))
    password = db.Column(db.String(255), nullable=False)

    phone = db.Column(db.String(20))
    image = db.Column(db.String(200), default='default.jpg')

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(200), unique=True, nullable=False)
    short_description = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(200))
    blog_date = db.Column(db.DateTime, default=datetime.utcnow)


class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)


    user_name = db.Column(db.String(150), nullable=False)
    user_email = db.Column(db.String(150), nullable=False)
    user_phone = db.Column(db.String(20))


    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=True)
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=True)
    transport_id = db.Column(db.Integer, db.ForeignKey('transport.id'), nullable=True)


    booking_date = db.Column(db.DateTime, default=db.func.current_timestamp())
    event_date = db.Column(db.DateTime)


    status = db.Column(db.String(50), default="Pending")


    event = db.relationship("Event", backref="bookings", lazy=True)
    venue = db.relationship("Venue", backref="bookings", lazy=True)
    service = db.relationship("Service", backref="bookings", lazy=True)
    transport = db.relationship("Transport", backref="bookings", lazy=True)


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    mobile_no = db.Column(db.String(20), nullable=False)
    event_type = db.Column(db.String(50))
    event_date = db.Column(db.Date)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class EventPackage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(200), nullable=True)
    category = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    food_type = db.Column(db.String(50), nullable=False)
    pax = db.Column(db.Integer, nullable=False)
    room = db.Column(db.String(50))
    city = db.Column(db.String(100))

    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=True)
    package_id = db.Column(db.Integer, db.ForeignKey('event_package.id'), nullable=True)

    category = db.Column(db.String(100))
    image = db.Column(db.String(200))

    venue = db.relationship("Venue", backref="events", lazy=True)
    package = db.relationship("EventPackage", backref="events", lazy=True)



class Venue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    price = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(200))


class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    image = db.Column(db.String(200))


class Transport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehicle = db.Column(db.String(150), nullable=False)
    image = db.Column(db.String(200))


class Gallery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(200), nullable=False)


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    notes = db.relationship('Note')


class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20))
    address = db.Column(db.String(255))
    image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Payment(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    booking_id = db.Column(db.Integer, db.ForeignKey('booking.id'))

    amount = db.Column(db.Integer)

    payment_method = db.Column(db.String(50))

    payment_status = db.Column(db.String(50), default="Pending")

    payment_date = db.Column(db.DateTime, default=db.func.current_timestamp())

    booking = db.relationship("Booking", backref="payment")


