from flask import Flask, jsonify
from faker import Faker
import random
from datetime import datetime, timedelta

app = Flask(__name__)
fake = Faker('en_IN')  # Locale set to India

# List of popular Indian cities
popular_cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 
    'Kolkata', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore'
]

# List of realistic stipend amounts
stipend_amounts = [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000]

def generate_internship():
    start_date = fake.date_between(start_date='today', end_date='+2y')
    duration = random.choice(['3 months', '6 months', '1 year'])
    stipend = random.choice(stipend_amounts)
    return {
        "Role": fake.job(),
        "Company": fake.company(),
        "Location": random.choice(popular_cities),
        "Start Date": start_date.strftime('%Y-%m-%d'),
        "Duration": duration,
        "Stipend": "{} INR per month".format(stipend),
        "Posted": (start_date - timedelta(days=random.randint(0, 30))).strftime('%Y-%m-%d')
    }

@app.route('/api/internships')
def internships():
    number_of_internships = random.randint(5, 10)  # Randomly choose between 5 to 10 internships to generate
    internships = [generate_internship() for _ in range(number_of_internships)]
    return jsonify(internships)

if __name__ == "__main__":
    app.run(debug=True)  # Turn off debug mode in a production environment
