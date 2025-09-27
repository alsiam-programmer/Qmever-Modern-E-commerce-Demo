import { createSlice } from '@reduxjs/toolkit';
import CryptoJS from "crypto-js";

// ===========================
// 1. Strong hardcoded secret key
// ===========================
const SECRET_KEY = "S3curee322R@nd0mK3y12ForeeL0calSt0rage123!"; // 32+ chars

// ===========================
// 2. Helper functions
// ===========================
const saveEncrypted = (key, data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  localStorage.setItem(key, ciphertext);
};

const getDecrypted = (key) => {
  const ciphertext = localStorage.getItem(key);
  if (!ciphertext) return [];
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return [];
  }
};

// ===========================
// 3. Initial state
// ===========================
const initialState = {
  user: getDecrypted("user"),
  BuyItem: getDecrypted("BuyItem"),
  cartItem: getDecrypted("cartItem"),
};

// ===========================
// 4. Redux slice
// ===========================
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    userUidLogin: (state, action) => {
      state.user = [action.payload];
      saveEncrypted("user", state.user);
    },
    userLogout: (state) => {
      state.user = [];
      saveEncrypted("user", state.user);
    },
    userBuyItem: (state, action) => {
      state.BuyItem = [action.payload];
      saveEncrypted("BuyItem", state.BuyItem);
    },
    BuyItemDelete: (state, action) => {
      state.BuyItem.splice(action.payload, 1);
      saveEncrypted("BuyItem", state.BuyItem);
    },
    AddToCart: (state, action) => {
      const index = state.cartItem.findIndex(
        item =>
          item.ProdectId === action.payload.ProdectId &&
          item.size === action.payload.size &&
          item.modleColor?.Color === action.payload.modleColor?.Color
      );
      if (index !== -1) state.cartItem[index].ProdectQun += 1;
      else state.cartItem.push(action.payload);
      saveEncrypted("cartItem", state.cartItem);
    },
    removeCartPro: (state, action) => {
      state.cartItem.splice(action.payload, 1);
      saveEncrypted("cartItem", state.cartItem);
    },
    qunIncrement: (state, action) => {
      state.cartItem[action.payload].ProdectQun += 1;
      saveEncrypted("cartItem", state.cartItem);
    },
    qunDecrement: (state, action) => {
      if (state.cartItem[action.payload].ProdectQun > 1) {
        state.cartItem[action.payload].ProdectQun -= 1;
        saveEncrypted("cartItem", state.cartItem);
      }
    },
    removeAllcartPro: (state) => {
      state.cartItem = [];
      saveEncrypted("cartItem", state.cartItem);
    },
  },
});

// ===========================
// 5. Export actions & reducer
// ===========================
export const {
  userUidLogin,
  userLogout,
  userBuyItem,
  BuyItemDelete,
  AddToCart,
  removeCartPro,
  qunIncrement,
  qunDecrement,
  removeAllcartPro
} = counterSlice.actions;

export default counterSlice.reducer;
