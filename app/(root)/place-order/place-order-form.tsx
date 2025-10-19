"use client";

import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order.actions";
import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useFormStatus } from "react-dom";

const PlaceOrderForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await createOrder();
    console.log("res ", res);
    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button variant={"outline"} disabled={pending} className="w-full">
        {pending ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 " />}
        {" Place Order"}
      </Button>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;
