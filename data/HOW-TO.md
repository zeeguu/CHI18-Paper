


# Import the Data in a local MySQL database from the Command Line

**Note**: this assumes that you have MySQL installed. 

The following code assumes that your local MySQL server has the user `root` and you know it's password. 
Change `root` to another username if needed.

    alias mysqlcommand='mysql -u root -p'
    echo "CREATE DATABASE zeeguu_chi;" | mysqlcommand

Uncompress the CHI database dump, and import it in the newly created database 

    wget https://github.com/zeeguu-ecosystem/CHI18-Paper/raw/master/data/chi18_dataset_anon_2018-01-15.sql.zip
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

    mkdir ~/.virtualenvs/zenv
    python3 -m venv ~/.virtualenvs/zenv
    source ~/.virtualenvs/zenv/bin/activate
   
Prepare a zeeguu config file (**make sure to** modify the `root` and `password` in the 
second command with the ones that are used for your own MySQL server!)

    cd Zeeguu-Core
    printf "SQLALCHEMY_DATABASE_URI = ('mysql://root:password@localhost/zeeguu_chi')\nMAX_SESSION=99999999\nSQLALCHEMY_TRACK_MODIFICATIONS=False" > ~/.config/zeeguu/chi.cfg 

Install all the dependencies (pip is assumed to be installed already): 

    pip install jieba3k coveralls nltk
    python setup.py develop
    cd .. 


## 2. Analyze the Data
Once the installation steps are done, every time you want to start playing with the 
dataset in an interactive interpreter execute the following command from the 
folder that is the parent of Zeeguu-Core and zenv (where you should find yourself
if you exercutd that last `cd ..` in the previous step): 

    source ~/.virtualenvs/zenv && export ZEEGUU_CORE_CONFIG=~/.config/zeeguu/chi.cfg && python3

Once in the command line interpreter you can do cool things, like finding all the bookmarks of the user Roza (which is a generated name): 

    >>> from zeeguu.model import User
    >>> roza = User.find('rozaalkan@email.com')
    >>> roza.all_bookmarks()
    [Bookmark[11751 of 596: semblait->appeared in 'Car dès le...']
    , Bookmark[11742 of 596: gagnants->winners in 'Son premie...']
    , Bookmark[11740 of 596: amorties->depreciated in 'Car dès le...']
    , Bookmark[11721 of 596: adversaire->opponent in 'Car dès le...']
    , Bookmark[11719 of 596: égayé->brightened in 'Car dès le...']
    , Bookmark[11695 of 596: aggraver->aggravate in 'Le 21e mon...']
    , Bookmark[11690 of 596: amenée->feed in 'Le tombeur...']
    , Bookmark[11686 of 596: suffisamment d'aplomb->Sufficiently plumb in 'Le tombeur...']
    , Bookmark[11681 of 596: suffi->enough in 'Le tombeur...']
    , Bookmark[11678 of 596: suffisamment->enough in 'Le tombeur...']
    , Bookmark[11675 of 596: soigner->treat in 'Le tombeur...']
    ]

    
