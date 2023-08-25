"use client";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useState } from "react";

interface UpdateFormProps {
  subdomainData: string;
  recordData?: string;
  contentData: string;
  id: string;
}

export default function UpdateForm({
  subdomainData,
  recordData,
  contentData,
  id,
}: UpdateFormProps) {
  const { toast } = useToast();
  const [content, setContent] = useState(contentData);
  const [record, setRecord] = useState(recordData);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    const response = await fetch("/api/dns", {
      method: "PUT",
      body: JSON.stringify({ subdomain: subdomainData, content, record, id }),
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
    <form
      className="bg-secondary rounded-lg p-4 flex flex-col gap-2 items-center"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 py-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Content
          </Label>
          <Input
            id="name"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="col-span-3 bg-primary text-white"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="text-right">Record</Label>
          <div className="w-full">
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
        </div>
      </div>
      <Button type="submit" disabled={disabled}>
        Save changes
      </Button>
    </form>
  );
}
