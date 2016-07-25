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

var test1;
var test2;
var test3;
var test4;

function homeOnClick(){
    var pwd=getUrlParameter("pwd");
    window.location="home.html?pwd="+pwd;
}

function searchOnClick(){

        
  $(".app").append("<div class='PwdBg'><div class='PwdContent'><div class='PwdHeader'><button class='PwdTitle'>Search / 搜寻</button><button class='PwdCloseBtn' onclick='closePwd();'><img src='img/close.png'/></button></div><div class='PwdDetails'><select class='dropdown'><option value='' disabled selected>Item Group / 物品组</option><option value=''></option></select></input><span class='or1'>OR</span><input class='inputcode' placeholder='ITEM CODE / 物品代码'></input><span class='or2'>OR</span><input class='inputdesc' placeholder='ITEM Description / 物品描述'></input><span class='or3'>OR</span><input class='inputdesc2' placeholder='ITEM Description 2 / 物品描述 2'></input><button class=btnSearch onclick='btnSearch();'>Search / 搜寻</button></div></div>");
    
      
              

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

function filtervalue(item_group,item_code, item_desc, item_desc2){
    loading.startLoading();
    test1=item_group;
    test2=item_code;
    test3=item_desc;
    test4=item_desc2;
    var count =0;
    var pass = getUrlParameter("pwd");
    var n4="";
    dbmanager.initdb();
    dbmanager.GeneralFilter(function(returnData){
        if(returnData.rows.length ==0){
            loading.endLoading();
        }
    for (y=0;y<returnData.rows.length;y++){
        
       
    count=count+1;
        $(".totalsearchresult").text(returnData.rows.length);
        if(returnData.rows.item(y).type == null){
            var type = "";
        }
        else {type =returnData.rows.item(y).type;
        }
        if(returnData.rows.item(y).desc2 == null){
            var desc2 = "";
        }
        else {desc2 =returnData.rows.item(y).desc2;
        }
        
        if(returnData.rows.item(y).item_group == null){
            var group = "";
        }
        else {group =returnData.rows.item(y).item_group;
        }
 
    var price1=parseFloat(returnData.rows.item(y).PRICE1);
    var n1 = price1.toFixed(2);
  
    var price2=parseFloat(returnData.rows.item(y).PRICE2);
    var n2 = price2.toFixed(2);
    var pricemin = parseFloat(returnData.rows.item(y).PRICE_MIN);
    var n3 = pricemin.toFixed(2);
    if(pass == "119988"){
    var lastprice = parseFloat(returnData.rows.item(y).last_price);
     n4 = lastprice.toFixed(2);
    }else if(pass != "119988"){
    var lastprice = parseFloat(returnData.rows.item(y).last_price);
     n4 = "";
    }
    var bqty = parseFloat(returnData.rows.item(y).BALANCEQTY);
    var bqty = bqty.toFixed(0);
        
    $(".merchantDiv").append("<li><div class='contentdiv'><table class='bigtable'><tr><td class='lefttd'><span>"+group+"</span></td><td class='midtd'><span class='bolder'>"+returnData.rows.item(y).item_code+"</span></td><td class='righttd'><span>"+type+"</span></td></tr><tr><td colspan=3 class='wholetd'><span>"+returnData.rows.item(y).desc+"</span></td></tr><tr><td colspan=3 class='wholetd'><span>"+desc2+"</span></td></tr><tr><td class='lefttd'><span class='bolder'>"+n1+"</span></td><td class='midtd'><span class='bolder'>"+n2+"</span></td><td class='righttd'><span class='bolder'>"+n3+"</span></td></tr><tr><td class='lefttd'><span>"+returnData.rows.item(y).UOM+"</span></td><td class='midtd'><span>"+bqty+"</span></td><td class='righttd'><span>"+n4+"</span></td></tr></table></div></li>");
  
        if(count==returnData.rows.length){
            loading.endLoading();
        }
    }
    }) 
}


function gofilter(){
                 
                var item_code = getUrlParameter("item_code");
                var item_group = getUrlParameter("item_group");
                var item_desc = getUrlParameter("item_desc");
                var item_desc2 = getUrlParameter("item_desc2");
            
            filtervalue(item_group,item_code, item_desc, item_desc2);
                      
}