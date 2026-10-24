"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Destination } from "@/data/destinations";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Wildlife",
];

const labelClass = "text-xs font-semibold text-zinc-800";

const fieldClass =
  "h-10! rounded-md! border! border-zinc-200! bg-slate-50! px-3! text-sm! text-zinc-800 placeholder:text-zinc-400! focus-visible:border-[#1d9fc2]! focus-visible:ring-2! focus-visible:ring-[#1d9fc2]/20!";

type EditFormProps = {
  destination: Destination;
};

const EditDestinationForm = ({ destination }: EditFormProps) => {
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(
    destination.category ?? null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const body = JSON.stringify({ ...data, category });

    const res = await fetch(
      `http://localhost:8000/destination/${destination._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      }
    ).catch(() => null);

    if (res?.ok) {
      router.push(`/destinations/${destination._id}`);
      router.refresh();
      return;
    }

    if (!res) {
      setError("Couldn't reach the server at localhost:8000.");
    } else if (res.status === 404) {
      setError("Update route not found (404). Add PUT /destination/:id to the backend.");
    } else {
      setError(`Save failed (HTTP ${res.status}).`);
    }

    setSaving(false);
  };

  return (
    <div className="mx-auto w-full px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[560px]">
        <Link
          href={`/destinations/${destination._id}`}
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="size-3.5" />
          Back to destination
        </Link>

        <div className="mt-4 mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1d9fc2]">
            Travel Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Edit Travel Package
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Update the details of “{destination.name}”.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7"
        >
          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className={labelClass}>
              Destination Name
            </Label>

            <Input
              id="name"
              name="name"
              defaultValue={destination.name}
              required
              className={fieldClass}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="country" className={labelClass}>
                Country
              </Label>

              <Input
                id="country"
                name="country"
                defaultValue={destination.country}
                required
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="category" className={labelClass}>
                Category
              </Label>

              <Select
                value={category ?? ""}
                onValueChange={setCategory}
              >
                <SelectTrigger id="category" className={fieldClass}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="price" className={labelClass}>
                Price (USD)
              </Label>

              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                defaultValue={destination.price}
                required
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="duration" className={labelClass}>
                Duration
              </Label>

              <Input
                id="duration"
                name="duration"
                defaultValue={destination.duration}
                required
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="departureDate" className={labelClass}>
              Departure Date
            </Label>

            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              defaultValue={destination.departureDate}
              required
              className={fieldClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="imageUrl" className={labelClass}>
              Image URL
            </Label>

            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              defaultValue={destination.imageUrl}
              className={fieldClass}
            />

            <p className="text-xs text-zinc-400">
              Add a direct link to your destination image.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className={labelClass}>
              Description
            </Label>

            <Textarea
              id="description"
              name="description"
              defaultValue={destination.description}
              className="min-h-28! rounded-md! border! border-zinc-200! bg-slate-50! px-3! py-3! text-sm! text-zinc-800 placeholder:text-zinc-400! focus-visible:border-[#1d9fc2]! focus-visible:ring-2! focus-visible:ring-[#1d9fc2]/20!"
            />
          </div>

          <div className="mt-2 flex flex-col-reverse gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              className="h-10 rounded-md border-zinc-200 px-4 text-sm text-zinc-600 transition-colors hover:bg-zinc-50"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={saving}
              className="h-10 gap-2 rounded-md bg-[#1d9fc2] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1789a8]"
            >
              <Save data-icon="inline-start" />
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDestinationForm;
