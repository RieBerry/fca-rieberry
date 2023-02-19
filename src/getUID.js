/* eslint-disable linebreak-style */
"use strict";

module.exports = function (_defaultFuncs, api, _ctx) {
    return function getUID(link, callback) {
      var resolveFunc = function () { };
      var rejectFunc = function () { };
      var returnPromise = new Promise(function (resolve, reject) {
        resolveFunc = resolve;
        rejectFunc = reject;
      });
  
      if (!callback) {
        callback = function (err, uid) {
          if (err) return rejectFunc(err);
          resolveFunc(uid);
        };
      }
      
    try {
        var Link = String(link);
        var FindUID = require('../Extra/ExtraFindUID');
        if (Link.includes('facebook.com') || Link.includes('Facebook.com') || Link.includes('fb')) {
            var LinkSplit = Link.split('/');
            if (LinkSplit.indexOf("https:") == 0) {
              if (!isNaN(LinkSplit[3])) {
                api.sendMessage('Sai Link, Link Cần Có Định Dạng Như Sau: facebook.com/Lazic.Kanzu',globalThis.Fca.Data.event.threadID,globalThis.Fca.Data.event.messageID);
                callback(null, String(4));
              }
              else {
                FindUID(Link,api).then(function (data) {
                  callback(null, data);
                });
              }
            }
            else {
                var Form = `https://www.facebook.com/${LinkSplit[1]}`;
                FindUID(Form,api).then(function (data) {
                    callback(null, data);
                });
            }
        }
        else {
            callback(null, null);
            api.sendMessage('Sai Link, Link Cần Là Link Của Facebook',globalThis.Fca.Data.event.threadID,globalThis.Fca.Data.event.messageID)
        }
    }
    catch (e) {
      return callback(null, e);
    }
    return returnPromise;
    };
  };