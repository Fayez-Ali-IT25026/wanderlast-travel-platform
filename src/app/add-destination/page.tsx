"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Save, Trash2 } from "lucide-react";
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

const AddPackageForm = () => {
  const [category, setCategory] = useState<string | null>(null);

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    );




const response = await fetch("http://localhost:8000/add-destination",{
    // method ='post'
    method :'post',
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(data),
     body: JSON.stringify(data),
    
   });


  console.log('response from server',response)





    // TODO: send `data` to your API
    console.log({ ...data, category });
  };

  return (
    <div className="mx-auto w-full px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[560px]">
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1d9fc2]">
            Travel Management
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            Add New Travel Package
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Create a new destination package and share your next travel
            experience.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          onReset={() => setCategory(null)}
          className="flex w-full flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className={labelClass}>
              Destination Name
            </Label>

            <Input
              id="name"
              name="name"
              placeholder="Bali Paradise"
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
                placeholder="Indonesia"
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
                required
              >
                <SelectTrigger
                  id="category"
                  className={fieldClass}
                >
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
                placeholder="e.g., 1299"
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
                placeholder="e.g., 7 Days/6 Nights"
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
              placeholder="https://example.com/image.jpg"
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
              placeholder="Describe the travel experience..."
              className="min-h-28! rounded-md! border! border-zinc-200! bg-slate-50! px-3! py-3! text-sm! text-zinc-800 placeholder:text-zinc-400! focus-visible:border-[#1d9fc2]! focus-visible:ring-2! focus-visible:ring-[#1d9fc2]/20!"
            />
          </div>

          <div className="mt-2 flex flex-col-reverse gap-3 border-t border-zinc-100 pt-5 sm:flex-row sm:justify-end">
            <Button
              type="reset"
              variant="outline"
              className="h-10 rounded-md border-zinc-200 px-4 text-sm text-zinc-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 data-icon="inline-start" />
              Cancel
            </Button>

            <Button
              type="submit"
              className="h-10 rounded-md bg-[#1d9fc2] px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1789a8]"
            >
              <Save data-icon="inline-start" />
              Add Travel Package
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackageForm;