import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const AddNewModal = ({
  showAddProductModal,
  setShowAddProductModal,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handleAddData = (data) => {
    const image = data.Image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.imageBB_api_key}`;
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log(imgData);
        const imgUrl = imgData?.data?.url;
        if (imgUrl) {
          const newProduct = { ...data, Image: imgUrl };
          fetch(`https://sunrise-store-server.vercel.app/products`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify(newProduct),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              toast.success('product Added');
              refetch();
            });
        }
      });

    // let updateData;
    // console.log({ ...data, Image: imageUrl });

    // if (imageUrl) {
    //   updateData = { ...data, Image: imageUrl };
    // } else {
    //   updateData = { price, description, Product_name };
    // }
  };
  return (
    <div>
      {showAddProductModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed backdrop-blur-sm inset-0 z-[99999] outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowAddProductModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form
                  onSubmit={handleSubmit(handleAddData)}
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
                        {...register('Product_name', { required: true })}
                        className="input input-bordered w-full bg-transparent"
                      />
                      {errors.Product_name && (
                        <span className="text-sm text-red-600 font-bold">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text">price</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        {...register('price', { required: true })}
                        className="input input-bordered w-full bg-transparent"
                      />
                      {errors.price && (
                        <span className="text-sm text-red-600 font-bold">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        <span className="label-text">description</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        {...register('description', { required: true })}
                        className="input input-bordered w-full bg-transparent"
                      />
                      {errors.description && (
                        <span className="text-sm text-red-600 font-bold">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Image</span>
                      </label>
                      <input
                        type="file"
                        {...register('Image', { required: true })}
                        className="file-input  w-full bg-transparent file-input-primary"
                      />
                      {errors.Image && (
                        <span className="text-sm text-red-600 font-bold">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  {/*footer*/}
                  <div className=" mt-7 flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowAddProductModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      //   onClick={() => setshowAddProductModal(false)}
                    >
                      Update Changes
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

export default AddNewModal;
