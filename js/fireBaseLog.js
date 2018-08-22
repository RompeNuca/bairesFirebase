  // Initialize Firebase
  
  var config = {
    apiKey: "AIzaSyDhkTT8JegV-ZThdjIJ_MABJM1gwkDR9ds",
    authDomain: "bairesprint-c020d.firebaseapp.com",
    databaseURL: "https://bairesprint-c020d.firebaseio.com",
    projectId: "bairesprint-c020d",
    storageBucket: "bairesprint-c020d.appspot.com",
    messagingSenderId: "695695201889"
  };
  firebase.initializeApp(config);

  var db = firebase.database();
  var ref = db.ref('/');
  var trabajosRef = db.ref('/trabajos');
  