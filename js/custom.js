"use strict";function _typeof(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o])}return s})({1:[function(require,module,exports){$(function(){$("#go-top, .go-top").click(function(){$("html, body").animate({scrollTop:0},"slow");return false});$("input[type='number'][maxlength]").on("keyup keydown keypress blur change input",function(e){if(e.keyCode===8||e.keyCode===9){return true}return this.value.length<+this.attributes.maxlength.value});$(document).on("click",".nav-toggle",function(){$("#menu").toggleClass("is-active")});if($(".sticky-header").length){var _this=$(".sticky-header");var afterFixed=$(".js-after-fixed");if(afterFixed){afterFixed.css("padding-top",$(".fixed").height())}}$(".js-tab").each(function(){var _this=$(this);var nav=_this.find(".js-tabnav");var handleClick="ontouchstart"in document.documentElement?"touchstart":"click";$(nav).on(handleClick,"a[href^='#']",function(e){e.preventDefault();if($(this).parent().hasClass("active")){return}$(nav).find(".active").removeClass("active");$(this).parent().addClass("active");var target=$($(this).attr("href"));target.siblings().removeClass("in");setTimeout(function(){target.siblings().removeClass("active")},100);target.addClass("active");setTimeout(function(){target.addClass("in")},100)})})});$(window).on("load",function(){$("a.go-to[href^='#']").click(function(e){e.preventDefault();$("#menu").removeClass("is-active");var target=$($(this).attr("href"));if(target.length){var fixedHeight=$(".fixed").height()||0;var pos=target.offset().top-fixedHeight;$("html, body").animate({scrollTop:pos},"slow")}})});$(function(){var input=$("#request"),inputHidden=$("#request_hidden"),$select=$(".custom-select"),_open=function _open(){$select.addClass("select-open")},_close=function _close(){$select.removeClass("select-open")},_changeSlected=function _changeSlected(elem){$select.find("li").removeClass("selected");$(elem).addClass("selected")},_update=function _update(val){val=val||"\u9805\u76EE\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044";input.text(val);inputHidden.val(val);_validate()},_validate=function _validate(){if(input.text().trim()=="\u9805\u76EE\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044"){inputHidden.addClass("has-error");inputHidden.val("")}else{inputHidden.removeClass("has-error")}};input.on("click",function(){_open()});$select.on("click","li",function(){var val=$(this).data("value");_changeSlected(this);_update(val);_close()});$(document).on("click touchstart",function(event){if(!$(event.target).closest(".custom-select").length){_close()}})});$(function(){var $reqVal,$nameVal,$companyVal,$emailVal,$questionVal;var submitCallBack=function submitCallBack(){$(".contact-submit .fa").addClass("fa-spin fa-spinner");$.ajax({url:"gmail.php",type:"POST",data:{send_mail:true,request:$reqVal,name:$nameVal,company:$companyVal,email:$emailVal,question:$questionVal},success:function success(res){$(".contact-submit .fa").removeClass("fa-spinner fa-spin").addClass("fa-check");document.getElementsByClassName("contact--form")[0].reset()},error:function error(xhr,status,err){console.log(xhr,status,err);$(".contact-submit .fa").removeClass("fa-spinner fa-spin").addClass("fa-exclamation")}})};var closeCallBack=function closeCallBack(){$("#js_mail_result").removeClass("show")};var setPreviewValue=function setPreviewValue(){$reqVal=$("input[name = \"request_hidden\"]").val();$nameVal=$("#name").val();$companyVal=$("#company").val();$emailVal=$("#email").val();$questionVal=$("#question").val();$(".review-request .review-text").text($reqVal);$(".review-name .review-text").text($nameVal);$(".review-company .review-text").text($companyVal);$(".review-email .review-text").text($emailVal);$(".review-question .review-text").text($questionVal)};$.validator.setDefaults({submitHandler:function submitHandler(){alert("submitted!")}});$("#contact--form").validate({focusInvalid:false,ignore:"",rules:{request_hidden:"required",name:"required",company:"required",email:{required:true,email:true,maxlength:255},question:{required:true,minlength:2}},messages:{request_hidden:"",name:"\u304A\u540D\u524D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",company:"\u8CB4\u793E\u540D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",email:{required:"\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",email:"\u6B63\u3057\u3044\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",maxlength:"\u6B63\u3057\u3044\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002"},question:{required:"\u304A\u554F\u3044\u5408\u308F\u305B\u5185\u5BB9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",minlength:"\u5C11\u306A\u304F\u3068\u3082\u4E8C\u6587\u5B57\u4EE5\u4E0A"}},errorElement:"span",errorContainer:".notice-error",errorPlacement:function errorPlacement(error,element){error.addClass("required-notice");if(element.prop("type")==="checkbox"){error.insertAfter(element.parent("label"))}else{error.insertAfter(element)}},highlight:function highlight(element,errorClass,validClass){$(element).addClass("has-error")},unhighlight:function unhighlight(element,errorClass,validClass){$(element).removeClass("has-error")},submitHandler:function submitHandler(){setPreviewValue();$("#js_contact_confirm").addClass("show")}});$(".btn_accept_send").click(function(){submitCallBack();$("#js_contact_confirm").removeClass("show")});$(".btn_cancel_send").click(function(){closeCallBack();$("#js_contact_confirm").removeClass("show")});$(document).on("click",".contact_reset",function(){$("#js_mail_result").removeClass("show")})});$(function(){if($("#js-select-date").length){var Year=$("#year"),Month=$("#month"),Day=$("#day"),daysInMonth=[31,29,31,30,31,30,31,31,30,31,30,31],thisYear=new Date().getFullYear();var reCruitFrom=thisYear-60,reCruitTo=thisYear-20,listYear=[],isLeapYear=function isLeapYear(year){return year%4===0&&year%100!==0||year%400===0},appendOption=function appendOption(elm,value){var value=value||"";elm.append("<option value=\"".concat(value,"\" >").concat(value,"</option>"))},changeMonth=function changeMonth(){var yealVal=Year.val(),monthVal=Month.val(),dayVal=Day.val(),totalDay;if(monthVal==2){isLeapYear(yealVal)?daysInMonth[1]=29:daysInMonth[1]=28}totalDay=daysInMonth[monthVal-1];if(!monthVal){return}else{var lastOptionVal=Day.find("option").last().val();if(lastOptionVal<totalDay){while(lastOptionVal<totalDay){appendOption(Day,++lastOptionVal)}}else if(lastOptionVal>totalDay){while(lastOptionVal>totalDay){Day.find("option").last().remove();lastOptionVal--}}return}},testSelectDate=function testSelectDate(){$("body").append("<script src=\"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js\"></script>");setTimeout(function(){var yealVal=Year.val(),monthVal=Month.val(),dayVal=Day.val(),date=moment("".concat(dayVal,".").concat(monthVal,".").concat(yealVal),"DD.MM.YYYY");console.log("test select :",date.isValid())},500)};for(var i=reCruitFrom;i<=reCruitTo;i++){listYear.push(i)}Year.empty();Month.empty();Day.empty();appendOption(Year);listYear.forEach(function(item,index){appendOption(Year,item)});appendOption(Month);for(var _i=1;_i<=12;_i++){appendOption(Month,_i)}appendOption(Day);for(var _i2=1;_i2<=31;_i2++){appendOption(Day,_i2)}Year.on("change",changeMonth);Month.on("change",changeMonth)}});window.myMap=function myMap(){var mapElem=document.getElementById("googleMap");if(mapElem){var myLatLng={lat:35.527735,lng:139.699773};var mapProp={center:new google.maps.LatLng(myLatLng),zoom:16,styles:[{elementType:"labels.text.fill",stylers:[{color:"#7c9eb0"}]},{elementType:"geometry.fill",stylers:[{color:"#ecf1f3"}]},{elementType:"geometry.stroke",stylers:[{color:"#98bbce"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#c1d1d9"}]},{featureType:"road",elementType:"geometry.fill",stylers:[{color:"#ffffff"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#80a0b2"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#d5dfe5"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#638ba1"}]}]};var map=new google.maps.Map(mapElem,mapProp);var marker=new google.maps.Marker({position:myLatLng,map:map,title:"Hello World!"});marker.setMap(map)}};$(function(){var Postal_code=require("japan-postal-code"),code,code1=$("#first3"),code2=$("#last4"),Prefecture=$("#prefecture"),City=$("#city"),listPrefecture=["\u611B\u77E5\u770C","\u79CB\u7530\u770C","\u9752\u68EE\u770C","\u5343\u8449\u770C","\u611B\u5A9B\u770C","\u798F\u4E95\u770C","\u798F\u5CA1\u770C","\u798F\u5CF6\u770C","\u5C90\u961C\u770C","\u7FA4\u99AC\u770C","\u5E83\u5CF6\u770C","\u5317\u6D77\u9053","\u5175\u5EAB\u770C","\u8328\u57CE\u770C","\u77F3\u5DDD\u770C","\u5CA9\u624B\u770C","\u9999\u5DDD\u770C","\u9E7F\u5150\u5CF6\u770C","\u795E\u5948\u5DDD\u770C","\u9AD8\u77E5\u770C","\u718A\u672C\u770C","\u4EAC\u90FD\u5E9C","\u4E09\u91CD\u770C","\u5BAE\u57CE\u770C","\u5BAE\u5D0E\u770C","\u9577\u91CE\u770C","\u9577\u5D0E\u770C","\u5948\u826F\u770C","\u65B0\u6F5F\u770C","\u5927\u5206\u770C","\u5CA1\u5C71\u770C","\u6C96\u7E04\u770C","\u5927\u962A\u5E9C","\u4F50\u8CC0\u770C","\u57FC\u7389\u770C","\u6ECB\u8CC0\u770C","\u5CF6\u6839\u770C","\u9759\u5CA1\u770C","\u6803\u6728\u770C","\u5FB3\u5CF6\u770C","\u6771\u4EAC\u90FD","\u9CE5\u53D6\u770C","\u5BCC\u5C71\u770C","\u548C\u6B4C\u5C71\u770C","\u5C71\u5F62\u770C","\u5C71\u53E3\u770C","\u5C71\u68A8\u770C"],$job,$name,$birthday,$gender,$email,$phone,$zipCode,$pref,$city,$addr;function setPreview(){function getVal(name){return $("input[name=\"".concat(name,"\"]")).val()}function setText(id,text){$("#preview-".concat(id)).text("".concat(text))};function numberFormat(number,slice,sepatate){var arr=[],temp=number.split("").reverse();temp.forEach(function(el,i){(i+1)%slice==0&&i!=0?arr.push(el)&&arr.push(sepatate):arr.push(el)});return arr.reverse().join("")}function phoneFormat(text){return text.replace(/(\d{3})(\d{4})(\d{4})/,"$1-$2-$3")}function zipCodeFormat(text){return text.replace(/(\d{3})(\d{4})/,"$1-$2")}$job=getVal("job");$name=getVal("firstname_kanji")+" "+getVal("lastname_kanji");$gender=$("input[name=\"gender\"]:checked").val();$birthday=$("#year").val()+"\u5E74"+$("#month").val()+"\u6708"+$("#day").val()+"\u65E5";$email=getVal("email");$phone=getVal("phone");$phone=numberFormat($phone,4,"-");$zipCode=getVal("first3")+getVal("last4");$zipCode=numberFormat($zipCode,4,"-");$pref=Prefecture.val();$city=getVal("city");$addr=getVal("address");["job","name","birthday","gender","email","phone","zipCode","pref","city","addr"].forEach(function(item){return setText(item,eval("$".concat(item)))})}function goStep(nth,e){var pos=$(".js-tabnav").offset().top;$("html, body").scrollTop(pos);e&&e.preventDefault?e.preventDefault():"";var targetHref=".tab".concat(nth);var targetHrefHash="#tab".concat(nth);var target=$(targetHref);target.siblings().removeClass("in");setTimeout(function(){target.siblings().removeClass("active")},100);setTimeout(function(){target.addClass("active");target.addClass("in")},100);var nav=$(".js-tabnav");$(nav).find(".active").removeClass("active");nav.find("a[href=\"".concat(targetHrefHash,"\"]")).parent().addClass("active")}listPrefecture.map(function(item){Prefecture.append("<option value=\"".concat(item,"\">").concat(item,"</option>"))});jQuery.validator.addMethod("fullWidthJpnChar",function(value,element){return this.optional(element)||/^[ぁ-ん一-龥]+$/.test(value)},"full width required");jQuery.validator.addMethod("kataFullWidth",function(value,element){return this.optional(element)||/^[ァ-ン]+$/.test(value)},"kata required");$("#recruit-form").validate({focusInvalid:false,ignore:"#first3, #last4",rules:{job:"required",firstname_kanji:{required:true,fullWidthJpnChar:true},lastname_kanji:{required:true,fullWidthJpnChar:true},firstname_kata:{required:true,kataFullWidth:true},lastname_kata:{required:true,kataFullWidth:true},year:"required",month:"required",day:"required",gender:"required",email:{required:true,email:true,maxlength:255},re_email:{required:true,equalTo:"#email"},phone:{required:true,number:true},prefecture:"required",city:"required",address:"required"},messages:{},errorElement:"span",errorContainer:".notice-error",errorPlacement:function errorPlacement(error,element){},highlight:function highlight(element,errorClass,validClass){if($(element).prop("type")==="radio"){$(element).parent().parent().addClass("has-error")}$(element).addClass("has-error")},unhighlight:function unhighlight(element,errorClass,validClass){if($(element).prop("type")==="radio"){$(element).parent().parent().removeClass("has-error")}else{$(element).removeClass("has-error")}},submitHandler:function submitHandler(e){e.preventdefault();$("#recruit-form-submit .fa.form-check").addClass("fa-spinner fa-spin");$.ajax({url:"https://jsonplaceholder.typicode.com/todos/1",data:{$job:$job,$name:$name,$gender:$gender,$birthday:$birthday,$email:$email,$phone:$phone,$zipCode:$zipCode,$Prefecture:$Prefecture,$city:$city,$addr:$addr},success:function success(res){$("#recruit-form-submit .fa").removeClass("fa-spinner fa-spin");$(".contact-thanks p").html("\u5F8C\u307B\u3069\u62C5\u5F53\u8005\u3088\u308A\u3054\u9023\u7D61\u3092 <br class=\"show-sp\"/> \u5DEE\u3057\u4E0A\u3052\u307E\u3059\u306E\u3067 <br/> \u3057\u3070\u3089\u304F\u304A\u5F85\u3061\u304F\u3060\u3055\u3044");document.getElementById("recruit-form").reset();goStep(3)},error:function error(xhr,status,err){$("#recruit-form-submit .fa").removeClass("fa-spinner fa-spin");$(".contact-thanks p").html("some thing wrong!");goStep(3)}})}});$(".js-find-addr").click(function(e){e.preventDefault();code=code1.val()+code2.val();Postal_code.get(code,function(address){if(Prefecture.find("option[value=\"".concat(address.prefecture,"\"]"))){Prefecture.find("option[value=\"".concat(address.prefecture,"\"]")).prop("selected",true)}else{Prefecture.append("<option value=\"".concat(address.prefecture,"\" selected >").concat(address.prefecture,"</option>"))}City.val(address.city+" "+address.area+" "+address.street)})});$("#re_email").on("cut copy paste",function(e){e.preventDefault()});$(".step-nav").on("click","a:not(.link)",function(e){var href=$(this).attr("href");var nth=href.replace("#tab","");goStep(nth,e)});$("#firstsubmit").click(function(e){if($("#recruit-form").valid()){setPreview();goStep(2,e)}});$("#first3").on("keyup",function(e){if($(this).val().length>=3){$("#last4").trigger("select")}});$("#last4").on("keyup",function(e){this.value=this.value.split("").slice(0,4).join("")})})},{"japan-postal-code":4}],2:[function(require,module,exports){(function(process){exports=module.exports=require("./debug");exports.log=log;exports.formatArgs=formatArgs;exports.save=save;exports.load=load;exports.useColors=useColors;exports.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:localstorage();exports.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"];function useColors(){if(typeof window!=="undefined"&&window.process&&window.process.type==="renderer"){return true}return typeof document!=="undefined"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window!=="undefined"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator!=="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator!=="undefined"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}exports.formatters.j=function(v){try{return JSON.stringify(v)}catch(err){return"[UnexpectedJSONParseError]: "+err.message}};function formatArgs(args){var useColors=this.useColors;args[0]=(useColors?"%c":"")+this.namespace+(useColors?" %c":" ")+args[0]+(useColors?"%c ":" ")+"+"+exports.humanize(this.diff);if(!useColors)return;var c="color: "+this.color;args.splice(1,0,c,"color: inherit");var index=0;var lastC=0;args[0].replace(/%[a-zA-Z%]/g,function(match){if("%%"===match)return;index++;if("%c"===match){lastC=index}});args.splice(lastC,0,c)}function log(){return"object"===(typeof console==="undefined"?"undefined":_typeof(console))&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function save(namespaces){try{if(null==namespaces){exports.storage.removeItem("debug")}else{exports.storage.debug=namespaces}}catch(e){}}function load(){var r;try{r=exports.storage.debug}catch(e){}if(!r&&typeof process!=="undefined"&&"env"in process){r=process.env.DEBUG}return r}exports.enable(load());function localstorage(){try{return window.localStorage}catch(e){}}}).call(this,require("e/U+97"))},{"./debug":3,"e/U+97":7}],3:[function(require,module,exports){exports=module.exports=createDebug.debug=createDebug["default"]=createDebug;exports.coerce=coerce;exports.disable=disable;exports.enable=enable;exports.enabled=enabled;exports.humanize=require("ms");exports.names=[];exports.skips=[];exports.formatters={};var prevTime;function selectColor(namespace){var hash=0,i;for(i in namespace){hash=(hash<<5)-hash+namespace.charCodeAt(i);hash|=0}return exports.colors[Math.abs(hash)%exports.colors.length]}function createDebug(namespace){function debug(){if(!debug.enabled)return;var self=debug;var curr=+new Date;var ms=curr-(prevTime||curr);self.diff=ms;self.prev=prevTime;self.curr=curr;prevTime=curr;var args=new Array(arguments.length);for(var i=0;i<args.length;i++){args[i]=arguments[i]}args[0]=exports.coerce(args[0]);if("string"!==typeof args[0]){args.unshift("%O")}var index=0;args[0]=args[0].replace(/%([a-zA-Z%])/g,function(match,format){if(match==="%%")return match;index++;var formatter=exports.formatters[format];if("function"===typeof formatter){var val=args[index];match=formatter.call(self,val);args.splice(index,1);index--}return match});exports.formatArgs.call(self,args);var logFn=debug.log||exports.log||console.log.bind(console);logFn.apply(self,args)}debug.namespace=namespace;debug.enabled=exports.enabled(namespace);debug.useColors=exports.useColors();debug.color=selectColor(namespace);if("function"===typeof exports.init){exports.init(debug)}return debug}function enable(namespaces){exports.save(namespaces);exports.names=[];exports.skips=[];var split=(typeof namespaces==="string"?namespaces:"").split(/[\s,]+/);var len=split.length;for(var i=0;i<len;i++){if(!split[i])continue;namespaces=split[i].replace(/\*/g,".*?");if(namespaces[0]==="-"){exports.skips.push(new RegExp("^"+namespaces.substr(1)+"$"))}else{exports.names.push(new RegExp("^"+namespaces+"$"))}}}function disable(){exports.enable("")}function enabled(name){var i,len;for(i=0,len=exports.skips.length;i<len;i++){if(exports.skips[i].test(name)){return false}}for(i=0,len=exports.names.length;i<len;i++){if(exports.names[i].test(name)){return true}}return false}function coerce(val){if(val instanceof Error)return val.stack||val.message;return val}},{"ms":6}],4:[function(require,module,exports){var jsonp=require("jsonp"),JSONDATA="https://yubinbango.github.io/yubinbango-data/data",CACHE=[],PREFMAP=[null,"\u5317\u6D77\u9053","\u9752\u68EE\u770C","\u5CA9\u624B\u770C","\u5BAE\u57CE\u770C","\u79CB\u7530\u770C","\u5C71\u5F62\u770C","\u798F\u5CF6\u770C","\u8328\u57CE\u770C","\u6803\u6728\u770C","\u7FA4\u99AC\u770C","\u57FC\u7389\u770C","\u5343\u8449\u770C","\u6771\u4EAC\u90FD","\u795E\u5948\u5DDD\u770C","\u65B0\u6F5F\u770C","\u5BCC\u5C71\u770C","\u77F3\u5DDD\u770C","\u798F\u4E95\u770C","\u5C71\u68A8\u770C","\u9577\u91CE\u770C","\u5C90\u961C\u770C","\u9759\u5CA1\u770C","\u611B\u77E5\u770C","\u4E09\u91CD\u770C","\u6ECB\u8CC0\u770C","\u4EAC\u90FD\u5E9C","\u5927\u962A\u5E9C","\u5175\u5EAB\u770C","\u5948\u826F\u770C","\u548C\u6B4C\u5C71\u770C","\u9CE5\u53D6\u770C","\u5CF6\u6839\u770C","\u5CA1\u5C71\u770C","\u5E83\u5CF6\u770C","\u5C71\u53E3\u770C","\u5FB3\u5CF6\u770C","\u9999\u5DDD\u770C","\u611B\u5A9B\u770C","\u9AD8\u77E5\u770C","\u798F\u5CA1\u770C","\u4F50\u8CC0\u770C","\u9577\u5D0E\u770C","\u718A\u672C\u770C","\u5927\u5206\u770C","\u5BAE\u5D0E\u770C","\u9E7F\u5150\u5CF6\u770C","\u6C96\u7E04\u770C"];exports.get=function(zip_code,callback){var vzip=zip_code;if(!vzip)return;var nzip="";for(var i=0;i<vzip.length;i++){var chr=vzip.charCodeAt(i);if(chr<48)continue;if(chr>57)continue;nzip+=vzip.charAt(i)}if(nzip.length<7)return;var zip3=nzip.substr(0,3);var data=CACHE[zip3];if(data)return parse(nzip,data,callback);fetchRemote(nzip,callback)};var parse=function parse(nzip,data,callback){var array=data[nzip];var opera=nzip-0+4278190080+"";if(!array&&data[opera])array=data[opera];if(!array)return;var pref_id=array[0];if(!pref_id)return;var jpref=PREFMAP[pref_id];if(!jpref)return;var jcity=array[1];if(!jcity)jcity="";var jarea=array[2];if(!jarea)jarea="";var jstrt=array[3];if(!jstrt)jstrt="";callback({"prefecture":jpref,"city":jcity,"area":jarea,"street":jstrt})};var fetchRemote=function fetchRemote(nzip,callback){var zip3=nzip.substr(0,3);var url=JSONDATA+"/"+zip3+".js";jsonp(url,{name:"$yubin"},function(error,data){if(!error){CACHE[zip3]=data;parse(nzip,data,callback)}})}},{"jsonp":5}],5:[function(require,module,exports){var debug=require("debug")("jsonp");module.exports=jsonp;var count=0;function noop(){}function jsonp(url,opts,fn){if("function"==typeof opts){fn=opts;opts={}}if(!opts)opts={};var prefix=opts.prefix||"__jp";var id=opts.name||prefix+count++;var param=opts.param||"callback";var timeout=null!=opts.timeout?opts.timeout:60000;var enc=encodeURIComponent;var target=document.getElementsByTagName("script")[0]||document.head;var script;var timer;if(timeout){timer=setTimeout(function(){cleanup();if(fn)fn(new Error("Timeout"))},timeout)}function cleanup(){if(script.parentNode)script.parentNode.removeChild(script);window[id]=noop;if(timer)clearTimeout(timer)}function cancel(){if(window[id]){cleanup()}}window[id]=function(data){debug("jsonp got",data);cleanup();if(fn)fn(null,data)};url+=(~url.indexOf("?")?"&":"?")+param+"="+enc(id);url=url.replace("?&","?");debug("jsonp req \"%s\"",url);script=document.createElement("script");script.src=url;target.parentNode.insertBefore(script,target);return cancel}},{"debug":2}],6:[function(require,module,exports){var s=1000;var m=s*60;var h=m*60;var d=h*24;var y=d*365.25;module.exports=function(val,options){options=options||{};var type=_typeof(val);if(type==="string"&&val.length>0){return parse(val)}else if(type==="number"&&isNaN(val)===false){return options.long?fmtLong(val):fmtShort(val)}throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(val))};function parse(str){str=String(str);if(str.length>100){return}var match=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);if(!match){return}var n=parseFloat(match[1]);var type=(match[2]||"ms").toLowerCase();switch(type){case"years":case"year":case"yrs":case"yr":case"y":return n*y;case"days":case"day":case"d":return n*d;case"hours":case"hour":case"hrs":case"hr":case"h":return n*h;case"minutes":case"minute":case"mins":case"min":case"m":return n*m;case"seconds":case"second":case"secs":case"sec":case"s":return n*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return undefined;}}function fmtShort(ms){if(ms>=d){return Math.round(ms/d)+"d"}if(ms>=h){return Math.round(ms/h)+"h"}if(ms>=m){return Math.round(ms/m)+"m"}if(ms>=s){return Math.round(ms/s)+"s"}return ms+"ms"}function fmtLong(ms){return plural(ms,d,"day")||plural(ms,h,"hour")||plural(ms,m,"minute")||plural(ms,s,"second")||ms+" ms"}function plural(ms,n,name){if(ms<n){return}if(ms<n*1.5){return Math.floor(ms/n)+" "+name}return Math.ceil(ms/n)+" "+name+"s"}},{}],7:[function(require,module,exports){var process=module.exports={};process.nextTick=function(){var canSetImmediate=typeof window!=="undefined"&&window.setImmediate;var canPost=typeof window!=="undefined"&&window.postMessage&&window.addEventListener;if(canSetImmediate){return function(f){return window.setImmediate(f)}}if(canPost){var queue=[];window.addEventListener("message",function(ev){var source=ev.source;if((source===window||source===null)&&ev.data==="process-tick"){ev.stopPropagation();if(queue.length>0){var fn=queue.shift();fn()}}},true);return function nextTick(fn){queue.push(fn);window.postMessage("process-tick","*")}}return function nextTick(fn){setTimeout(fn,0)}}();process.title="browser";process.browser=true;process.env={};process.argv=[];function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")}},{}]},{},[1]);
//# sourceMappingURL=../maps/custom.js.map
