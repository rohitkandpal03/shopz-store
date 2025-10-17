"use client";

import { Button } from "@/components/ui/button";
import { Cart, CartItem } from "@/types";
import { addToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Minus, Plus, Loader } from "lucide-react";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addToCart(item);
      if (res.success) {
        toast({
          description: res.message,
          action: (
            <ToastAction className="bg-primary text-white hover:bg-gray-800" altText="Go to cart" onClick={() => router.push("/cart")}>
              View Cart
            </ToastAction>
          ),
        });
      } else {
        toast({
          description: res.message,
          variant: "destructive",
        });
      }
    });
  };

  const existItem = cart?.items.find((cartItem) => cartItem.productId === item.productId);

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast({
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });
      return;
    });
  };

  return existItem ? (
    <div>
      <Button variant={"outline"} type="button" onClick={handleRemoveFromCart}>
        {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Minus className="h-4 w-4" />}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button variant={"outline"} type="button" onClick={handleAddToCart}>
        {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="h-4 w-4" />}
      </Button>
    </div>
  ) : (
    <Button className="w-full " type="button" onClick={handleAddToCart}>
      {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Plus className="h-4 w-4" />}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
