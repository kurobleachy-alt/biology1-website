import { Link, useNavigate } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm',
  secondary: 'bg-brand-100 text-brand-800 hover:bg-brand-200 active:bg-brand-300',
  ghost: 'text-brand-700 hover:bg-brand-100 active:bg-brand-200',
  outline: 'border border-brand-300 text-brand-700 hover:bg-brand-50 active:bg-brand-100',
  danger: 'bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200 border border-red-200',
};

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3.5 text-base gap-2.5',
};

const base =
  'inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed select-none';

interface ButtonAsButton extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
}
interface ButtonAsLink extends BaseProps {
  as: 'link';
  to: string;
  children: ReactNode;
  onClick?: () => void;
}
interface ButtonAsBack extends BaseProps {
  as: 'back';
  fallback?: string;
  children?: ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsBack;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', leftIcon, rightIcon, fullWidth } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''}`;

  const inner = (
    <>
      {leftIcon}
      <span>{'children' in props ? props.children : null}</span>
      {rightIcon}
    </>
  );

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={cls} onClick={props.onClick}>
        {inner}
      </Link>
    );
  }
  if (props.as === 'back') {
    return <BackButton cls={cls} leftIcon={leftIcon} fallback={props.fallback} children={props.children} />;
  }
  const { as: _as, ...rest } = props;
  void _as;
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

function BackButton({
  cls,
  leftIcon,
  fallback,
  children,
}: {
  cls: string;
  leftIcon?: ReactNode;
  fallback?: string;
  children?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={cls}
      onClick={() => {
        if (window.history.length > 1) navigate(-1);
        else if (fallback) navigate(fallback);
        else navigate('/');
      }}
    >
      {leftIcon ?? <span aria-hidden>←</span>}
      <span>{children ?? 'Back'}</span>
    </button>
  );
}
