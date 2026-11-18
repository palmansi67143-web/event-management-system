
from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.engine import URL
from werkzeug.security import generate_password_hash
import os

db = SQLAlchemy()


def create_app():

    app = Flask(__name__)

    # Flask Secret Key
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    # TiDB SSL Certificate
    BASE_DIR = os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )

    ca_path = os.path.join(
        BASE_DIR, 'certs', 'isrgrootx1.pem'
    )

    # TiDB Database Connection
    db_url = URL.create(
        drivername='mysql+pymysql',
        username=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST'),
        port=int(os.getenv('DB_PORT', '4000')),
        database=os.getenv('DB_NAME', 'event_management')
    )

    app.config['SQLALCHEMY_DATABASE_URI'] = db_url

    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'connect_args': {
            'ssl': {
                'ca': ca_path
            }
        }
    }

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from .views import views
    from .auth import auth
    from .models import Client, Admin

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    try:
        from .api import api
        app.register_blueprint(api, url_prefix='/api')
    except Exception as e:
        print("API registration error:", e)

    # Navbar user information
    @app.context_processor
    def inject_user():

        user = None

        if session.get('user_id'):
            user = Client.query.get(session['user_id'])

        return dict(user=user)

    # Database creation and optional default admin
    with app.app_context():

        db.create_all()

        admin_password = os.getenv('ADMIN_DEFAULT_PASSWORD')

        if not Admin.query.first() and admin_password:

            admin = Admin(
                name="admin",
                email="admin@gmail.com",
                password=generate_password_hash(admin_password),
                phone="9999999999"
            )

            db.session.add(admin)
            db.session.commit()

    return app
