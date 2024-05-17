const { GoogleAuthProvider, signInWithPopup } = require("firebase/auth");
const {auth} = require("./firebase");

export const signInWithGoogle = async function () {
	const provider = new GoogleAuthProvider();
	await signInWithPopup(auth, provider).then().catch((error)=>console.log(error))
};
