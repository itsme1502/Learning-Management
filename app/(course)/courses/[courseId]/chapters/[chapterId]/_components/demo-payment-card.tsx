import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";

const PaymentCard = () => {
  return (
    <div className="flex justify-end p-4">
      <Card className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-900 p-4 flex flex-row gap-2 items-center">
          <CardTitle className="text-white text-lg font-semibold">
            <Info/>
          </CardTitle>
          <CardDescription className="text-white">
            Use the following card details for test payments
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-4">
            <p className="text-gray-700 text-md">
              <strong>Card Number:</strong> 4242 4242 4242 4242
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 text-md">
              <strong>Expiry Date:</strong> 12/34
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 text-md">
              <strong>CVC:</strong> 123
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 text-md">
              <strong>ZIP:</strong> 12345
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCard;
