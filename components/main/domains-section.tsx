import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DeleteBtn from "./delete-button";
import { Button } from "../ui/button";
import UpdateForm from "./update-section";

interface SubDomainProps {
  subdomain: string;
  record: string;
  content: string;
  id: string;
}

export default function SubDomain({
  subdomain,
  record,
  content,
  id,
}: SubDomainProps) {
  return (
    <>
      <div className="flex flex-col gap-2 items-center md:w-1/3">
        <span className="w-full text-center border-primary border-2 bg-background text-primary p-2 px-4 rounded-md">
          http://{subdomain}.catdns.in
        </span>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full bg-primary hover:bg-primary hover:opacity-80 hover:text-white text-white"
            >
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editing ( {subdomain} )</DialogTitle>
              <DialogDescription>
                Make changes to put the data in the right place. Click save when
                youre done.
              </DialogDescription>
            </DialogHeader>
            <UpdateForm
              subdomainData={subdomain}
              contentData={content}
              recordData={record}
              id={id}
            />
          </DialogContent>
        </Dialog>
        <DeleteBtn subdomain={subdomain} id={id} />
      </div>
    </>
  );
}
