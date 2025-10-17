"use server";

import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0));
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addToCart(data: CartItem) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    console.log("sessionCartId ", sessionCartId);
    if (!sessionCartId) {
      throw new Error("Cart session not found");
    }

    const session = await auth();

    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await getMyCart();
    const item = cartItemSchema.parse(data);

    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (!cart) {
      // create new cart
      const newCart = insertCartSchema.parse({
        userId,
        items: [item],
        sessionCartId,
        ...calcPrice([item]),
      });

      console.log("newCart ", newCart);
      await prisma.cart.create({
        data: newCart,
      });

      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } else {
      const existItem = (cart.items as CartItem[]).find((i) => i.productId === item.productId);
      if (existItem) {
        //check stock
        if (product.stock < existItem.qty + 1) {
          throw new Error("Not enough Stock");
        }

        //increase the qty
        (cart.items as CartItem[]).find((i) => i.productId === item.productId)!.qty = existItem.qty + 1;
      } else {
        // if item not exist in the cart
        if (product.stock < 1) {
          throw new Error("Not enough Stock");
        }
        cart.items.push(item);
      }
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);
      return {
        success: true,
        message: `${product.name} ${existItem ? "updated in" : "added to"} cart`,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getMyCart() {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("Cart session not found");
    }

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
    const cart = await prisma.cart.findFirst({
      where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
    });

    if (!cart) return undefined;

    return convertToPlainObject({
      ...cart,
      items: cart.items as CartItem[],
      itemPrice: cart.itemPrice.toString(),
      totalPrice: cart.totalPrice.toString(),
      shippingPrice: cart.shippingPrice.toString(),
      taxPrice: cart.taxPrice.toString(),
    });
  } catch (err) {}
}

export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
      throw new Error("Cart session not found");
    }

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const cart = await getMyCart();
    if (!cart) {
      throw new Error("Cart not found");
    }

    const existItem = (cart.items as CartItem[]).find((i) => i.productId === productId);
    if (!existItem) {
      throw new Error("Item not found");
    }

    if (existItem.qty === 1) {
      cart.items = (cart.items as CartItem[]).filter((i) => i.productId !== existItem.productId);
    } else {
      (cart.items as CartItem[]).find((i) => i.productId === productId)!.qty = existItem.qty - 1;
    }

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath("/product/" + product.slug);

    return {
      success: true,
      message: "Cart cleared",
    };
  } catch (err) {
    return {
      success: false,
      message: formatError(err),
    };
  }
}
