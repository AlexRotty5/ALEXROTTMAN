import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export type ActiveLightbox = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageLightboxContextValue = {
  open: (src: string, alt?: string, caption?: string) => void;
  close: () => void;
};

const ImageLightboxContext = createContext<ImageLightboxContextValue | null>(
  null
);

export function useImageLightbox(): ImageLightboxContextValue {
  const ctx = useContext(ImageLightboxContext);
  if (!ctx) {
    throw new Error('useImageLightbox must be used within ImageLightboxProvider');
  }
  return ctx;
}

export function ImageLightboxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<ActiveLightbox | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setActive(null), []);
  const open = useCallback(
    (src: string, alt = '', caption?: string) => {
      setActive({
        src,
        alt: alt || 'Photo',
        ...(caption ? { caption } : {}),
      });
    },
    []
  );

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  const modal =
    mounted &&
    active &&
    createPortal(
      <div
        role="presentation"
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/88 px-4 py-8 sm:px-8"
        onClick={close}
      >
        <button
          type="button"
          className="absolute top-4 right-4 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/80 transition hover:bg-white/10 hover:text-white"
          style={{ fontFamily: "'Inter', sans-serif" }}
          onClick={close}
        >
          Close
        </button>
        <img
          src={active.src}
          alt={active.alt}
          className="max-h-[min(88vh,100%)] max-w-full w-auto object-contain shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        {active.caption ? (
          <p
            className="mt-4 max-w-3xl text-center text-sm text-white/90 sm:text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={(e) => e.stopPropagation()}
          >
            {active.caption}
          </p>
        ) : null}
      </div>,
      document.body
    );

  return (
    <ImageLightboxContext.Provider value={{ open, close }}>
      {children}
      {modal}
    </ImageLightboxContext.Provider>
  );
}

export type LightboxImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  caption?: string;
};

export const LightboxImage = React.forwardRef<
  HTMLImageElement,
  LightboxImageProps
>(function LightboxImage(
  { src, alt, caption, className, onClick, ...rest },
  ref
) {
  const ctx = useContext(ImageLightboxContext);

  const mergedClassName = [className, ctx ? 'cursor-zoom-in' : null]
    .filter(Boolean)
    .join(' ');

  return (
    <img
      ref={ref}
      {...rest}
      src={src}
      alt={alt}
      className={mergedClassName || undefined}
      onClick={(e) => {
        onClick?.(e);
        if (
          !e.defaultPrevented &&
          src &&
          ctx &&
          typeof src === 'string' &&
          src.length > 0
        ) {
          ctx.open(src, String(alt ?? ''), caption);
        }
      }}
    />
  );
});
