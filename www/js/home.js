/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
       
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        app.receivedEvent('deviceready');
              
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var input1;
var input2;
var input3;
var input4;
function searchOnClick(){

        
    $(".app").append("<div class='PwdBg'><div class='PwdContent'><div class='PwdHeader'><button class='PwdTitle'>Search / 搜寻</button><button class='PwdCloseBtn' onclick='closePwd();'><img src='img/close.png'/></button></div><div class='PwdDetails'><select class='dropdown'><option value='' disabled selected>Item Group / 物品组</option><option value=''></option></select></input><span class='or1'>OR</span><input id='inputcode' class='inputcode' placeholder='ITEM CODE / 物品代码'></input><span class='or2'>OR</span><input class='inputdesc' placeholder='ITEM Description / 物品描述'></input><span class='or3'>OR</span><input class='inputdesc2' placeholder='ITEM Description 2 / 物品描述 2'></input><button class=btnSearch onclick='btnSearch();'>Search / 搜寻</button></div></div>");
    
             
     $(".inputdesc")
            .focus()
            .on("keydown", function (e) {
                
                if (e.keyCode === 13) {
                        btnSearch();
                     };
                }); 
    
      $(".inputdesc2")
            .focus()
            .on("keydown", function (e) {
                
                if (e.keyCode === 13) {
                        btnSearch();
                     };
                }); 
    
     $(".inputcode")
            .focus()
            .on("keydown", function (e) {
                
                if (e.keyCode === 13) {
                        btnSearch();
                     };
                });  
     dbmanager.initdb();
    dbmanager.getAllGroup(function(returnData){

  for (y=0;y<returnData.rows.length;y++){  
    var name=returnData.rows.item(y).item_group;
   $(".dropdown").append($("<option></option>").attr("value",name).text(name));

  
   
    }
    })
    
  

        
}
function closePwd(){
    $(".PwdBg").remove();
}

function closePwd2(){
    $(".PwdBg2").remove();
}

function btnSearch(){
  
    input2=$('.inputcode').val();
    input1=$('.dropdown').val();
    input3=$('.inputdesc').val();
    input4=$('.inputdesc2').val();
    var pwd = getUrlParameter("pwd");
 
   // both input empty
    if(input1 == null && input2 =="" && input3 =="" && input4==""){
        //alert("Please enter a search value.");
        
        navigator.notification.alert(
            'Please enter a search value / 请输入搜寻内容',  // message
            alertDismissed,         // callback
            'Alert',            // title
            'OK'                  // buttonName
        );
        
        
        
    }
    else if(input1 !=null || input2 !="" || input3 !="" || input4 !="" ){
    window.location="listing.html?item_group="+input1+"&item_code="+input2+"&item_desc="+input3+"&item_desc2="+input4+"&pwd="+pwd;
    }
}






function syncOnClick(){
    
            
  
   //  getActivityList();   
    navigator.notification.confirm("Are you sure want to sync to 192.168.0.250/pcn now? / 你确定现在要同步至 192.168.0.250/pcn 吗？", onSyncConfirm, "Confirmation", "Yes,No");  
    

}

 function onSyncConfirm(button) {
                if(button==2){//If User selected No, then we just do nothing
                    return;
                }else if(button ==1){
                    var isOffline = 'onLine' in navigator && !navigator.onLine;

                    if ( isOffline ) {
                         navigator.notification.alert(
                             'Please connect to network / 请连接网络',  // message
                             alertDismissed,         // callback
                             'Alert',            // title
                             'OK'                  // buttonName
                         );
                    }
                    else {
//                        loading.startLoading();
//                        getActivityList(); 
                         
                dbmanager.initdb();
                dbmanager.createTable();
                dbmanager.getSyncDate(function(returnData){
                   loading.startLoading();
                    
                    if(returnData.rows.length>0)
                    {
                        var dates ="2016-04-01 00:00:00.000";
                    
                        dates = returnData.rows.item(0).sd;
                        dates = dates.replace("T", " ");
                        getafterdate(dates);
                    }
                    else
                    {
                        getActivityList();
                    }   
                        
                    });  
                    } 
                    }
}

function alertDismissed() {
            // do something
    }


