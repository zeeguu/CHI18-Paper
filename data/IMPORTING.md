

# Importing the Data in a local MySQL database

    echo "CREATE DATABASE zeeguu_chi;" > mysql -u root

    mysql -u root zeeguu_chi < chi18_dataset_anon_2018-01-15.sql

    git clone https://github.com/zeeguu-ecosystem/Zeeguu-Core

    mkdir Zeeguu_virtenv
    virtualenv -p python3 Zeeguu_virtenv/
    source Zeeguu_virtenv/bin/activate
    cd Zeeguu-Core
    cp testing_default.cfg zeeguu_chi.cfg
    printf "SQLALCHEMY_DATABASE_URI = ("mysql://root@localhost/zeeguu_chi")\nMAX_SESSION=99999999\nSQLALCHEMY_TRACK_MODIFICATIONS=False" > zeeguu_chi.cfg 

    export ZEEGUU_CORE_CONFIG=./zeeguu_chi.cfg

    pip install jieba3k coveralls
    # (pip assumed to install modules for python 3.6.4)
    python setup.py develop

    $python
    >>import zeeguu
    >>from zeeguu.model import User
    >>User.query.all()

