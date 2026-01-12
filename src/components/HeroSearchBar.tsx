import React, { useMemo, useState } from "react";
import { Search, X, ChevronsUpDown, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { bodyTypes } from "@/data/inventory";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface HeroSearchBarProps {
  onSearch?: () => void;
}

type Option = { label: string; value: string };

// --- Options ---
const TRANSMISSION_OPTIONS: Option[] = [
  { label: "Automatic", value: "automatic" },
  { label: "Manual", value: "manual" },
  { label: "Other", value: "other" },
];

const FUEL_OPTIONS: Option[] = [
  { label: "Gas", value: "gas" },
  { label: "Diesel", value: "diesel" },
  { label: "Hybrid", value: "hybrid" },
  { label: "PHEV", value: "phev" },
  { label: "Electric", value: "electric" },
];

const DRIVETRAIN_OPTIONS: Option[] = [
  { label: "FWD", value: "fwd" },
  { label: "RWD", value: "rwd" },
  { label: "AWD", value: "awd" },
  { label: "4x4", value: "4x4" },
];

const COLOR_OPTIONS: Option[] = [
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Silver", value: "silver" },
  { label: "Gray", value: "gray" },
  { label: "Blue", value: "blue" },
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Orange", value: "orange" },
];

const colorDotClass = (v: string) => {
  switch (v) {
    case "black":
      return "bg-black";
    case "white":
      return "bg-white border border-black/15";
    case "silver":
      return "bg-zinc-300";
    case "gray":
      return "bg-zinc-500";
    case "blue":
      return "bg-blue-600";
    case "red":
      return "bg-red-600";
    case "green":
      return "bg-green-600";
    case "orange":
      return "bg-orange-500";
    default:
      return "bg-zinc-200";
  }
};

// ✅ General background stays black + text white
// ✅ Inputs/filters are white background + black text
const whiteField =
  "bg-white text-black border border-black/15 hover:bg-white focus-visible:ring-2 focus-visible:ring-black/30";

// ✅ CTA (red) effect (matches your earlier “applied filters” look)
const ctaText = "text-primary";
const ctaBorder = "border-primary/45";
const ctaBg = "bg-primary/15"; // faded red so text is readable
const ctaHoverBg = "hover:bg-primary/20";

// ---------------- Components ----------------

function MultiSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
  renderLeft,
  align = "start",
}: {
  label: string;
  placeholder: string;
  options: Option[];
  value: string[];
  onChange: (next: string[]) => void;
  renderLeft?: (opt: Option) => React.ReactNode;
  align?: "start" | "center" | "end";
}) {
  const [open, setOpen] = useState(false);

  const selectedLabels = useMemo(() => {
    const map = new Map(options.map((o) => [o.value, o.label]));
    return value.map((v) => map.get(v)).filter(Boolean) as string[];
  }, [options, value]);

  const buttonText =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.length <= 2
      ? selectedLabels.join(", ")
      : `${selectedLabels.length} selected`;

  const toggle = (v: string) => {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange(next);
  };

  const clearAll = () => onChange([]);

  return (
    <div className="space-y-1.5">
      <div className="text-xs font-medium text-white/80">{label}</div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-between rounded-xl transition-colors",
              whiteField,
              // subtle red “cta” border highlight like your design (but still white box)
              "border-primary/30 hover:border-primary/45"
            )}
          >
            <span className={cn("truncate text-left", selectedLabels.length === 0 && "text-black/50")}>
              {buttonText}
            </span>
            <ChevronsUpDown className="h-4 w-4 opacity-70 text-black" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align={align} side="bottom" sideOffset={8}>
          <Command>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border/50">
              <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
              {value.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground"
                  onClick={clearAll}
                >
                  Clear
                </Button>
              )}
            </div>

            <CommandEmpty>No results.</CommandEmpty>

            <CommandGroup className="max-h-60 overflow-auto">
              {options.map((opt) => {
                const active = value.includes(opt.value);
                return (
                  <CommandItem key={opt.value} onSelect={() => toggle(opt.value)} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-4 w-4 rounded-sm border border-border flex items-center justify-center",
                        active ? "bg-primary text-primary-foreground border-primary/40" : "bg-transparent"
                      )}
                    >
                      {active && <Check className="h-3 w-3" />}
                    </span>

                    {renderLeft?.(opt)}
                    <span className="flex-1">{opt.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function RangeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
}) {
  const safe: [number, number] =
    value[0] <= value[1] ? value : ([value[1], value[0]] as [number, number]);

  return (
    <div
      className={cn(
        "rounded-xl px-4 py-3",
        whiteField,
        "border-primary/30 hover:border-primary/45"
      )}
    >
      <div className="flex items-end justify-between">
        <div className="text-xs font-semibold text-black">{label}</div>
        <div className="text-xs text-black/70">
          {format(safe[0])} — {format(safe[1])}
        </div>
      </div>

      <div className="mt-3 overflow-visible">
        <SliderPrimitive.Root
          value={safe}
          onValueChange={(v) => onChange([v[0], v[1]])}
          min={min}
          max={max}
          step={step}
          minStepsBetweenThumbs={0}
          className="relative flex w-full touch-none select-none items-center overflow-visible"
        >
          {/* ✅ slider base line */}
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
            {/* ✅ selected range in RED */}
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>

          {/* ✅ BOTH thumbs explicitly rendered */}
          <SliderPrimitive.Thumb
            className="block h-5 w-5 rounded-full border border-black/20 bg-background shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={`${label} minimum`}
          />
          <SliderPrimitive.Thumb
            className="block h-5 w-5 rounded-full border border-black/20 bg-background shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={`${label} maximum`}
          />
        </SliderPrimitive.Root>
      </div>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs",
        ctaBg,
        ctaBorder,
        "border",
        ctaText
      )}
    >
      <span className="truncate max-w-[200px]">{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className={cn("rounded-full p-0.5 transition-colors", ctaHoverBg)}
        aria-label={`Remove ${label}`}
      >
        <X className={cn("h-3.5 w-3.5", ctaText)} />
      </button>
    </span>
  );
}

// ---------------- Main ----------------

const HeroSearchBar = ({ onSearch }: HeroSearchBarProps) => {
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");

  // ✅ NO make/model
  const bodyTypeOptions: Option[] = useMemo(() => bodyTypes.map((bt) => ({ label: bt, value: bt })), []);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);

  const YEAR_MIN = 2000;
  const YEAR_MAX = 2026;
  const PRICE_MIN = 0;
  const PRICE_MAX = 150000;

  const [yearRange, setYearRange] = useState<[number, number]>([YEAR_MIN, YEAR_MAX]);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);

  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [fuels, setFuels] = useState<string[]>([]);
  const [drivetrains, setDrivetrains] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const optionLabel = (opts: Option[], v: string) => opts.find((o) => o.value === v)?.label ?? v;

  // ✅ keyword should NOT appear in applied filters list
  const activeChips = useMemo(() => {
    const chips: { key: string; label: string; remove: () => void }[] = [];

    if (yearRange[0] !== YEAR_MIN || yearRange[1] !== YEAR_MAX) {
      chips.push({
        key: "year",
        label: `Years: ${yearRange[0]}–${yearRange[1]}`,
        remove: () => setYearRange([YEAR_MIN, YEAR_MAX]),
      });
    }

    if (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX) {
      chips.push({
        key: "price",
        label: `Price: $${priceRange[0].toLocaleString()}–$${priceRange[1].toLocaleString()}`,
        remove: () => setPriceRange([PRICE_MIN, PRICE_MAX]),
      });
    }

    selectedBodyTypes.forEach((bt) =>
      chips.push({
        key: `bt:${bt}`,
        label: bt,
        remove: () => setSelectedBodyTypes((p) => p.filter((x) => x !== bt)),
      })
    );

    transmissions.forEach((v) =>
      chips.push({
        key: `tr:${v}`,
        label: `Transmission: ${optionLabel(TRANSMISSION_OPTIONS, v)}`,
        remove: () => setTransmissions((p) => p.filter((x) => x !== v)),
      })
    );

    fuels.forEach((v) =>
      chips.push({
        key: `fu:${v}`,
        label: `Fuel: ${optionLabel(FUEL_OPTIONS, v)}`,
        remove: () => setFuels((p) => p.filter((x) => x !== v)),
      })
    );

    drivetrains.forEach((v) =>
      chips.push({
        key: `dr:${v}`,
        label: `Drivetrain: ${optionLabel(DRIVETRAIN_OPTIONS, v)}`,
        remove: () => setDrivetrains((p) => p.filter((x) => x !== v)),
      })
    );

    colors.forEach((v) =>
      chips.push({
        key: `co:${v}`,
        label: `Color: ${optionLabel(COLOR_OPTIONS, v)}`,
        remove: () => setColors((p) => p.filter((x) => x !== v)),
      })
    );

    return chips;
  }, [yearRange, priceRange, selectedBodyTypes, transmissions, fuels, drivetrains, colors]);

  const handleSearch = () => {
    const inventorySection = document.querySelector("#inventory");
    if (inventorySection) inventorySection.scrollIntoView({ behavior: "smooth" });
    onSearch?.();
  };

  // ✅ clear button in main search bar clears ONLY the text
  const handleClearSearchText = () => setSearchQuery("");

  // ✅ no "clear all" next to applied filters
  const handleClearAllFilters = () => {
    setSelectedBodyTypes([]);
    setYearRange([YEAR_MIN, YEAR_MAX]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setTransmissions([]);
    setFuels([]);
    setDrivetrains([]);
    setColors([]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* ✅ general background black + text white */}
      <div className="rounded-2xl bg-black text-white border border-white/10 shadow-2xl overflow-hidden">
        <div className="px-6 py-6">
          {/* Main search row (white bg, black text, red border accents) */}
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 transition-colors",
              whiteField,
              "border-primary/35 hover:border-primary/55"
            )}
          >
            <Search className="w-5 h-5 text-primary flex-shrink-0" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder={t.search.placeholder || "Make, model, or keyword"}
              className="flex-1 bg-transparent outline-none text-base text-black placeholder:text-black/40"
            />

            {searchQuery.trim().length > 0 && (
              <button
                type="button"
                onClick={handleClearSearchText}
                className="p-1.5 rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Clear search text"
              >
                <X className="w-4 h-4 text-primary" />
              </button>
            )}
          </div>

          {/* Applied filters (KEEP RED CTA styling) */}
          {activeChips.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {activeChips.map((chip) => (
                <FilterChip key={chip.key} label={chip.label} onRemove={chip.remove} />
              ))}
            </div>
          )}

          {/* Sliders (red line like before) */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <RangeSlider
              label="Years"
              value={yearRange}
              onChange={setYearRange}
              min={YEAR_MIN}
              max={YEAR_MAX}
              step={1}
              format={(n) => String(n)}
            />
            <RangeSlider
              label="Price"
              value={priceRange}
              onChange={setPriceRange}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={1000}
              format={(n) => `$${n.toLocaleString()}`}
            />
          </div>

          {/* Other filters (white bg + black text, with subtle red borders) */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <MultiSelect
              label="Body type"
              placeholder="Any"
              options={bodyTypeOptions}
              value={selectedBodyTypes}
              onChange={setSelectedBodyTypes}
            />
            <MultiSelect
              label="Transmission"
              placeholder="Any"
              options={TRANSMISSION_OPTIONS}
              value={transmissions}
              onChange={setTransmissions}
            />
            <MultiSelect
              label="Drivetrain"
              placeholder="Any"
              options={DRIVETRAIN_OPTIONS}
              value={drivetrains}
              onChange={setDrivetrains}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <MultiSelect label="Fuel" placeholder="Any" options={FUEL_OPTIONS} value={fuels} onChange={setFuels} />
            <MultiSelect
              label="Colors"
              placeholder="Any"
              options={COLOR_OPTIONS}
              value={colors}
              onChange={setColors}
              renderLeft={(opt) => <span className={cn("h-3.5 w-3.5 rounded-full", colorDotClass(opt.value))} />}
            />
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-xs text-white/60">
              {activeChips.length ? `${activeChips.length} filter set` : "No filters applied"}
              <span className="ml-2 text-xs text-white/40">(Press Enter to search)</span>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClearAllFilters}
                className="text-white/70 hover:text-white"
              >
                {t.search.clear}
              </Button>
              <Button type="button" onClick={handleSearch} className="px-8">
                {t.search.search}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchBar;
