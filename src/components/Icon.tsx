import 'weather-icons/css/weather-icons.min.css';

// icon can be referenced from https://erikflowers.github.io/weather-icons/
export function Icon({
  icon,
  className = '',
}: {
  icon: string;
  className?: string;
}) {
  const classNames = `wi ${icon} ${className}`;
  return <i data-testid="icon" className={classNames} />;
}
