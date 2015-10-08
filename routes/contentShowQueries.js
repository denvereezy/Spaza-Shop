module.exports = function(connection){
    
    this.categories = function(cb){
      connection.query('select * from Categories',[],cb);

    };
    
};
