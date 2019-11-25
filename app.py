import os

import json
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/olympicDataFinal.sqlite"

db = SQLAlchemy(app)

#engine = create_engine("sqlite:///olympicDataFinal.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
#print(Base.classes.keys())
Olympics = Base.classes.olympicdata


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/games")
def games():
    """Return a list of games."""
    
    #Query for the games
    results = db.session.query(Olympics.Games.distinct().label("Games"))
    games = [row.Games for row in results.all()]

    #Return a list of the column names (games names)
    return jsonify(games)

@app.route("/countries")
def countries():
    """return a list of distinct countries"""

    results_2 = db.session.query(Olympics.name.distinct().label("name"))
    countries = [row.name for row in results_2.all()]

    #Return a list of the column names (games names)
    return jsonify(countries)




if __name__ == "__main__":
    app.run(debug=True)
