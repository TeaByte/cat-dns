"use client";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useSubDomain } from "@/components/context/context";
import { useState } from "react";

export default function Form() {
  const { toast } = useToast();
  const { addSubdomain } = useSubDomain();
  const [subdomain, setSubdomain] = useState("");
  const [content, setContent] = useState("");
  const [record, setRecord] = useState("A");
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    const response = await fetch("/api/dns", {
      method: "POST",
      body: JSON.stringify({ subdomain, content, record }),
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
        addSubdomain({
          subdomain,
          content,
          record,
          id: data.result.id,
          ownerId: "",
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
    <form
      className="bg-secondary rounded-lg p-4 flex flex-col gap-2 items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center">
        <span className="bg-primary text-white rounded-s-lg p-1 px-3">
          http://
        </span>
        <input
          type="text"
          placeholder="subdomain"
          className="bg-primary p-1 text-background w-[30%]"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          required
        />
        <span className="bg-primary text-white rounded-r-lg p-1 px-3">
          .catdns.in
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="192.168.1"
            value={content}
            className="bg-primary p-2 text-background grow"
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Select required value={record} onValueChange={(e) => setRecord(e)}>
            <SelectTrigger className="bg-primary text-white">
              <SelectValue placeholder="Select a record" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Record</SelectLabel>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="AAAA">AAAA</SelectItem>
                <SelectItem value="CNAME">CNAME</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button disabled={disabled}>Add Record</Button>
      </div>
    </form>
  );
}
