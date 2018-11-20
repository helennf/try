var CountriesSQL = {
    insert:'INSERT INTO countries(uid,userName) VALUES(?,?)',
    queryAll:'SELECT * FROM 2016gdp',
    getUserById:'SELECT * FROM countries WHERE uid = ? ',
};
module.exports = CountriesSQL;