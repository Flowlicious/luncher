"use strict";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const cors = require("cors")({ origin: true });
var userList = {};

// Setting Web Push credentials
var webPush = require("web-push");
webPush.setVapidDetails(
  "mailto:f.gruehn@googlemail.com",
  "BA_wOJLtF3JqkGjsWc3M9-AQ2ZXOgQjB9JtlvZSdVBPp1EArT6t-Qo76cHSvSEOl3-EXATGL941KufDvwhJo2wQ",
  "PV-T4HvjPwM89qnq5kFqJ6fUyXwyLXnCwT2FXJrdCgQ"
);

var pushSubscriptions = [];
var subRef = admin.database().ref("/pushSubscriptions");
var activeUserRef = admin.database().ref("/activeUsers");
subRef.on("child_added", function(data) {
  pushSubscriptions.push(data.val());
});
var activeUsers = [];
activeUserRef.on("child_added", function(data) {
  activeUsers.push(data.val());
});

// Subscribe to Web Push
exports.webPush = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    console.log(
      "Web push subscription object received: ",
      req.body.subscription,
      req.body.user
    );

    var notificationData = {};
    var subscriptionIndex;
    notificationData.notification = {
      title: "",
      body: "",
      dir: "auto",
      icon: "",
      badge: "",
      lang: "en",
      renotify: true,
      requireInteraction: true,
      tag: "",
      vibrate: [300, 100, 400],
      data: ""
    };

    if (req.body.action === "subscribe") {
      if (
        arrayObjectIndexOf(
          pushSubscriptions,
          req.body.subscription.endpoint,
          "endpoint"
        ) == -1
      ) {
        subRef.push({
          user: req.body.user,
          subscription: req.body.subscription
        });
        activeUserRef.push(req.body.user);
        userList[req.body.user] = req.body.subscription;
        subscriptionIndex = arrayObjectIndexOf(
          pushSubscriptions,
          req.body.subscription.endpoint,
          "endpoint"
        );
        console.log(
          "Subscription registered: " +
            req.body.subscription.endpoint +
            " at " +
            subscriptionIndex
        );
      } else {
        console.log(
          "Subscription was already registered: " +
            req.body.subscription.endpoint
        );
      }

      console.log(activeUsers[subscriptionIndex] + " subscribed Web push");
      notificationData.notification.title = activeUsers[subscriptionIndex];
      notificationData.notification.body =
        activeUsers[subscriptionIndex] + " subscribed Web push";

      res.send({
        text: {
          msg: "Web push subscribed",
          user: activeUsers[subscriptionIndex]
        },
        status: "200"
      });
    } else if (req.body.action === "unsubscribe") {
      subscriptionIndex = arrayObjectIndexOf(
        pushSubscriptions,
        req.body.subscription.endpoint,
        "endpoint"
      );

      if (subscriptionIndex >= 0) {
        pushSubscriptions.splice(subscriptionIndex, 1);
        activeUsers.splice(subscriptionIndex, 1);
        userList.splice(subscriptionIndex, 1);

        console.log(
          "Subscription unregistered: " + req.body.subscription.endpoint
        );
      } else {
        console.log(
          "Subscription was not found: " + req.body.subscription.endpoint
        );
      }

      console.log(activeUsers[subscriptionIndex] + " unsubscribed Web push");
      notificationData.notification.title = activeUsers[subscriptionIndex];
      notificationData.notification.body =
        activeUsers[subscriptionIndex] + " unsubscribed Web push";

      res.send({
        text: "Web push unsubscribed",
        status: "200"
      });
    } else {
      throw new Error("Unsupported action");
    }

    console.log("Number of active subscriptions: " + pushSubscriptions.length);

    /*     pushSubscriptions.forEach(function(item) {
      sendNotification(item, JSON.stringify(notificationData));
    }); */
  });
});

exports.message = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    console.log("Web message: ", req.body.msg.message);
    console.log("Web users: ", req.body.users);
    console.log("Number of active subscriptions: " + pushSubscriptions.length);
    var receivers = req.body.users;
    var msg = req.body.msg;
    var icon =
      msg.icon ||
      "https://firebasestorage.googleapis.com/v0/b/luncher-d3328.appspot.com/o/if_Food-Dome_379338.png?alt=media&token=7b941b3c-e70e-46f0-a3fb-2d0fc3b52d8d";
    var badge =
      msg.badge ||
      "https://firebasestorage.googleapis.com/v0/b/luncher-d3328.appspot.com/o/if_Food-Dome_379338.png?alt=media&token=7b941b3c-e70e-46f0-a3fb-2d0fc3b52d8d";
    var tag = msg.tag || "Luncher";
    //var data = msg.data || "https://luncher-d3328.firebaseapp.com/order";
    var notificationData = {};
    notificationData.notification = {
      title: msg.title,
      body: msg.message,
      dir: "auto",
      icon: icon,
      badge: badge,
      lang: "de",
      renotify: true,
      requireInteraction: true,
      tag: tag,
      vibrate: [300, 100, 400]
      //data: data
    };

    console.log("ABONNIERTE USER: " + receivers);
    if (receivers === "ALL") {
      // recivers = activeUsers;
      pushSubscriptions.forEach(function(item) {
        sendNotification(item, JSON.stringify(notificationData));
      });
    } else {
      console.log("PUSH FÜR USERS VOR FILTER: " + pushSubscriptions);
      console.log("ABONNIERTE USER: " + receivers);
      pushSubscriptions = pushSubscriptions.map(sub => {
        if (receivers.includes(sub.user.uid)) {
          return sub;
        }
      });
      console.log("PUSH FÜR USERS: " , pushSubscriptions);
      pushSubscriptions.forEach(function(item) {
        sendNotification(item, JSON.stringify(notificationData));
      });
    }
    /*     recivers.map(function(reciver) {
      // sendNotification(userList[reciver], JSON.stringify(notificationData));

      pushSubscriptions.forEach(function(item) {
        sendNotification(item, JSON.stringify(notificationData));
      });
    }); */
    res.send({
      text: "Web push send to " + receivers.length + " subscribers!",
      status: "200"
    });
  });
});

function sendNotification(pushSubscription, payload) {
  console.log("objekt TEST ", pushSubscription);
  if (pushSubscription) {
    console.log("wird gesendet: " + JSON.stringify(pushSubscription));
    webPush
      .sendNotification(pushSubscription.subscription, payload)
      .then(function(response) {
        console.log("Push sent");
        console.log(payload);
        console.log(response);
      })
      .catch(function(error) {
        console.log("Push error: ", error);
      });
  }
}
// Utility function to search the item in the array of objects
function arrayObjectIndexOf(myArray, searchTerm, property) {
  for (var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i][property] === searchTerm) return i;
  }
  return -1;
}

exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  res.send("hello " + original);
});
