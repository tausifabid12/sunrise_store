const { useRouter } = require('next/router');
const { useState, useEffect } = require('react');

const UseActiveLink = (href) => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.asPath === href) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [router.asPath, href, isActive]);

  return [isActive];
};

export default UseActiveLink;
