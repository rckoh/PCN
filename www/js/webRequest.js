var apiTimeOut = 20000;
var count = 0;
var datacount = 0;
var weburl="http://192.168.0.250";
//var weburl="http://192.168.1.19";


function getActivityList(){
    $.ajax({
      url: weburl+"/pcn/api/product/1",
      //url: "http://192.168.1.19/pcn/api/product/1",
      type: "GET",  
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
      success: function(data, status, xhr) {
        debugger; 
      $('.lastsync').css("display","none");
      $('.lastsyncresult').css("display","none");
      //  alert(JSON.stringify(data));
        deleteData(data);
        datacount=data.length;
        CreateTable();
          $('#progressbar1').attr('max',datacount);

        for(x=0;x<data.length;x++){
        storeData(data[x].item_group, data[x].item_code, data[x].type, data[x].desc, data[x].desc2, data[x].UOM, data[x].PRICE1, data[x].PRICE2,data[x].PRICE_MIN, data[x].BALANCEQTY,data[x].last_price,data[x].SyncDate);
      }
         
       
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
    
}

function deleteData(data){
//sqlitePlugin
    var db = window.sqlitePlugin.openDatabase("Database", "1.0", "MANUFACTURE", 200000);
    db.transaction(function(txx) {
            //txx.executeSql('DROP TABLE IF EXISTS DATA');
            txx.executeSql('DELETE FROM DATA');
            OnsuccessDelete,
            OnerrorDelete
       
        
        });
    
}
function CreateTable(){
     var db = window.sqlitePlugin.openDatabase("Database", "1.0", "MANUFACTURE", 200000);
     db.transaction(function(tx) {
            
            tx.executeSql('create table if not exists DATA(item_group TEXT, item_code TEXT, type TEXT, desc TEXT, desc2 TEXT, UOM TEXT, PRICE1 TEXT, PRICE2 TEXT,PRICE_MIN TEXT, BALANCEQTY TEXT, last_price TEXT, SyncDate TEXT)');
    
});
}
    

function storeData(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate) {

    var db = window.sqlitePlugin.openDatabase("Database", "1.0", "MANUFACTURE", 200000);
    var data = {
    values1 : [item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate]
    };
    

    insertData(data);


    function insertData(data) {
        
  
        db.transaction(function(tx) {
            //tx.executeSql('DROP TABLE IF EXISTS DATA');
            //tx.executeSql('create table if not exists DATA(item_group TEXT, item_code TEXT, type TEXT, desc TEXT, desc2 TEXT, UOM TEXT, PRICE1 TEXT, PRICE2 TEXT,PRICE_MIN TEXT, BALANCEQTY TEXT, last_price TEXT, SyncDate TEXT)');
            //tx.executeSql('DELETE FROM DATA');
            tx.executeSql(
                'INSERT INTO DATA(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                data.values1,
                successLogin,
                errorLogin
            );
        });
    }
}

function errorLogin(err){
alert("Error message :"+err);
}

function successLogin(){ 
    $(".btnsync").css("display","none");
    $(".btnsearch").css("display","none");
     $('.chineselastsync').css("display","none");
     loading.endLoading();
    count=count+1;
$('#progressbar1').css('display','block');
$('#progressbar1').attr('value',count);
//gif.startgif();

 $('.totalrecordresult').text(count+ ' / ' + datacount);

    if(count == datacount){
        $('.totalrecordresult').text(count);
        $('#progressbar1').css('display','none');
        $(".btnsync").css("display","block");
        $(".btnsearch").css("display","block");
        $('.lastsync').css("display","block");
      $('.lastsyncresult').css("display","block");
         $('.chineselastsync').css("display","block");
        
       
 
       // gif.endgif();
         navigator.notification.alert(
                             'All data(' + count+ ' record) has been synced / 全部数据已同步',  // message
                             alertDismissed,         // callback
                             'Alert',            // title
                             'OK'                  // buttonName
                         );
    }
//alert("success");
    
}
function OnerrorDelete(err){
alert("Error message :"+err);
}

function OnsuccessDelete(){
//alert("success1");
    alert("successdelete");
    
}

function alertDismissed(){
    
}

function getafterdate(dates){

    $.ajax({
      url: weburl+"/pcn/api/product",
      //url: "http://192.168.1.19/pcn/api/product",    
      type: "POST",
      data:"dateStr="+dates,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: apiTimeOut,  
        cache:false,
      success: function(data, status, xhr) {
        debugger; 
          if(data.length ==0){
              loading.endLoading();
              alert("No Latest Data");
          }
          else{
      $('.lastsync').css("display","none");
      $('.lastsyncresult').css("display","none");
    $('.chineselastsync').css("display","none");
            $(".btnsync").css("display","none");
    $(".btnsearch").css("display","none");
        //alert(JSON.stringify(data));
        DeleteAfterDate(data);
         // datacount=200;
        datacount=data.length;
          $('#progressbar1').attr('max',datacount);

        for(x=0;x<data.length;x++){
        storeAfterDate(data[x].item_group, data[x].item_code, data[x].type, data[x].desc, data[x].desc2, data[x].UOM, data[x].PRICE1, data[x].PRICE2,data[x].PRICE_MIN, data[x].BALANCEQTY,data[x].last_price,data[x].SyncDate);
      }
    }
         
       
      },
      error:function (xhr, ajaxOptions, thrownError){
        debugger;
          //alert("error"+xhr.responseText);
          //alert("Error: Unable to connect to server.");
        }
    }) 
    
}

function storeAfterDate(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate){

    var db = window.sqlitePlugin.openDatabase("Database", "1.0", "MANUFACTURE", 200000);
    var activity = {
    values1 : [item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate]
    };

    insertActivity(activity);
    
    function insertActivity(activity) {
        db.transaction(function(tx) {
           // tx.executeSql('DROP TABLE IF EXISTS ACTIVITY');
            tx.executeSql('create table if not exists ACTIVITY(item_group TEXT, item_code TEXT, type TEXT, desc TEXT, desc2 TEXT, UOM TEXT, PRICE1 TEXT, PRICE2 TEXT,PRICE_MIN TEXT, BALANCEQTY TEXT, last_price TEXT, SyncDate TEXT)');
           // tx.executeSql('DELETE FROM ACTIVITY');
            tx.executeSql(
                'INSERT INTO ACTIVITY(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                activity.values1,
                successStore,
                errorStore
            );
        });
    }
}

function successStore(){
loading.endLoading();
   count=count+1;
     $('.totalrecordresult').text(count+ ' / ' + datacount);
$('#progressbar1').css('display','block');
$('#progressbar1').attr('value',count);
 
    if(count==datacount){
      $('#progressbar1').css('display','none');
        loading.startLoading();
         dbmanager.initdb();
         dbmanager.GetTemporary(function(returnData){
              
             datacount=returnData.rows.length;
             $('#progressbar2').attr('max',datacount);
             var number=0;
             var updatenum =0;
             loading.endLoading();
             for(var z=0;z<returnData.rows.length;z++){
            
                 number=number+1;
                  $('.totalrecordresult').text(number+ ' / ' + datacount);
                 $('#progressbar2').css('display','block');
                 $('#progressbar2').attr('value',number);
                 var item_code = returnData.rows.item(z).item_code;
                 var item_group = returnData.rows.item(z).item_group;
                 var type = returnData.rows.item(z).type;
                 var desc = returnData.rows.item(z).desc;
                 var desc2 = returnData.rows.item(z).desc2;
                 var UOM = returnData.rows.item(z).UOM;
                 var PRICE1 = returnData.rows.item(z).PRICE1;
                 var PRICE2 = returnData.rows.item(z).PRICE2;
                 var PRICE_MIN = returnData.rows.item(z).PRICE_MIN;
                 var BALANCEQTY = returnData.rows.item(z).BALANCEQTY;
                 var last_price = returnData.rows.item(z).last_price;
                 var SyncDate = returnData.rows.item(z).SyncDate;
                 
                 
    
                  deletecertainrecord(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate);
                 
                  
                }; 

        
    });
         
     
}
}

function errorStore(err){
    alert("error"+err);
}

function deletecertainrecord(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate){
      db.transaction(function(tx) {
          tx.executeSql('DELETE FROM DATA WHERE item_code = ?', [item_code],
              function(tx, result) { showRecords(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate) }, 
              onError);
        });
}
function showRecords(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate){
    storeAgain(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate);
}

function onError(tx, error) {
    alert("Error processing SQL: "+error.message);
}
function DeleteAfterDate(data){
        var db = window.sqlitePlugin.openDatabase("Database", "1.0", "MANUFACTURE", 200000);
    db.transaction(function(txx) {
          //  txx.executeSql('DROP TABLE IF EXISTS ACTIVITY');
            txx.executeSql('DELETE FROM ACTIVITY');
            OnsuccessDelete,
            OnerrorDelete
       
        
        });
    
}

function storeAgain(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate) {

    var db = window.sqlitePlugin.openDatabase("Database", "1.0", "MANUFACTURE", 200000);
    var data = {
    values1 : [item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate]
    };
    

    insertAgain(data);


    function insertAgain(data) {
        
  
        db.transaction(function(tx) {
            //tx.executeSql('DROP TABLE IF EXISTS DATA');
            tx.executeSql('create table if not exists DATA(item_group TEXT, item_code TEXT, type TEXT, desc TEXT, desc2 TEXT, UOM TEXT, PRICE1 TEXT, PRICE2 TEXT,PRICE_MIN TEXT, BALANCEQTY TEXT, last_price TEXT, SyncDate TEXT)');
            //tx.executeSql('DELETE FROM DATA');
            tx.executeSql(
                'INSERT INTO DATA(item_group, item_code, type, desc, desc2, UOM, PRICE1, PRICE2,PRICE_MIN, BALANCEQTY, last_price, SyncDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                data.values1,
                successAgain,
                errorAgain
            );
        });
    }
}
var po=0;
function successAgain(){
    po=po+1;
    if(po == datacount){
        alert("All sync has been done");
        $('#progressbar2').css('display','none');
         $(".btnsync").css("display","block");
        $(".btnsearch").css("display","block");
        $('.lastsync').css("display","block");
      $('.lastsyncresult').css("display","block");
         $('.chineselastsync').css("display","block");
    }
    
}
function errorAgain(err){
   // alert(err);
}
