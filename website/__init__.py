from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():

    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'hjshjhdjah_kjshkjdhjs'

    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:@localhost/event_db"

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from .views import views
    from .auth import auth
    from .models import Client, Admin

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    # Navbar me user show karne ke liye
    @app.context_processor
    def inject_user():

        user = None

        if session.get('user_id'):
            user = Client.query.get(session['user_id'])

        return dict(user=user)

    # DATABASE CREATE + DEFAULT ADMIN
    with app.app_context():

        db.create_all()

        from werkzeug.security import generate_password_hash

        if not Admin.query.first():

            admin = Admin(
                name="admin",
                email="admin@gmail.com",
                password=generate_password_hash("admin123"),
                phone="9999999999"
            )

            db.session.add(admin)
            db.session.commit()

    return app