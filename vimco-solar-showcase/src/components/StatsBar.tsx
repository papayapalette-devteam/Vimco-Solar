import { Zap, MapPin, Building2, Sun } from 'lucide-react';
import { Project } from '@/types/project';

interface StatsBarProps {
  projects: Project[];
}

const StatsBar = ({ projects }: StatsBarProps) => {
  const totalCapacity = projects.reduce((acc, p) => {
    const capacity = parseFloat(p.capacity.replace(/[^0-9.]/g, ''));
    return acc + (isNaN(capacity) ? 0 : capacity);
  }, 0);

  const uniqueLocations = new Set(projects.map(p => p.location.split(',')[0].trim())).size;
  const totalImages = projects.reduce((acc, p) => acc + p.images.length, 0);

  const stats = [
    {
      icon: Sun,
      label: 'Total Projects',
      value: projects.length,
      color: 'text-solar-gold',
      bgColor: 'bg-solar-gold/10',
    },
    {
      icon: Zap,
      label: 'Total Capacity',
      value: `${totalCapacity} kW`,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: MapPin,
      label: 'Locations',
      value: uniqueLocations,
      color: 'text-eco-green',
      bgColor: 'bg-eco-green/10',
    },
    {
      icon: Building2,
      label: 'Photos',
      value: totalImages,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-soft transition-all duration-300 hover:shadow-card animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`p-3 rounded-lg ${stat.bgColor}`}>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-foreground">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
