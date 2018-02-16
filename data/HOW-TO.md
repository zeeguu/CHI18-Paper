


# Import the Data in a local MySQL database from the Command Line

**Note**: this assumes that you have MySQL installed. 

The following code assumes that your local MySQL server has the user `root` and you know it's password. 
Change `root` to another username if needed.

    export mysqlcommand='mysql -u root -p'
    echo "CREATE DATABASE zeeguu_chi;" | mysqlcommand

Uncompress the CHI database dump, and import it in the newly created database 

    unzip chi18_dataset_anon_2018-01-15.sql.zip
    mysqlcommand zeeguu_chi < chi18_dataset_anon_2018-01-15.sql
    
Now you can analyze the data using SQL, like you can see in the [query examples file](https://github.com/zeeguu-ecosystem/CHI18-Paper/blob/master/data/chi18_dataset_query_examples.md)


# Analyze the Data with Zeeguu-Core

**Note:** This assumes that you have Python 3.6 or later installed.

First you must [Import the Data in a local MySQL database](https://github.com/zeeguu-ecosystem/CHI18-Paper/blob/master/data/HOW-TO.md#import-the-data-in-a-local-mysql-database) as described above. Then it's simply a two-step thing: 

## 1. Install Zeeguu-Core locally

Download the Zeeguu-Core repo which will enable us to programaticaly analyze the DB
    
    git clone https://github.com/zeeguu-ecosystem/Zeeguu-Core

Create a virtual env (let's call it `zenv`) where to install the Zeeguu Core: 

    mkdir zenv
    python3 -m venv zenv
    source zenv/bin/activate
   
Prepare a zeeguu config file

    cd Zeeguu-Core
    printf "SQLALCHEMY_DATABASE_URI = ("mysql://root@localhost/zeeguu_chi")\nMAX_SESSION=99999999\nSQLALCHEMY_TRACK_MODIFICATIONS=False" > zeeguu_chi.cfg 

Install all the dependencies (pip is assumed to be installed already): 

    pip install jieba3k coveralls nltk
    python setup.py develop


## 2. Analyze the Data
Once the installation steps are done, every time you want to start playing with the 
dataset in an interactive interpreter execute the following command from the current
folder: 

    source zenv/bin/activate && export ZEEGUU_CORE_CONFIG=./zeeguu_chi.cfg && python

Once in the command line interpreter you can do things like: 

    >>> import zeeguu
    >>> from zeeguu.model import User
    >>> User.query.all()

