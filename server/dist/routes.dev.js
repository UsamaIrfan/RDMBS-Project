"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELETE = exports.GET = void 0;
var GET = {
  GET_PRODUCTS: "/api/getproducts",
  PRODUCT_COUNT: "/api/getproductcount",
  CAT_PRODUCTS: "/api/getcatproducts",
  GET_PRODUCT: "/api/getproduct",
  GET_PRODUCT_TIMELINE: "/api/getProductsTimeline",
  SEARCH_PRODUCTS: "/api/searchProducts",
  GET_CATAGORY: "/api/getcatagory",
  GET_CATAGORIES: "/api/getcatagories",
  GET_SUBCATAGORIES: "/api/getsubcats",
  GET_SALES: "/api/getsales",
  GET_SALE: "/api/getsaleId",
  GET_SALES_TIMELINE: "/api/getSalesTimeline"
};
exports.GET = GET;
var DELETE = {
  DEL_CATAGORY: "/api/delcatagory",
  DEL_PRODUCT: "/api/delproduct"
};
exports.DELETE = DELETE;