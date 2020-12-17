import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from 'aws-amplify';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const currentUser = await Auth.signIn(username, password);
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);

        const authTime = user.signInUserSession.idToken.payload.auth_time;

        const currentTime = (new Date().getTime() / 1000).toFixed();

        if (authTime + 300 < parseInt(currentTime)) {
          Auth.signOut({ global: true });
          localStorage.clear();
          setUser(null);
          router.push('/logout');
        }

        console.log({
          user,
          authTime,
          currentTime,
          expired: authTime + 300 < parseInt(currentTime),
        });
      })
      .catch((err) => {
        setUser(null);
      });
  }, []);

  return (
    <div>
      {user && <h1>Current logged in user: {user.username}</h1>}

      {!user && (
        <form onSubmit={signIn}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
