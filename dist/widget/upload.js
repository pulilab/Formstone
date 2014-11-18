/*! 
 * Formstone v0.0.1 - 2014-11-18 
 * Library of modular javascript components. 
 * http://formstone.it/ 
 * 
 * Copyright 2014 Ben Plum; MIT Licensed 
 */

!function(a,b){"use strict";function c(a){if(b.fileSupport){var c="";c+='<div class="'+o.dropzone+'">',c+=a.label,c+="</div>",c+='<input class="'+o.input+'" type="file"',a.maxQueue>1&&(c+=" "+o.multiple),c+=">",this.addClass(o.base).append(c),a.$input=this.find(q.getClassName(o.input)),a.queue=[],a.total=0,a.uploading=!1,this.on(p.click,q.getClassName(o.dropzone),a,e).on(p.dragEnter,a,g).on(p.dragOver,a,h).on(p.dragLeave,a,i).on(p.drop,q.getClassName(o.dropzone),a,j),a.$input.on(p.change,a,f)}}function d(a){b.fileSupport&&(a.$input.off(p.namespace),this.off([p.click,p.dragEnter,p.dragOver,p.dragLeave,p.drop].join(" ")).removeClass(o.base).html(""))}function e(a){a.stopPropagation(),a.preventDefault();var b=a.data;b.$input.trigger(p.click)}function f(a){a.stopPropagation(),a.preventDefault();var b=a.data,c=b.$input[0].files;c.length&&k(b,c)}function g(a){a.stopPropagation(),a.preventDefault();var b=a.data;b.$el.addClass(o.dropping)}function h(a){a.stopPropagation(),a.preventDefault();var b=a.data;b.$el.addClass(o.dropping)}function i(a){a.stopPropagation(),a.preventDefault();var b=a.data;b.$el.removeClass(o.dropping)}function j(a){a.preventDefault();var b=a.data,c=a.originalEvent.dataTransfer.files;b.$el.removeClass(o.dropping),k(b,c)}function k(b,c){for(var d=[],e=0;e<c.length;e++){var f={index:b.total++,file:c[e],name:c[e].name,size:c[e].size,started:!1,complete:!1,error:!1,transfer:null};d.push(f),b.queue.push(f)}b.uploading||(a(window).on(p.beforeUnload,function(){return b.leave}),b.uploading=!0),b.$el.trigger(p.start,[d]),l(b)}function l(b){var c=0,d=[];for(var e in b.queue)!b.queue.hasOwnProperty(e)||b.queue[e].complete||b.queue[e].error||d.push(b.queue[e]);b.queue=d;for(var f in b.queue)if(b.queue.hasOwnProperty(f)){if(!b.queue[f].started){var g=new FormData;g.append(b.postKey,b.queue[f].file);for(var h in b.postData)b.postData.hasOwnProperty(h)&&g.append(h,b.postData[h]);m(b,b.queue[f],g)}if(c++,c>=b.maxQueue)return;e++}0===c&&(a(window).off(p.beforeUnload),b.uploading=!1,b.$el.trigger(p.complete))}function m(b,c,d){c.size>=b.maxSize?(c.error=!0,b.$el.trigger(p.fileError,[c,"Too large"]),l(b)):(c.started=!0,c.transfer=a.ajax({url:b.action,data:d,type:"POST",contentType:!1,processData:!1,cache:!1,xhr:function(){var d=a.ajaxSettings.xhr();return d.upload&&d.upload.addEventListener(p.progressClean,function(a){var d=0,e=a.loaded||a.position,f=a.total;a.lengthComputable&&(d=Math.ceil(e/f*100)),b.$el.trigger(p.fileProgress,[c,d])},!1),d},beforeSend:function(){b.$el.trigger(p.fileStart,[c])},success:function(a){c.complete=!0,b.$el.trigger(p.fileComplete,[c,a]),l(b)},error:function(a,d,e){c.error=!0,b.$el.trigger(p.fileError,[c,e]),l(b)}}))}var n=b.Plugin("upload",{widget:!0,defaults:{customClass:"",action:"",label:"Drag and drop files or click to select",leave:"You have uploads pending, are you sure you want to leave this page?",maxQueue:2,maxSize:5242880,postData:{},postKey:"file"},classes:["input","dropzone","multiple","dropping"],events:["complete","fileStart","fileProgress","fileComplete","fileError","start"],methods:{_construct:c,_destruct:d}}),o=n.classes,p=n.events,q=n.functions;p.progressClean="progress"}(jQuery,Formstone);