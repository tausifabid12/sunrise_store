import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const ProductUpdateModal = ({
  showModal,
  setShowModal,
  modalData,
  refetch,
}) => {
  const [imageUrl, setImageUrl] = useState(''); // imageBB url
  const [loading, setLoading] = useState(false);
  const [updateData, setUpdateData] = useState(modalData); // fixing react not reRendering when props changes
  const [inputValues, setInputValues] = useState({
    Product_name: updateData.Product_name,
    description: updateData?.description,
    price: updateData?.price,
  });

  // fixing react not reRendering when props changes
  useEffect(() => {
    setUpdateData(modalData);
    setInputValues({
      Product_name: updateData.Product_name,
      description: updateData?.description,
      price: updateData?.price,
    });
  }, [modalData, updateData]);

  const handleUpdateData = (e) => {
    e.preventDefault();
    setLoading(true);
    //getting input values
    const price = e.target.price.value;
    const description = e.target.description.value;
    const Product_name = e.target.Product_name.value;
    const Image = e.target.Image.value;

    // uploading image to data base
    if (Image?.length) {
      const image = Image[0];
      const formData = new FormData();
      formData.append('image', image);
      const url = `https://api.imgbb.com/1/upload?key=${process.env.imageBB_api_key}`;
      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          const imgUrl = imgData?.data?.url;
          imgUrl ? setImageUrl(imgUrl) : setImageUrl('');
        });
    }

    // updating new data from mongoDb
    let newData;
    if (imageUrl) {
      newData = { price, description, Product_name, Image: imageUrl };
    } else {
      newData = { price, description, Product_name };
    }
    console.log(newData, updateData?._id);
    fetch(
      `https://sunrise-store-server.vercel.app/products/${updateData?._id}`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(newData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setLoading(false);
          toast.success('product data updated');
          refetch();
          setShowModal(false);
          e.target.reset();
        } else {
          setLoading(false);
          e.target.reset();
          toast.error('sorry data is not updated');
          console.log('error: ', data.message);
        }
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div>
      {showModal && modalData ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed backdrop-blur-sm inset-0 z-[99999] outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Update Product Info
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form
                  onSubmit={handleUpdateData}
                  className="relative p-6 flex-auto"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:min-w-[650px]">
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text">Product Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        name="Product_name"
                        onChange={handleInputChange}
                        value={inputValues?.Product_name}
                        className="input input-bordered w-full bg-transparent"
                      />
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text">price</span>
                      </label>
                      <input
                        value={inputValues?.price}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Type here"
                        name="price"
                        className="input input-bordered w-full bg-transparent"
                      />
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text">description</span>
                      </label>
                      <input
                        type="text"
                        value={inputValues?.description}
                        onChange={handleInputChange}
                        placeholder="Type here"
                        name="description"
                        className="input input-bordered w-full bg-transparent"
                      />
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Image</span>
                      </label>
                      <input
                        type="file"
                        name="Image"
                        className="file-input  w-full bg-transparent file-input-primary"
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className=" mt-7 flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      //   onClick={() => setShowModal(false)}
                    >
                      {loading ? 'Loading...' : 'Update Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default ProductUpdateModal;
