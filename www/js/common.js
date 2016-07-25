//store data to db
var db;
var dbmanager = {
    initdb:function(){
        db = window.sqlitePlugin.openDatabase("Database", "1.0", "MANUFACTURE", 200000);
        
    },
    
       createTable:function(){
        db.transaction(createTableTransaction, this.errorExecuteSQL, this.successExecuteSQL);
       
        function createTableTransaction(tx){
           tx.executeSql('create table if not exists DATA(item_group TEXT, item_code TEXT, type TEXT, desc TEXT, desc2 TEXT, UOM TEXT, PRICE1 TEXT, PRICE2 TEXT,PRICE_MIN TEXT, BALANCEQTY TEXT, last_price TEXT, SyncDate TEXT)');
        }
       },

    //select all data
    getData:function(returnData){
        db.transaction(function(tx){
            tx.executeSql('SELECT * FROM DATA', [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
    },
    
    
     getAllGroup:function(returnData){
         
        //for drop down get all item group
        db.transaction(function(tx){
            tx.executeSql("SELECT item_group from DATA WHERE item_group IS NOT NULL GROUP BY item_group ORDER BY item_group;", [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
        

    },
    
       getSyncDate:function(returnData){
        db.transaction(function(tx){
            tx.executeSql("SELECT SyncDate AS sd from DATA ORDER BY SyncDate DESC LIMIT 1;", [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
        

    },
    
     GeneralFilter:function(returnData){
         var sqlquery = "SELECT * FROM DATA";
         var condition1="";
         var condition2="";
         var condition3="";
         var condition4="";
         
         
         
         if(test1!="null"){
             condition1 = "item_group LIKE '"+test1+"' AND ";
         }
         if(test2 !=""){
             condition2 = "item_code LIKE '"+test2+"%' AND ";
         }
         if(test3 !=""){
             condition3 = "desc LIKE '%"+test3+"%' AND ";
         }
         if(test4 !=""){
             condition4 = "desc2 LIKE '%"+test4+"%' AND ";
         }
         sqlquery=sqlquery+" WHERE 1=1 AND "+condition1+condition2+condition3+condition4;
         sqlquery = sqlquery.substring(0, sqlquery.length - 4);
         
         if(test1 !="null"){
        sqlquery = sqlquery+" ORDER BY item_group, item_code limit 500;";
         }
         else if(test2 !=""){
             sqlquery = sqlquery+" ORDER BY item_code, item_group limit 500;";
         }
         else if(test3 !=""){
             sqlquery = sqlquery+" ORDER BY desc, item_code, item_group limit 500;";
         }
         else if(test4 !=""){
             sqlquery = sqlquery+" ORDER BY desc2, item_code, item_group limit 500;";
         }
         else
         {
             sqlquery = sqlquery+" ORDER BY item_group, item_code limit 500;";
         }
    
        db.transaction(function(tx){
            tx.executeSql(sqlquery, [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
        

    },
    
     CountTotal:function(returnData){
         
        db.transaction(function(tx){
            tx.executeSql("SELECT COUNT(*) AS cnt FROM DATA;", [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
        

    },
     DeleteData:function(returnData){
         
        db.transaction(function(tx){
            //tx.executeSql("DELETE FROM DATA a INNER JOIN ACTIVITY b ON b.item_code=a.item_code");
            tx.executeSql("DELETE FROM DATA where item_code="+returnData);
            
        });
    },
       GetTemporary:function(returnData){
         
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM ACTIVITY", [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
        

    },
    
    successExecuteSQL:function(){
        //success to executeSQL
    },
    
    errorExecuteSQL:function(err){
        //fail executeSQL
        alert("fail"+err.message);
    },
};


//get url 
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};




//page loading 
var loading = {
    
    //add loading page when calll
    startLoading:function(){
        $(".app").prepend("<div class='loadingPage'><div class='loadingFrame'><img class='loadingIcon' src='img/loading_large.gif'></img></div></div>");
    },
    
    //remove loading page when call
    endLoading:function(){
        $(".loadingPage").remove();
    }
};

//var gif = {
//    startgif:function(){
//      $(".app").prepend("<div class='gifdiv'><img class='gifclass' src='img/syncisinprogress.gif' /></div>");  
//    },
//    
//    endgif:function(){
//        $(".gifdiv").remove();
//    }
//    
//}



function escapeHtml(text) {
 
  return text
      .replace(/&/g, "&amp")
      .replace(/</g, "&lt")
      .replace(/#/g, "%23")
      .replace(/"/g, "&quot")
      .replace(/'/g, "&#039");
}