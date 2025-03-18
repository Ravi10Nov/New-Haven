import { getAuth } from 'firebase/auth';
// import toast from 'react-hot-toast';
import firebaseInIt from '../firebase/firebase.init.js';
firebaseInIt();
const auth = getAuth();

const useFirebase = () => {
  // const [user, setUser] = useState({});
  // const [loading, setLoading] = useState(true);
  // // joining a new user from home page or login page
  // function newUserRegister(email, password) {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(result => {
  //       signOut(auth)
  //         .then(() => {
  //           setUser({});
  //         })
  //         .catch(err => {});
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  // // login functionality
  // function userLogin(email, pass, history) {
  //   setLoading(true);
  //   signInWithEmailAndPassword(auth, email, pass)
  //     .then(result => {
  //       toast.success('Successfully Logged in!!');
  //       setUser(result.user);
  //       history.replace('/userdashboard');
  //     })
  //     .catch(err => {
  //       toast.error(`${err.message}`);
  //     })
  //     .finally(() => setLoading(false));
  // }
  // // Get the currently signed-in user
  // useEffect(() => {
  //   const unsubscribed = onAuthStateChanged(auth, user => {
  //     if (user) {
  //       setUser(user);
  //     } else {
  //       setUser({});
  //     }
  //     setLoading(false);
  //   });
  //   return () => unsubscribed;
  // }, []);
  // // logout
  // function logout() {
  //   setLoading(true);
  //   signOut(auth)
  //     .then(() => {
  //       toast.success('Successfully Logged out!');
  //       setUser({});
  //     })
  //     .catch(err => {
  //       toast.error(`${err.message}`);
  //     })
  //     .finally(() => setLoading(false));
  // }
  // //register
  // function UserRegister(name, password, email, history, prePass) {
  //   setLoading(true);
  //   signInWithEmailAndPassword(auth, email, prePass).then(result => {
  //     const user = auth.currentUser;
  //     updatePassword(user, password)
  //       .then(() => {
  //         updateProfile(auth.currentUser, {
  //           displayName: name,
  //         })
  //           .then(() => {
  //             setUser({ email, displayName: name });
  //             history.replace('/userdashboard');
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   });
  // }
  // // update password
  // function pdwUpdate(email, prePass, password, history) {
  //   setLoading(true);
  //   signInWithEmailAndPassword(auth, email, prePass).then(result => {
  //     const user = auth.currentUser;
  //     updatePassword(user, password)
  //       .then(() => {
  //         history.replace('/userdashboard');
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   });
  // }
  // return {
  //   pdwUpdate,
  //   UserRegister,
  //   ...user,
  //   loading,
  //   userLogin,
  //   logout,
  //   setLoading,
  //   newUserRegister,
  // };
  return 0;
};

export default useFirebase;
