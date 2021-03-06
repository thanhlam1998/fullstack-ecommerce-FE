import axios from "axios";

export const userCart = async (cart, authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });
};

export const emptyUserCart = async (authtoken) => {
  return axios.put(
    `${process.env.REACT_APP_API}/user/cart`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const saveUserAddress = async (address, authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const applyCoupon = async (coupon, authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createOrder = async (stripeResponse, authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserOrders = async (authtoken) => {
  return axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });
};

export const getWishList = async (authtoken) => {
  return axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });
};

export const removeWishList = async (productId, authtoken) => {
  return axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addToWishList = async (productId, authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    {
      productId,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCashOrderForUser = async (coupon, authtoken) => {
  return axios.post(
    `${process.env.REACT_APP_API}/user/cash/order`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
};
