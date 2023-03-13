import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const UseToken = (email) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    if (email) {
      fetch(`https://sunrise-store-server.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            Cookies.set('sunriseToken', data.accessToken);
            setToken(data.accessToken);
            console.log(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};

export default UseToken;
