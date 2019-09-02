// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// Request Browser notification permission
const allowBrowserNotification = () => {
    alert('success!!!')
    messaging.requestPermission()
    .then(function() {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
    })
    .catch(function(err) {
    console.log('Unable to get permission to notify.', err);
    });
    };

// Request token
const getToken = () => {
    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken()
    .then(function(currentToken) {
    if (currentToken) {
    prompt('Your Token', currentToken);
    } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    }
    })
    .catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    });
    };

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
    messaging.getToken()
    .then(function(refreshedToken) {
    console.log('Token refreshed.');
    prompt('Your Token', refreshedToken);
    })
    .catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    });
    });

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a sevice worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
    console.log("Message received. ", payload);
    // ...
  });
