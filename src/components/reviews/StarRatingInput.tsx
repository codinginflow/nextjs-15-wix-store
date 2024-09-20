import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function StarRatingInput({
  value,
  onChange,
}: StarRatingInputProps) {
  const ratingsText = ["Terrible", "Bad", "Okay", "Good", "Great"];

  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <button key={i} onClick={() => onChange(i + 1)} type="button">
          <StarIcon
            className={cn("size-7 text-primary", i < value && "fill-primary")}
          />
        </button>
      ))}
      <span>{ratingsText[value - 1]}</span>
    </div>
  );
}
