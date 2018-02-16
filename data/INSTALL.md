


# Importing the Data in a local MySQL database

The following code assumes that your local MySQL database 
has the user `root` and no password. If this is not the 
case, then everywhere you see `mysql -u root` replace with `mysql -u <your-username> -p`.


    echo "CREATE DATABASE zeeguu_chi;" > mysql -u root

Uncompress the CHI database dump, and import it in the newly created database 

    unzip chi18_dataset_anon_2018-01-15.sql.zip
    mysql -u root zeeguu_chi < chi18_dataset_anon_2018-01-15.sql

# Install Zeeguu-Core
Download the Zeeguu-Core repo which will enable us to programaticaly analyze the DB
    
    git clone https://github.com/zeeguu-ecosystem/Zeeguu-Core

Create a virtual env where to install the Zeeguu Core: 

    mkdir Zeeguu_virtenv
    virtualenv -p python3 Zeeguu_virtenv/
    source Zeeguu_virtenv/bin/activate
   
Prepare a zeeguu config file

    cd Zeeguu-Core
    cp testing_default.cfg zeeguu_chi.cfg
    printf "SQLALCHEMY_DATABASE_URI = ("mysql://root@localhost/zeeguu_chi")\nMAX_SESSION=99999999\nSQLALCHEMY_TRACK_MODIFICATIONS=False" > zeeguu_chi.cfg 

Install all the dependencies (pip is assumed to be installed already): 

    pip install jieba3k coveralls
    python setup.py develop


# Analyze the Data
One of the simplest way to start playing with the dataset is to open an interactive interpreter: 

    export ZEEGUU_CORE_CONFIG=./zeeguu_chi.cfg && python

    >>> import zeeguu
    >>> from zeeguu.model import User
    >>> User.query.all()

