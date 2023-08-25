"use client";

import { Button } from "../ui/button";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface DeleteBtnProps {
  subdomain: string;
  id: string;
}

export default function DeleteBtn({ subdomain, id }: DeleteBtnProps) {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(false);
  const onClick = async () => {
    setDisabled(true);
    const response = await fetch("/api/dns", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    try {
      const data = await response.json();
      if (data.errors.length > 0) {
        toast({
          title: `Error ${data.errors[0].code}`,
          description: `${data.errors[0].message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Your request was successful.",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setDisabled(false);
    }
  };
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className="w-full bg-destructive text-white hover:bg-destructive hover:opacity-80"
    >
      Delete ( {subdomain} )
    </Button>
  );
}
