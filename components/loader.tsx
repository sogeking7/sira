import { Loader } from "lucide-react";

export const MyLoader = () => {
  return (
    <div className="flex w-full justify-center">
      <Loader className="animate-spin text-2xl text-primary" />
    </div>
  );
};
