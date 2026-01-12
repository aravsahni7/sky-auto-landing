export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  bodyType: string;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  drivetrain: 'AWD' | 'FWD' | 'RWD';
  condition: 'New' | 'Used';
  color: string;
  image: string;
  badges: ('certified' | 'new' | 'hotDeal')[];
}

export const makes = ['Audi', 'BMW', 'Ford', 'Honda', 'Mercedes-Benz', 'Tesla', 'Toyota', 'Volkswagen'];
export const bodyTypes = ['Sedan', 'SUV', 'Coupe', 'Truck', 'Hatchback', 'Wagon'];
export const colors = ['Black', 'White', 'Silver', 'Red', 'Blue', 'Gray'];
export const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
export const drivetrains = ['AWD', 'FWD', 'RWD'];
export const transmissions = ['Automatic', 'Manual'];
export const conditions = ['New', 'Used'];

export const vehicles: Vehicle[] = [
  {
    id: '1',
    make: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    price: 89995,
    mileage: 1200,
    bodyType: 'Coupe',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'RWD',
    condition: 'New',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
    badges: ['new', 'certified'],
  },
  {
    id: '2',
    make: 'Mercedes-Benz',
    model: 'AMG GT',
    year: 2023,
    price: 124900,
    mileage: 8500,
    bodyType: 'Coupe',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'RWD',
    condition: 'Used',
    color: 'Silver',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
    badges: ['certified'],
  },
  {
    id: '3',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    price: 108990,
    mileage: 500,
    bodyType: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Electric',
    drivetrain: 'AWD',
    condition: 'New',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&auto=format&fit=crop&q=80',
    badges: ['new', 'hotDeal'],
  },
  {
    id: '4',
    make: 'Audi',
    model: 'RS7 Sportback',
    year: 2023,
    price: 129995,
    mileage: 12000,
    bodyType: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'AWD',
    condition: 'Used',
    color: 'Gray',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=80',
    badges: ['certified', 'hotDeal'],
  },
  {
    id: '5',
    make: 'Ford',
    model: 'F-150 Raptor',
    year: 2024,
    price: 78500,
    mileage: 3200,
    bodyType: 'Truck',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'AWD',
    condition: 'New',
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800&auto=format&fit=crop&q=80',
    badges: ['new'],
  },
  {
    id: '6',
    make: 'Toyota',
    model: 'Supra GR',
    year: 2023,
    price: 58990,
    mileage: 15000,
    bodyType: 'Coupe',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    drivetrain: 'RWD',
    condition: 'Used',
    color: 'Red',
    image: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=800&auto=format&fit=crop&q=80',
    badges: ['certified'],
  },
  {
    id: '7',
    make: 'Volkswagen',
    model: 'Golf R',
    year: 2024,
    price: 48995,
    mileage: 800,
    bodyType: 'Hatchback',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'AWD',
    condition: 'New',
    color: 'Blue',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
    badges: ['new', 'hotDeal'],
  },
  {
    id: '8',
    make: 'Honda',
    model: 'Civic Type R',
    year: 2023,
    price: 45900,
    mileage: 9800,
    bodyType: 'Hatchback',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    drivetrain: 'FWD',
    condition: 'Used',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1619976215249-0e6a46ada569?w=800&auto=format&fit=crop&q=80',
    badges: ['certified'],
  },
  {
    id: '9',
    make: 'BMW',
    model: 'X5 M',
    year: 2024,
    price: 115900,
    mileage: 2100,
    bodyType: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'AWD',
    condition: 'New',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    badges: ['new', 'certified'],
  },
];

export const getModelsForMake = (make: string): string[] => {
  const modelsByMake: Record<string, string[]> = {
    'Audi': ['A4', 'A6', 'Q5', 'Q7', 'RS7 Sportback', 'e-tron'],
    'BMW': ['3 Series', '5 Series', 'M4 Competition', 'X5 M', 'X3', 'i4'],
    'Ford': ['F-150 Raptor', 'Mustang', 'Bronco', 'Explorer', 'Escape'],
    'Honda': ['Civic Type R', 'Accord', 'CR-V', 'Pilot', 'HR-V'],
    'Mercedes-Benz': ['AMG GT', 'C-Class', 'E-Class', 'GLE', 'S-Class'],
    'Tesla': ['Model S Plaid', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'],
    'Toyota': ['Supra GR', 'Camry', 'RAV4', 'Highlander', '4Runner'],
    'Volkswagen': ['Golf R', 'Jetta', 'Tiguan', 'Atlas', 'ID.4'],
  };
  return modelsByMake[make] || [];
};
