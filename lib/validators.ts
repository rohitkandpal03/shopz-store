import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

const currency = z
  .string()
  .refine((value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))), { error: "Price must have two decimal place" });
//Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 char"),
  slug: z.string().min(3, "Slug must be at least 3 char"),
  category: z.string().min(3, "Category must be at least 3 char"),
  description: z.string().min(3, "Description must be at least 3 char"),
  brand: z.string().min(3, "Brand must be at least 3 char"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

//Schema for signing user in
export const signInFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//Schema for signing up user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 char"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(3, "Name must be at least 3 char"),
  slug: z.string().min(3, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a non-negative integer"),
  image: z.string().min(1, "Image URL is required"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema).min(1, "Cart must have at least one item"),
  // totalItems: z.number().int().nonnegative("Total items must be a non-negative integer"),
  itemPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session Cart ID is required"),
  userId: z.string().optional().nullable(),
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 char"),
  streetAddress: z.string().min(3, "Address must be at least 3 char"),
  city: z.string().min(2, "City must be at least 2 char"),
  postalCode: z.string().min(2, "Postal Code must be at least 2 char"),
  country: z.string().min(2, "Country must be at least 2 char"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment Method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    error: "Invalid payment method",
  });

export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    error: "Invalid payment Method",
  }),
  shippingAddress: shippingAddressSchema,
});

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});
