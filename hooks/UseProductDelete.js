import { toast } from 'react-hot-toast';

const UseProductDelete = (id, refetch) => {
  fetch(`http://localhost:5000/products/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.status) {
        console.log(data);
        toast.error('Product Deleted');
        refetch();
      } else {
        console.log('error: ', data.message);
      }
    });
};

export default UseProductDelete;
