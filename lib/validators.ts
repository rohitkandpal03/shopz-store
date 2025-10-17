import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine((value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))), "Price must have two decimal place");
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
    message: "Passwords don't match",
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
