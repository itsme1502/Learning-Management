"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentWindow, setPaymentWindow] = useState<Window | null>(null);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      const newWindow = window.open(
        response.data.url,
        "_blank",
        "location=yes,height=570,width=520,scrollbars=yes,status=yes"
      );
      setPaymentWindow(newWindow);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Polling interval
    const checkWindowClosed = setInterval(() => {
      if (paymentWindow && paymentWindow.closed) {
        clearInterval(checkWindowClosed);
        window.location.reload();
      }
    }, 1000);

    return () => {
      clearInterval(checkWindowClosed);
    };
  }, [paymentWindow]);

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};
