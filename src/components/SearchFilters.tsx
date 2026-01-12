import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { makes, bodyTypes, getModelsForMake, colors, fuelTypes, drivetrains, transmissions, conditions } from '@/data/inventory';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SearchFiltersProps {
  compact?: boolean;
  onSearch?: () => void;
}

const SearchFilters = ({ compact = false, onSearch }: SearchFiltersProps) => {
  const { t } = useLanguage();
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [yearFrom, setYearFrom] = useState<string>('');
  const [yearTo, setYearTo] = useState<string>('');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [bodyType, setBodyType] = useState<string>('');
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  // Advanced filters
  const [transmission, setTransmission] = useState<string>('');
  const [mileageMax, setMileageMax] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('');
  const [drivetrain, setDrivetrain] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const years = Array.from({ length: 25 }, (_, i) => (2024 - i).toString());
  const priceRanges = ['10000', '20000', '30000', '40000', '50000', '75000', '100000', '150000', '200000'];
  const mileageRanges = ['10000', '25000', '50000', '75000', '100000', '150000'];

  const handleSearch = () => {
    const inventorySection = document.querySelector('#inventory');
    if (inventorySection) {
      inventorySection.scrollIntoView({ behavior: 'smooth' });
    }
    onSearch?.();
  };

  const handleClear = () => {
    setSelectedMake('');
    setSelectedModel('');
    setYearFrom('');
    setYearTo('');
    setPriceMin('');
    setPriceMax('');
    setBodyType('');
    setTransmission('');
    setMileageMax('');
    setFuelType('');
    setDrivetrain('');
    setCondition('');
    setColor('');
  };

  const models = selectedMake ? getModelsForMake(selectedMake) : [];

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1.5">
        <Select value={selectedMake} onValueChange={(val) => { setSelectedMake(val); setSelectedModel(''); }}>
          <SelectTrigger className="w-28 h-8 text-xs bg-transparent border-0">
            <SelectValue placeholder={t.search.make} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {makes.map((make) => (
              <SelectItem key={make} value={make}>{make}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedMake}>
          <SelectTrigger className="w-28 h-8 text-xs bg-transparent border-0">
            <SelectValue placeholder={t.search.model} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {models.map((model) => (
              <SelectItem key={model} value={model}>{model}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover open={moreFiltersOpen} onOpenChange={setMoreFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-popover border-border p-4" align="end">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Select value={yearFrom} onValueChange={setYearFrom}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder={t.search.yearFrom} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={yearTo} onValueChange={setYearTo}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder={t.search.yearTo} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select value={priceMin} onValueChange={setPriceMin}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder={t.search.priceMin} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {priceRanges.map((price) => (
                      <SelectItem key={price} value={price}>${parseInt(price).toLocaleString()}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={priceMax} onValueChange={setPriceMax}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder={t.search.priceMax} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {priceRanges.map((price) => (
                      <SelectItem key={price} value={price}>${parseInt(price).toLocaleString()}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Select value={bodyType} onValueChange={setBodyType}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder={t.search.bodyType} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {bodyTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleClear} variant="outline" size="sm" className="flex-1">
                  {t.search.clear}
                </Button>
                <Button onClick={() => { handleSearch(); setMoreFiltersOpen(false); }} size="sm" className="flex-1">
                  {t.search.search}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button onClick={handleSearch} size="sm" className="h-8 px-3">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <Select value={selectedMake} onValueChange={(val) => { setSelectedMake(val); setSelectedModel(''); }}>
          <SelectTrigger>
            <SelectValue placeholder={t.search.anyMake} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {makes.map((make) => (
              <SelectItem key={make} value={make}>{make}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedMake}>
          <SelectTrigger>
            <SelectValue placeholder={t.search.anyModel} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {models.map((model) => (
              <SelectItem key={model} value={model}>{model}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={yearFrom} onValueChange={setYearFrom}>
          <SelectTrigger>
            <SelectValue placeholder={t.search.yearFrom} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {years.map((year) => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceMax} onValueChange={setPriceMax}>
          <SelectTrigger>
            <SelectValue placeholder={t.search.priceMax} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {priceRanges.map((price) => (
              <SelectItem key={price} value={price}>${parseInt(price).toLocaleString()}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={bodyType} onValueChange={setBodyType}>
          <SelectTrigger>
            <SelectValue placeholder={t.search.bodyType} />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {bodyTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* More filters section */}
      <Popover open={moreFiltersOpen} onOpenChange={setMoreFiltersOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            {t.search.moreFilters}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] bg-popover border-border p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{t.search.moreFilters}</h3>
              <button onClick={() => setMoreFiltersOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Select value={transmission} onValueChange={setTransmission}>
                <SelectTrigger>
                  <SelectValue placeholder={t.search.transmission} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {transmissions.map((trans) => (
                    <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={mileageMax} onValueChange={setMileageMax}>
                <SelectTrigger>
                  <SelectValue placeholder={t.search.mileageMax} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {mileageRanges.map((mile) => (
                    <SelectItem key={mile} value={mile}>{parseInt(mile).toLocaleString()} km</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={fuelType} onValueChange={setFuelType}>
                <SelectTrigger>
                  <SelectValue placeholder={t.search.fuelType} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {fuelTypes.map((fuel) => (
                    <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={drivetrain} onValueChange={setDrivetrain}>
                <SelectTrigger>
                  <SelectValue placeholder={t.search.drivetrain} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {drivetrains.map((drive) => (
                    <SelectItem key={drive} value={drive}>{drive}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger>
                  <SelectValue placeholder={t.search.condition} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {conditions.map((cond) => (
                    <SelectItem key={cond} value={cond}>{cond}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={color} onValueChange={setColor}>
                <SelectTrigger>
                  <SelectValue placeholder={t.search.color} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {colors.map((col) => (
                    <SelectItem key={col} value={col}>{col}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button onClick={handleClear} variant="outline" className="px-6">
          {t.search.clear}
        </Button>
        <Button onClick={handleSearch} className="px-8 gap-2">
          <Search className="w-4 h-4" />
          {t.search.search}
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
