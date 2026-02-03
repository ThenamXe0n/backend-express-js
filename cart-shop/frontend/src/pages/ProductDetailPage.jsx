import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import CardLoader from "../components/ui/CardLoader";
import { fetchSingleProductByProductCodeAsync } from "../redux/productSlice";
import { BreadCrumbs } from "../components/ui/microUiComponent";
import { ShoppingBasket } from "lucide-react";
import { routePath } from "../routes/routePath";
import { Notify } from "notiflix";
import { addItemToCartAsync } from "../redux/cartSlice";

function ProductDetailPage() {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { selectedProduct, isLoading } = useSelector((s) => s.products);
  const params = useParams();
  console.log("selected", selectedProduct);
  console.log("location details ", location);
  const featuresHeading = Object.keys(selectedProduct?.features || {});

  const handleAddToCart = (item) => {
    if (isLoggedIn !== "cart-shop-logined") {
      navigate(routePath.LOGIN);
      Notify.info("login to add item in cart!");
    }

    let payload = { ...item, quantity: 1 };
    console.log("item", payload);
    dispatch(addItemToCartAsync(item));
    Notify.success(`item ${item?.name} added to cart!`);
  };

  useEffect(() => {
    dispatch(fetchSingleProductByProductCodeAsync(params.productCode));
  }, [dispatch, params.productCode, pathname]);

  return (
    <>
      {isLoading ? (
        <CardLoader />
      ) : (
        <div className="w-11/12 mx-auto">
          <BreadCrumbs path={pathname} />
          <section className="flex md:flex-row flex-col gap-5  ">
            <div className="md:h-[70vh] gap-2 grid grid-cols-4 grid-rows-4  h-[50vh] w-full md:w-1/2 mx-auto">
              <div className="grid-rows-4 grid gap-y-2  row-span-4 col-span-1">
                {selectedProduct?.images.map((img, idx) => (
                  <div key={idx} className="h-full w-full bg-black ">
                    <img
                      src={img}
                      alt="images"
                      className="object-cover h-full w-ful"
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-3 row-span-4 h-full w-full">
                <img
                  src={selectedProduct?.thumbnail}
                  className="h-full w-full"
                  alt="images"
                />
              </div>
            </div>
            <div className="flex-1 space-y-4 ">
              <h1 className="font-bold text-2xl capitalize">
                {selectedProduct?.name}
              </h1>
              <b className="text-xl font-thin text-neutral-700">
                ₹ {selectedProduct?.price}
              </b>
              <p className="text-neutral-700 text-sm font-medium">
                {selectedProduct?.description}
              </p>

              <hr className="border-2 broder-black/40"></hr>
              <button
                onClick={() => handleAddToCart(selectedProduct)}
                className="w-full flex items-center gap-3 justify-center active:bg-indigo-950 active:scale-95 active:shadow-2xl active:shadow-indigo-400 duration-200 cursor-pointer p-3 text-center bg-indigo-800 text-white rounded-md"
              >
                <ShoppingBasket /> Add To Cart
              </button>

              <table className="border-collapse">
                <thead>
                  <tr>
                    {featuresHeading.map((heading, idx) => (
                      <th className="border-2 border-black p-3" key={idx}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {featuresHeading?.map((heading, idx) => (
                      <td className="border-2 border-black p-3" key={idx}>
                        {selectedProduct?.features[heading]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default ProductDetailPage;
