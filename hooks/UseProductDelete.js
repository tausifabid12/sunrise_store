import { toast } from 'react-hot-toast';

const UseProductDelete = (id, refetch) => {
  fetch(`https://sunrise-store-server.vercel.app/products/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status) {
        toast.error('Product Deleted');
        refetch();
      } else {
        console.log('error: ', data.message);
      }
    });
};

export default UseProductDelete;
