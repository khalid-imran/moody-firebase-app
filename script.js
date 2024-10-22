/* === Imports === */
import {initializeApp} from "firebase/app"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile
} from "firebase/auth"
/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyABgV4CjFtBgBKCruBX7zawmD8dUE5jwsg",
    authDomain: "moody-487e4.firebaseapp.com",
    projectId: "moody-487e4",
    storageBucket: "moody-487e4.appspot.com",
    messagingSenderId: "634960636092",
    appId: "1:634960636092:web:ccdaac16833f6eda4f08b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")
const signOutButtonEl = document.getElementById("sign-out-btn")

const errorMsgEl = document.getElementById("error-message")

const userProfilePictureEl = document.getElementById("user-profile-picture")
const userProfileGreetEl = document.getElementById("user-greeting")

const displayNameInputEl = document.getElementById("display-name-input")
const photoURLInputEl = document.getElementById("photo-url-input")
const updateProfileButtonEl = document.getElementById("update-profile-btn")

const userHasNoNameEl = document.getElementById("user-has-no-name")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
signOutButtonEl.addEventListener("click", authSignOut)

updateProfileButtonEl.addEventListener("click", authUpdateProfile)



/* === Main Code === */


/* === Functions === */

/* = Functions - Firebase - Authentication = */
onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
        showProfilePicture(userProfilePictureEl, user)
        showUserGreeting(userProfileGreetEl, user)
    } else {
        showLoggedOutView()
    }
});

function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toggleErrorMsg(errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

function authSignInWithEmail() {
    toggleErrorMsg()
    let email = emailInputEl.value;
    let password = passwordInputEl.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            showLoggedInView()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toggleErrorMsg(errorMessage)
        });

}

function authCreateAccountWithEmail() {
    toggleErrorMsg()
    let email = emailInputEl.value;
    let password = passwordInputEl.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            showLoggedInView()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toggleErrorMsg(errorMessage)
            // ..
        });
}

function authSignOut() {
    signOut(auth).then(() => {
        showLoggedOutView()
    }).catch((error) => {
        // An error happened.
    });
}

function showProfilePicture(imgElement, user) {
    const photoURL = user.photoURL

    if (photoURL) {
        imgElement.src = photoURL
    } else {
        imgElement.src = "https://img.icons8.com/?size=60&id=0lg0kb05hrOz&format=png"
    }
}
function showUserGreeting(element, user) {
    const displayName = user.displayName;
    if (displayName) {
        const userFirstName = displayName.split(" ")[0]
        element.textContent = `Hey ${userFirstName}, how are you?`
    } else {
        userHasNoNameEl.style.display = 'block'
        element.textContent = `Hey friend, how are you?`
    }
}

function authUpdateProfile() {
    let displayName = displayNameInputEl.value;
    let photoURL = photoURLInputEl.value;
    updateProfile(auth.currentUser, {
        displayName: displayName, photoURL: photoURL
    }).then(() => {
        location.reload()
    }).catch((error) => {
        // An error occurred
        // ...
    });
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideElement(viewLoggedIn)
    showElement(viewLoggedOut)
}

function showLoggedInView() {
    hideElement(viewLoggedOut)
    showElement(viewLoggedIn)
}

function toggleErrorMsg(message = null) {
    if (message) {
        errorMsgEl.innerText = message;
    } else {
        errorMsgEl.innerText = '';
    }
}

function showElement(element) {
    element.style.display = "flex"
}

function hideElement(element) {
    element.style.display = "none"
}