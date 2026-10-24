"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DestinationActionsProps = {
  id: string;
  name?: string;
  className?: string;
};

const DestinationActions = ({ id, name, className }: DestinationActionsProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    if (deleting) return;
    if (next) setError(null);
    setOpen(next);
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);

    const res = await fetch(`http://localhost:8000/destination/${id}`, {
      method: "DELETE",
    }).catch(() => null);

    if (res?.ok) {
      router.push("/destinations");
      router.refresh();
      return;
    }

    if (!res) {
      setError("Couldn't reach the server at localhost:8000.");
    } else if (res.status === 404) {
      setError(
        "Delete route not found (404). Add DELETE /destination/:id to the backend."
      );
    } else {
      setError(`Delete failed (HTTP ${res.status}).`);
    }

    setDeleting(false);
  };

  return (
    <div className={className}>
      <Link
        href={`/destinations/${id}/edit`}
        className={buttonVariants({ variant: "outline", className: "gap-2" })}
      >
        <Pencil />
        Edit
      </Link>

      <Button
        variant="destructive"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <Trash2 />
        Delete
      </Button>

      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this destination?</AlertDialogTitle>
            <AlertDialogDescription>
              {name
                ? `“${name}” will be permanently removed. This action cannot be undone.`
                : "This destination will be permanently removed. This action cannot be undone."}
            </AlertDialogDescription>
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DestinationActions;
