from flask import Blueprint, render_template, redirect, url_for, session, request
from .models import EventPackage,Service,Blog,Venue,Gallery,Event   

views = Blueprint('views', __name__)

@views.route('/')
def home():
    packages = EventPackage.query.limit(9).all()
    print("HOME PACKAGES →", packages)
    services = Service.query.limit(8).all()
    print("HOME SERVICES →", services)
    blogs = Blog.query.order_by(Blog.blog_date.desc()).limit(3).all()
    print("HOME BLOGS ->",blogs)
    venues = Venue.query.limit(8).all()
    print("HOME VENUEA ->", venues)
    galleries = Gallery.query.limit(24).all()
    print("HOME GALLERY ->", galleries)
    events = Event.query. limit(12).all()
    print("HoME EVENT -> ",events )
    return render_template('user/home.html', packages=packages , services=services,blogs=blogs,venues=venues, events=events,galleries=galleries)



              
